const Koa = require('koa')
const Router = require('koa-router')
const quotation = require('./quotation')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const Client = require('jsreport-client')
Promise.promisifyAll(fs)

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, '../credentials.json')).toString())
const client = Client(credentials.url, credentials.username, credentials.password)

const app = new Koa()
const router = new Router()

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/api/foo', (ctx) => {
  ctx.body = { foo: 'hello' }
})

router.get('/api/czk/:date', async (ctx) => {
  ctx.body = await quotation(ctx.params.date)
})

router.post('/api/taxes', async (ctx) => {
  for (const g of ctx.request.body.gumroad) {
    await new Promise((resolve, reject) => {
      client.render({
        template: {
          name: 'Invoice Gumroad'
        },
        data: {
          id: g.id,
          amount: g.amount,
          date: g.date
        }
      }, (err, res) => {
        if (err) {
          return reject(err)
        }

        const stream = fs.createWriteStream(path.join(__dirname, '../data', `${g.id}.pdf`))
        res.on('end', resolve)
        res.pipe(stream)
      })
    })
  }

  ctx.body = JSON.stringify(ctx.request.body)
})

app.listen(3001)
console.log('listening')
