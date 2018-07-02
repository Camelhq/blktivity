import { RECEIVE_POST, FETCH_POST, FAILED_POST } from '../actions/index'


const INITIAL_STATE = {
      post: {},
      fetched: false,
}

export default function GetPost(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POST:
    return {
      post: {},
  		fetched: false,
    };
    case FAILED_POST:
     return {
       fetched: false
     };
     case RECEIVE_POST:
     return {...state,
			post: action.data.data,
			fetched: true
    };
    default:
     return state
  }
}
