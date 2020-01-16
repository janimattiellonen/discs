import React from 'react'
import { BrowserRouter as Router, Link, Route, useRouteMatch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import Login from './components/containers/LoginContainer'
import Disc from './components/containers/DiscContainer'
import DiscGallery from './components/containers/DiscGalleryContainer'
import AppLayout from './components/containers/layouts/AppLayoutContainer'
import DiscList from './components/containers/DiscListContainer'

import { Auth0Provider } from './contexts/Auth0Context'

const Root = props => {
  const { store, history } = props

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Auth0Provider>
          <AppLayout>
            <Route exact path={`/`} component={DiscGallery} />
            <Route exact path={`/discs/new`} component={Disc} />
            <Route exact path={`/discs`} component={DiscList} />
            <Route path={`/gallery`} component={DiscGallery} />
            <Route path={`/login`} component={Login} />
          </AppLayout>
        </Auth0Provider>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
