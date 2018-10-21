/*
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import Root from './Root';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
*/


import React from 'react';
import ReactDOM from 'react-dom';

import createStore from './store';
import Root from './Root';

import './index.css';
import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from './serviceWorker';

const history = createHistory();
const store = createStore(history);
console.log("ddd");
function render(Component, rootElement) {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    rootElement,
  );
}

const rootElement = document.getElementById('root');
render(Root, rootElement);

registerServiceWorker();
