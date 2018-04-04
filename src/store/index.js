import {combineReducers} from "redux";
import {createStore, applyMiddleware, compose} from 'redux';

import db from './db.reducer'
import app from './app.reducer'

import thunk from 'redux-thunk';
import * as schema from './schema';

const rootReducer = combineReducers({
  app,
  db,
});

const middleware = [thunk.withExtraArgument({schema})];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );
}
