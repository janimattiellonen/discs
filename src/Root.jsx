import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, useRouteMatch } from 'react-router-dom'

import { ConnectedRouter } from 'connected-react-router'

import App from './components/containers/AppContainer'
import DiscList from './components/containers/DiscListContainer'
import DiscGallery from './components/containers/DiscGalleryContainer'
import AppLayout from './components/containers/layouts/AppLayout'

function AppLayoutRoute({ match }) {
  let { path, url } = useRouteMatch()

  return (
    <AppLayout>
      <Route exact path={`${match.url}`} component={DiscGallery} />
      <Route exact path={`${match.url}discs`} component={DiscList} />
      <Route path={`${match.url}gallery`} component={DiscGallery} />
    </AppLayout>
  )
}

const Root = props => {
  const { store, history } = props

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Route path="/" component={AppLayoutRoute} />
        </App>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
