import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import allReducers from './redux/reducers';
import storageMiddleware from './storage';

const middlewares = [applyMiddleware(thunk), storageMiddleware];

// Activate devtools if and only if in available
// eslint-disable-next-line no-underscore-dangle
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  // eslint-disable-next-line no-underscore-dangle
  middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

// Add middlewares and reducers to create store
const store = createStore(allReducers, compose(...middlewares));

export default store;
