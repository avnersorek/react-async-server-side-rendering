'use strict';
import React from 'react';
import { Provider } from 'mobx-react';

function injectStores(app, appStore) {
  return (
    <Provider appStore={appStore}>
      {app}
    </Provider>
  );
}

module.exports = {
  injectStores
};
