// REDUCERS //
// this is a constant
import { TOGGLE_FAVE } from '../constants/action-types';
import { CLICK_DETAILS } from '../constants/action-types';
import { DETAILS_HAS_ERRORED } from '../constants/action-types';
import { DETAILS_IS_LOADING } from '../constants/action-types';
import { DETAILS_FETCH_DATA_SUCCESS } from '../constants/action-types';

import TMDB from '../TMDB';
const films = TMDB.films;
const initialState = {
  films,
  faves: [],
  current: {},
  hasErrored: false,
  isLoading: false
};

const rootReducer = (state = initialState, action) => {
  // all our reducers go in here
  switch(action.type){
    case TOGGLE_FAVE:
      console.log('received a TOGGLE_FAVE')
      const faves = Array.from(state.faves)
      const filmIndex = faves.indexOf(action.payload)
      if (filmIndex !== -1) {
        // The film is already favoed
        faves.splice(filmIndex, 1)
        console.log("removing a favorite", action.payload.title)
      } else {
        // The film needs to be added
        faves.push(action.payload)
        console.log("adding a favorite", action.payload.title)
      }
      return Object.assign({}, state, {faves})
    case CLICK_DETAILS:
      console.log('received a CLICK_DETAILS')
      return Object.assign({}, state, {current: action.payload})
    case DETAILS_HAS_ERRORED:
      console.log("Details_has_errored")
      return Object.assign({}, state, {hasErrored: action.hasErrored})
    case DETAILS_IS_LOADING:
      console.log("Details_is_loading")
      return Object.assign({}, state, {isLoading: action.isLoading})
    case DETAILS_FETCH_DATA_SUCCESS:
      console.log("DETAILS_FETCH_DATA_SUCCESS")
      return Object.assign({}, state, {current: action.details})
    default:
      console.log("default reducer")
      console.log(state)
      return state
  }
}

export default rootReducer;
