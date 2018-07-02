import { FETCH_PROFILE, RECEIVE_PROFILE, FAILED_PROFILE } from '../actions/index'


const INITIAL_STATE = {
      user: null,
      fetched: false,
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PROFILE:
    return {
      user: null,
  		fetched: false,
    };
    case FAILED_PROFILE:
     return {
       fetched: false
     };
     case RECEIVE_PROFILE:
     return {
			user: action.data.data,
			fetched: true
    };
    default:
     return state
  }
}
