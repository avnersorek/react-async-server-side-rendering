'use strict';
import koa from 'koa';
import koaStatic from 'koa-static';
import path from 'path';
import { renderApp } from './app.server.js';

const app = koa();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(koaStatic(publicDir));
app.use(renderApp);

app.listen(port, () => {
  console.log({ port, env: process.env.NODE_ENV, pid: process.pid }, 'Server is listening');
});
