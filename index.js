import express from 'express';
import Koa from 'koa'
import router from './routers/index'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import convert from 'koa-convert'  //将koa1  转换为koa2
import db from './utils/db'
import graphQLHTTP from 'koa-graphql';
import mount from 'koa-mount';
import path from 'path';

// import cros from './middleware/crosMiddleware'
// import pipeMiddleware from './middleware/pipeMiddleware'

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { schema } from './data/schema';

const APP_PORT = 3030;
const GRAPHQL_PORT = 8080;

// const app = new Koa()
//
//
//
// app.jsonSpaces = 0 // 压缩json返回中的空格
// app.keys = ['key']
//
// app.use(convert(logger()))
// app.use(convert(bodyParser()))
// // app.use(pipeMiddleware())
// // app.use(function *(){
// //   this.body = 'Hello World';
// // });
// app.use(pipeMiddleware())
// app.use(convert(session(app)))
// router(app)
// app.use('/', express.static(path.resolve(__dirname, 'public')));

// app.use(mount('/', convert(graphQLHTTP({ schema, pretty: true }))));
// app.listen(GRAPHQL_PORT, () => console.log(
//   `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
// ));

// app.listen(3030, () => console.log(`✅ The server is running at http://localhost:3030/`))

const graphQLServer = new Koa();

graphQLServer.use(mount('/', convert(graphQLHTTP({ schema, pretty: true }))));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
const compiler = webpack({
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, 'App', 'Index.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      },
    ],
  },
  output: { filename: 'Index.js', path: '/' },
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: { '/graphql': `http://localhost:${GRAPHQL_PORT}` },
  publicPath: '/App/',
  stats: { colors: true },
});

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
