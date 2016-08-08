import express from 'express';
import Koa from 'koa'
import router from './routers/index'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import convert from 'koa-convert'
import db from './utils/db'
import graphQLHTTP from 'koa-graphql';
import mount from 'koa-mount';
import path from 'path';

import cros from './middleware/crosMiddleware'
import pipeMiddleware from './middleware/pipeMiddleware'

import { schema } from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

const app = new Koa()



app.jsonSpaces = 0 // 压缩json返回中的空格
app.keys = ['key']

app.use(convert(bodyParser()))
// app.use(pipeMiddleware())
// app.use(function *(){
//   this.body = 'Hello World';
// });

router(app)

// app.use('/', express.static(path.resolve(__dirname, 'public')));

app.use(mount('/', convert(graphQLHTTP({ schema, pretty: true }))));
app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

app.listen(3030, () => console.log(`✅ The server is running at http://localhost:3030/`))

export default app
