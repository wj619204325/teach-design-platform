function pv(ctx) {
  ctx.session.count++
  global.console.log('pv:', ctx.path)
}
export default function () {
  return async function (ctx, next) {
    pv(ctx)
    //出口，这个中间件执行完毕，将执行权交给下一个中间件，单线程非阻塞
    await next()
  }
}