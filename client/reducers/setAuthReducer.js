import { SET_CURRENT_USER } from '../actions/index'
import isEmpty from '../valid/is-empty';
const INITIAL_STATE = {
            user: {},
            authenticated: false
}
// const INITIAL_STATE =[];

export default function setAuth(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        authenticated: !isEmpty(action.decoded),
        user: action.decoded
      };
  }

  return state;
}
