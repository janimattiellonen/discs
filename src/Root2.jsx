import React from 'react'
import { BrowserRouter as Router, Link, Route, useRouteMatch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import Login from './components/containers/LoginContainer'
import PrivateRoute from './components/PrivateRoute'
import Disc from './components/containers/DiscContainer'
import DiscGallery from './components/containers/DiscGalleryContainer'
import AppLayout from './components/containers/layouts/AppLayoutContainer'
import DiscList from './components/containers/DiscListContainer'
import Loading from './components/Loading'

import { useAuth0 } from './react-auth0-spa'

const Root = props => {
  const { store, history } = props

  const { loading } = useAuth0()

  if (loading) {
    return <Loading />
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppLayout>
          <Route exact path={`/`} component={DiscGallery} />
          <PrivateRoute exact path={`/discs/new`} component={Disc} />
          <Route exact path={`/discs`} component={DiscList} />
          <Route path={`/gallery`} component={DiscGallery} />
          <Route path={`/login`} component={Login} />
        </AppLayout>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
