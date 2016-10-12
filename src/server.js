'use strict';
import koa from 'koa';
import koaStatic from 'koa-static';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';

import entrypoint from './entrypoint';
import routes from './routes';

const app = koa();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

function renderIndex(componentHTML, initialState) {
  // can also be done with template engine like ejs or jade/pug
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>React SSR</title>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
      </head>
      <body>
          <div id="root">${componentHTML}</div>
          <script type="application/javascript" src="/build/bundle.js"></script>
      </body>
    </html>`;
}

function matchRoutes(routes, location) {
  return new Promise((resolve, reject) => {
    match({ routes, location }, (err, redirect, props) => {
      if (err) reject(err);
      else resolve({ redirect, props });
    });
  });
}

function* renderApp(next) {
  const { redirect, props } = yield matchRoutes(routes, this.path);

  if (redirect) {
    this.redirect(redirect.pathname + redirect.search);
  }
  else if (props) {
    const { initialState, appBase } = yield entrypoint.getAppBaseForServer(props);
    const componentHTML = renderToString(appBase);
    this.body = renderIndex(componentHTML, initialState);
  }
  else {
    this.status = 404;
    this.body = 'Not Found';
  }
}

app.use(koaStatic(publicDir));
app.use(renderApp);

app.listen(port, () => {
  console.log({ port, env: process.env.NODE_ENV, pid: process.pid }, 'Server is listening');
});
