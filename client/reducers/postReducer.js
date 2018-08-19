import { RECEIVE_POSTS, FETCH_POSTS, FAILED_POSTS, ADD_POST } from '../actions/index'

const INITIAL_STATE = {
      posts: [],
      loading: true,
      fetched: false,
}

export default function posts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_POST:
    return {...state,
      posts: [action.data.data, ...state.posts]
    };
    case FETCH_POSTS:
    return {...state,
      posts: [],
      loading: true,
  		fetched: false,
    };
     case RECEIVE_POSTS:
     return {...state,
			posts: action.data.data,
      loading: false,
			fetched: true
    };
    case FAILED_POSTS:
     return {
       loading: false,
       fetched: false
     };
    default:
     return state
  }
}
