// import axios from 'axios';
// import { browserHistory } from 'react-router';
// import setAuthToken from '../utils/setAuthToken'
// import jwt_decode from 'jwt-decode'
//
// export const NOT_FOUND_PROFILE = "NOT_FOUND_PROFILE",
//               LOADING_PROFILE = "LOADING_PROFILE",
//               SET_PROFILE = "SET_PROFILE",
//               GET_PROFILE  = "GET_PROFILE";
//
// const API_URL = 'http://localhost:8080/api';
// const SIGN_IN = 'http://localhost:8080';
// const CLIENT_ROOT_URL = 'http://localhost:8080';
//
//
// export function errorHandler(dispatch, error, type) {
//  let errorMessage = '';
//
//  if(error.data.error) {
//    errorMessage = error.data.error;
//  } else if(error.data){
//    errorMessage = error.data;
//  } else {
//    errorMessage = error;
//  }
//
//  if(error.status === 401) {
//    dispatch({
//      type: type,
//      payload: 'You are not authorized to do this. Please login and try again.'
//    });
//    logoutUser();
//  } else {
//    dispatch({
//      type: type,
//      payload: errorMessage
//    });
//  }
// }
//
//
//   export function getProfile() {
//    return function(dispatch) {
//      //should use LOADING_PROFILE here
//     axios.get(`${SIGN_IN}/api/profile`).then(function(response) {
//         dispatch(getProfile(response));
//       }).catch((error) => {
//         // dispatch({ type: FAILED_POSTS });
//        errorHandler(dispatch, error.response, AUTH_ERROR)
//      });
//      }
//    }
//
//    const getProfile = function getProfile(data) {
//     //  console.log(data)
//      return {
//        type: GET_PROFILE,
//        data: data
//      }
//    }
