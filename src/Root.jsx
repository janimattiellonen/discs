import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/containers/AppContainer';
import Index from './components/containers/IndexContainer';
import AppLayout from './components/containers/layouts/AppLayout';

function AppLayoutRoute({ match }) {
  console.log("m: " + JSON.stringify(match));
  return (
    <AppLayout>
      <Route exact path={`${match.url}/`} component={Index} />
    </AppLayout>
  );
}

const Root = props => {
  const { history, store } = props;

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Route path="" component={AppLayoutRoute} />
        </App>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;