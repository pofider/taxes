const Koa = require('koa')
const Router = require('koa-router')
const quotation = require('./quotation')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const render = require('./render')
const rimraf = Promise.promisify(require('rimraf'))
const archiver = require('archiver')
const serve = require('koa-static')
Promise.promisifyAll(fs)

if (!fs.existsSync('data')) {
  fs.mkdirSync('data')
}

if (!fs.existsSync('zip')) {
  fs.mkdirSync('zip')
}

const app = new Koa()
const router = new Router()

app
  .use(serve('build'))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/api/foo', (ctx) => {
  ctx.body = { foo: 'hello' }
})

router.get('/api/:currency/:date', async (ctx) => {
  ctx.body = await quotation(ctx.params.date, ctx.params.currency)
})

router.post('/api/taxes', async (ctx) => {
  await rimraf(path.join(__dirname, '../data/**/*.*'))
  await rimraf(path.join(__dirname, '../zip/**/*.*'))

  for (const g of ctx.request.body.gumroad) {
    await render({
      template: {
        name: 'Invoice Gumroad'
      },
      data: {
        id: g.id,
        amount: g.amountUSD,
        date: g.date
      }
    }, path.join(__dirname, '../data', `${g.id}.pdf`))
  }

  const peruId = new Date().getFullYear() + '-' + new Date().getMonth() + 'P'
  await render({
    template: {
      name: 'Invoice Peru'
    },
    data: {
      id: peruId,
      amount: ctx.request.body.peru.amountUSD,
      date: ctx.request.body.peru.date
    }
  }, path.join(__dirname, '../data', `${peruId}.pdf`))

  const feeId = new Date().getFullYear() + '-' + new Date().getMonth() + 'F'
  await render({
    template: {
      name: 'Invoice Fee'
    },
    data: {
      id: feeId,
      amount: ctx.request.body.fee.amountCZK,
      date: new Date()
    }
  }, path.join(__dirname, '../data', `${feeId}.pdf`))

  await render({
    template: {
      name: 'Kontrolko'
    },
    data: ctx.request.body
  }, path.join(__dirname, '../data', `kontrolko.xml`))

  await render({
    template: {
      name: 'Hlaseni'
    },
    data: ctx.request.body
  }, path.join(__dirname, '../data', `hlaseni.xml`))

  const archive = archiver('zip')
  const output = fs.createWriteStream(path.join(__dirname, '../zip', 'taxes.zip'))
  archive.pipe(output)
  archive.directory(path.join(__dirname, '../data'), false)

  await new Promise((resolve, reject) => {
    output.on('close', resolve)
    archive.on('error', reject)
    archive.finalize()
  })

  ctx.body = fs.createReadStream(path.join(__dirname, '../zip', 'taxes.zip'))
})

app.listen(process.env.PORT || 3001)
console.log('listening')
