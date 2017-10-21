const Koa = require('koa')
const Router = require('koa-router')
const quotation = require('./quotation')

const app = new Koa()
const router = new Router()

app
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/api/foo', (ctx) => {
  ctx.body = { foo: 'hello' }
})

router.get('/api/czk/:date', async (ctx) => {
  ctx.body = await quotation(ctx.params.date)
})

app.listen(3001)
console.log('listening')
