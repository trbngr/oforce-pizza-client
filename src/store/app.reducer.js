import { FETCHING_DATA_COMPLETE, FETCHING_DATA } from '../actions/types';

const initialState = {
  fetchingData: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCHING_DATA:
      return { ...state, fetchingData: true };
    case FETCHING_DATA_COMPLETE:
      return { ...state, fetchingData: false };
    default:
      return state;
  }
}

