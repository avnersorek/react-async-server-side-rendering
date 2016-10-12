'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import shared from './app.shared';
import AppStore from './stores/AppStore';

const initialState = global.window.__INITIAL_STATE__;
const appStore = new AppStore(initialState);
const app = shared.injectStores(<Router children={routes} history={browserHistory} />, appStore);
render(app, document.getElementById('root'));
