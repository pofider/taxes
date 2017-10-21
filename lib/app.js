const Koa = require('koa')
const Router = require('koa-router')
const quotation = require('./quotation')
var bodyParser = require('koa-bodyparser')

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
  console.log(ctx.request.body)
  ctx.body = JSON.stringify(ctx.request.body)
})

app.listen(3001)
console.log('listening')
