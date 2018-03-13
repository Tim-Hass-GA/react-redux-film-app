// STORE //
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

import TMDB from '../TMDB';
const films = TMDB.films;

const initialState = {
  films,
  faves: [],
  current: {},
  hasErrored: false,
  isLoading: false
};

const store = createStore(rootReducer,
                        initialState,
                        applyMiddleware(thunk),
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;
