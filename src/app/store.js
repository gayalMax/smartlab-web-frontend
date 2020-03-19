import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import allReducers from './redux/reducers';
import storageMiddleware from './storage';

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk),
    storageMiddleware,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
