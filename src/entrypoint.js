'use strict';
import React from 'react';
import { Provider } from 'mobx-react';
import { RouterContext } from 'react-router';

import AppStore from './stores/AppStore';

function getAppBase(internal, appStore) {
  let initialState = undefined;
  if (global.window) initialState = global.window.__INITIAL_STATE__;
  appStore = appStore || new AppStore(initialState);

  return (
    <Provider appStore={appStore}>
      {internal}
    </Provider>
  );
}

function preServerRender(appStore, props) {
  return props.components
    .filter(Boolean)
    .map(component => component.wrappedComponent || component)
    .filter(component => component.preServerRender)
    .map(component => component.preServerRender(appStore, props.params));
}

function* getAppBaseForServer(props) {
  const appStore = new AppStore();
  yield preServerRender(appStore, props);
  return {
    initialState: appStore.toJson(),
    appBase: getAppBase(<RouterContext {...props} />, appStore)
  };
}

module.exports = {
  getAppBase,
  getAppBaseForServer
};
