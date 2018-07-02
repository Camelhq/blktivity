import { AUTH_USER, UNAUTH_USER, AUTH_ERROR,
            FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST,
            PROTECTED_TEST, SET_CURRENT_USER } from '../actions/index'

const INITIAL_STATE = {
            error: '',
            message: '',
            content: '',
            authenticated: false,
            user: {}
}
// const INITIAL_STATE =[];

export default function auth(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state,
        error: '',
        message: '',
        authenticated: true
      };
    case UNAUTH_USER:
      return { ...state,
        authenticated: false
      };
    case AUTH_ERROR:
      return { ...state
        , error: action.payload };
    case PROTECTED_TEST:
      return { ...state,
        content: action.payload
      };
  }

  return state;
}
