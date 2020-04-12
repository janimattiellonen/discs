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

import { Auth0Provider } from './react-auth0-spa'

const config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  redirect_uri: window.location.origin,
}

import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Index.scss'

import initFontAwesome from './util/initFontAwesome'
initFontAwesome()

import registerServiceWorker from './serviceWorker'
import { ConnectedRouter } from 'connected-react-router'

console.log('dasfbgnhjkgfds')

const store = configureStore()

const onRedirectCallback = appState => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
}

function render(Component, rootElement) {
  ReactDOM.render(
    <Auth0Provider
      domain={config.domain}
      client_id={config.client_id}
      audience={config.audience}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <AppContainer>
        <Component store={store} history={history} />
      </AppContainer>
    </Auth0Provider>,
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
