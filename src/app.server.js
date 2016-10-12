'use strict';
import React from 'react';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';

import shared from './app.shared';
import routes from './routes';
import AppStore from './stores/AppStore';

function* renderApp(next) {
  const { redirect, props } = yield matchRoutes(routes, this.path);

  if (redirect) {
    this.redirect(redirect.pathname + redirect.search);
  }
  else if (props) {
    this.body = yield initAndRender(props);
  }
  else {
    this.status = 404;
    this.body = 'Not Found';
  }
}

function matchRoutes(routes, location) {
  return new Promise((resolve, reject) => {
    match({ routes, location }, (err, redirect, props) => {
      if (err) reject(err);
      else resolve({ redirect, props });
    });
  });
}

function* initAndRender(props) {
  const appStore = yield initStore(props);
  const initialState = serializeStore(appStore);
  const app = shared.injectStores(<RouterContext {...props} />, appStore);
  const componentHTML = renderToString(app);
  return renderIndex(componentHTML, initialState);
}

function* initStore(props) {
  const appStore = new AppStore();

  yield props.components
    .filter(Boolean)
    .map(component => component.wrappedComponent || component)
    .filter(component => component.preServerRender)
    .map(component => component.preServerRender(appStore, props.params));

  return appStore;
}

function serializeStore(appStore) {
  return appStore.toJson();
}

function renderIndex(componentHTML, initialState) {
  // can also be done with template engine like ejs or jade/pug
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>React SSR</title>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState || {})}
        </script>
      </head>
      <body>
          <div id="root">${componentHTML}</div>
          <script type="application/javascript" src="/build/bundle.js"></script>
      </body>
    </html>`;
}

module.exports = {
  renderApp
};
