import { RECEIVE_COMMENTS, FETCH_COMMENTS, FAILED_COMMENTS } from '../actions/index'

const INITIAL_STATE = {
      comments: [],
      fetched: false,
}

export default function comments(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
    return {
      comments: [],
  		fetched: false,
    };
     case RECEIVE_COMMENTS:
     return {...state,
			comments: action.data.data,
			fetched: true
    };
    case FAILED_COMMENTS:
     return {
       fetched: false
     };
    default:
     return state
  }
}
