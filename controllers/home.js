export async function home (ctx) {
  // ====================
  // 普通写法 :
  // ====================
  // const { email, password } = ctx.request.body
  // const hasUser = await User.findOne({email: email})
  // if (hasUser) {
  //   ctx.throw(400,'已存在用户')
  // }
  // const user = await new User(ctx.request.body).save()
  // ctx.body = user
  ctx.body = 'Hello Koa'
}
