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

import { AppContainer } from 'react-hot-loader'

import React from 'react'
import ReactDOM from 'react-dom'

import configureStore, { history } from './store'

import Root from './Root2'

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Index.scss'

import registerServiceWorker from './serviceWorker'

const store = configureStore()

function render(Component, rootElement) {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    rootElement
  )
}

const rootElement = document.getElementById('root')
render(Root, rootElement)

registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App', () => {
    /* For Webpack 2.x
       Need to disable babel ES2015 modules transformation in .babelrc
       presets: [
         ["es2015", { "modules": false }]
       ]
    */
    render()
    store.replaceReducer(rootReducer(history))

    /* For Webpack 1.x
    const NextApp = require('./App').default
    renderWithHotReload(NextApp)
    */
  })
}
