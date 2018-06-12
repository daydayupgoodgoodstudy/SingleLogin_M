import { combineReducers,createStore,applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// import {createLogger}  from 'redux-logger';
// const logger = createLogger();


import Public from './public';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    Public,
})


export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )

  return store
}
