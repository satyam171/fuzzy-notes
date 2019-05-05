/**
 * index.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';

// Import root app
import App from './containers/App'; 
import NotFoundPage from './containers/NotFoundPage';

// Importing the css for antd library
import 'antd/dist/antd.css';

import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route component={NotFoundPage} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
);

