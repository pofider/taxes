const Koa = require('koa')
const Router = require('koa-router')
const quotation = require('./quotation')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const render = require('./render')
Promise.promisifyAll(fs)

const app = new Koa()
const router = new Router()

app
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
      id: peruId,
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

  ctx.body = JSON.stringify(ctx.request.body)
})

app.listen(3001)
console.log('listening')
