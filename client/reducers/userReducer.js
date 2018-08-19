import { FETCH_PROFILE, RECEIVE_PROFILE, CLEAR_PROFILE } from '../actions/index'


const INITIAL_STATE = {
      user: null,
      users: null,
      loading: false,
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PROFILE:
    return {
      ...state,
  		loading: true,
    };
    case RECEIVE_PROFILE:
    return {
      ...state,
      user: action.data,
      loading: false
    };
    case CLEAR_PROFILE:
    return {
      ...state,
      user: null,
      loading: false
    };
    default:
     return state
  }
}
