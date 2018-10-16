
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './ducks';
console.log("rootReducer: " + JSON.stringify(rootReducer, null, 2));
export default (history, initialState = {}) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable no-underscore-dangle */

  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
      )
    ),
  );
};