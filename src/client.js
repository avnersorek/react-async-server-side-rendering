'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import entrypoint from './entrypoint';
import routes from './routes';

render(entrypoint.getAppBase(<Router children={ routes } history={ browserHistory }/>), document.getElementById('root'));
