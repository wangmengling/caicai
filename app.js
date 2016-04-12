import Koa from 'koa'
import router from './routers/index'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import convert from 'koa-convert'
import db from './utils/db'

import cros from './middleware/crosMiddleware'
import pipeMiddleware from './middleware/pipeMiddleware'

const app = new Koa()



app.jsonSpaces = 0 // 压缩json返回中的空格
app.keys = ['key']

app.use(convert(bodyParser()))
// app.use(pipeMiddleware())

router(app)

app.listen(3030, () => console.log(`✅ The server is running at http://localhost:3030/`))

export default app
