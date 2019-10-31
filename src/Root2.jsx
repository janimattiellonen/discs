import React from "react";
import {BrowserRouter as Router, Link, Route, useRouteMatch} from "react-router-dom";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import DiscGallery from './components/containers/DiscGalleryContainer'
import AppLayout from "./components/containers/layouts/AppLayout";
import DiscList from "./components/containers/DiscListContainer";


function AppLayoutRoute({ match }) {

  let { path, url } = useRouteMatch();

  console.log('path: ' + JSON.stringify(path, null, 2))
  console.log('url: ' + JSON.stringify(url, null, 2))
  console.log('match: ' + JSON.stringify(match, null, 2))
  return (
    <AppLayout>

    </AppLayout>
  )
}

const Root = props => {
  const { store, history } = props

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route  path={`/`} component={DiscGallery} />
        <Route  path={`/discs`} component={DiscList} />
        <Route path={`/gallery`} component={DiscGallery} />
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
