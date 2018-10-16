import axios from 'axios';
import { browserHistory } from 'react-router';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
export const AUTH_USER = 'auth_user',
             UNAUTH_USER = 'unauth_user',
             AUTH_ERROR = 'auth_error',
             FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
             RESET_PASSWORD_REQUEST = 'reset_password_request',
             PROTECTED_TEST = 'protected_test';

const API_URL = 'http://localhost:8080/api';
const SIGN_IN = 'http://localhost:8080';
/*
Need to fix this for development and production
*/
const CLIENT_ROOT_URL = 'http://localhost:3000';


export function errorHandler(dispatch, error, type) {
 let errorMessage = '';

 if(error.data.error) {
   errorMessage = error.data.error;
 } else if(error.data){
   errorMessage = error.data;
 } else {
   errorMessage = error;
 }

 if(error.status === 401) {
   dispatch({
     type: type,
     payload: 'You are not authorized to do this. Please login and try again.'
   });
   logoutUser();
 } else {
   dispatch({
     type: type,
     payload: errorMessage
   });
 }
}
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
            //  RECEIVE_PROFILE = 'RECEIVE_PROFILE',
            //  FAILED_PROFILE = 'FAILED_PROFILE';

export function SignInUser({ email, password }) {
 return function(dispatch) {

  axios.post(`${SIGN_IN}/api/account/signin`, {
    email: email,
    password: password
  }).then(function(response) {

    if(response.status === 200){

       localStorage.setItem('token', response.data.token);
      //  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
       setAuthToken(response.data.token)
      //  dispatch({ type: AUTH_USER });

      // decode token to get user data
      const decoded = jwt_decode(response.data.token)
      // console.log(decoded)
      //set current user
       dispatch(setCurrentUser(decoded));
       window.location.href = CLIENT_ROOT_URL + '/';
     }
  }).catch((error) => {
    console.log(error)
     errorHandler(dispatch, error.response, AUTH_ERROR)
   });
   }
 }

 export const setCurrentUser = (decoded) => {
   return {
     type: SET_CURRENT_USER,
     decoded: decoded
   }
 }

 export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    localStorage.removeItem('token', { path: '/' });
    setAuthToken(false)
    dispatch(setCurrentUser({}));
    window.location.href = CLIENT_ROOT_URL + '/';
  }
 }

 export function SignUpUser({ username, email, password }) {
  return function(dispatch) {
   axios.post(`${SIGN_IN}/api/account/signup`, {
     userName: username,
     email: email,
     password: password
   }).then(function(response) {
     console.log(response)
     if(response.status === 200){
       // this.props.stripe.createToken({})
        localStorage.setItem('token', response.data.token);
        // dispatch({ type: AUTH_USER });
        window.location.href = CLIENT_ROOT_URL + '/profile';
      }
   }).catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }




  export const FETCH_PROFILE = 'FETCH_PROFILE',
               RECEIVE_PROFILE = 'RECEIVE_PROFILE',
               CLEAR_PROFILE = 'CLEAR_PROFILE';

  export function userProfile() {
    //this should be profile loading action
    // dispatch(setProfileLoading());
   return function(dispatch) {

    axios.get(`${SIGN_IN}/api/profile`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }).then(function(response) {
        // console.log(response.data)
         dispatch(receiveProfile(response.data));
      }).catch((error) => {
        // console.log(error)
        dispatch({type: RECEIVE_PROFILE, data: {}});
      //  errorHandler(dispatch, error.response, AUTH_ERROR)
     });
   }
}
   const receiveProfile = function receiveProfile(data) {
     return {
       type: RECEIVE_PROFILE,
       data: data
     }
   }
   const setProfileLoading = function setProfileLoading() {
     return {
       type: FETCH_PROFILE
     }
   }

   export function getProfileByHandle(handle) {
    return function(dispatch) {
     axios.get(`${SIGN_IN}/api/profile/handle/${handle}`, {
       headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
       }).then(function(response) {
         // console.log(response.data)
          dispatch(receiveProfile(response.data));
       }).catch((error) => {
         // console.log(error)
         dispatch({type: RECEIVE_PROFILE, data: null});
       //  errorHandler(dispatch, error.response, AUTH_ERROR)
      });
    }
 }


 //{headers: {'Content-Type': 'multipart/form-data',}
   export function createProfile({ handle, company, website, location, instagram, facebook, twitter, bio }) {
    return function(dispatch) {
     axios.post(`${SIGN_IN}/api/profile`, {
       handle: handle,
      //  file: fd,
       company: company,
       website: website,
       location: location,
       instagram: instagram,
       facebook: facebook,
       twitter: twitter,
       bio: bio

    }).then(function(response) {
      //  console.log(response)
       if(response.status === 200){
        //  console.log(response.data)
         //  dispatch({ type: AUTH_USER });
         dispatch(addPost(response));
        //  window.location.href = CLIENT_ROOT_URL + '/profile';
        }
     }).catch((error) => {
      //  console.log(error.response)
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
      }
    }


export function protectedTest() {
 return function(dispatch) {
   axios.get(`${API_URL}/protected`, {
     headers: { 'Authorization':  localStorage.getItem('token')}
   })
   .then(response => {
     dispatch({
       type: PROTECTED_TEST,
       payload: response.data.content
     });
   })
   .catch((error) => {
     errorHandler(dispatch, error.response, AUTH_ERROR)
   });
 }
}

export function Test() {
  return function(dispatch) {
    console.log("hello")
    }
}

/********************
* localhost:3000/api/posts
*
*This receive tweets from the server
*
************/

//this has to have some type of loading involved
//i think thats why its not showing up on the front end
export const FETCH_POSTS = 'FETCH_POSTS',
             RECEIVE_POSTS = 'RECEIVE_POSTS',
             FAILED_POSTS = 'FAILED_POSTS';


export function getPosts() {
 return function(dispatch) {
  axios.get(`${SIGN_IN}/api/posts`).then(function(response) {
      dispatch(receivePosts(response));
    }).catch((error) => {
      dispatch({ type: FAILED_POSTS });
     errorHandler(dispatch, error.response, AUTH_ERROR)
   });
   }
 }

 const receivePosts = function receivePosts(data) {
  //  console.log(data)
   return {
     type: RECEIVE_POSTS,
     data: data
   }
 }

export const ADD_POST = 'ADD_POST';
 // "userId": "5b1329e1ab92d194f5dc948c"
 export function forumPost({ title, text, userId }) {
  return function(dispatch) {
   axios.post(`${SIGN_IN}/api/posts`, {
     title: title,
     text: text,
     userId: userId
   }).then(function(response) {
     if(response.status === 200){
       //  dispatch({ type: AUTH_USER });
       dispatch(addPost(response));
      //  dispatch(addPost(response.data));
      }
   }).catch((error) => {
    //  console.log(error.response)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }
  const addPost = function addPost(data) {
    return {
      type: ADD_POST,
      data: data
    }
  }

 /********************
 * localhost:3000/api/posts
 *
 *This receive tweets from the server
 *
 ************/
 export const FETCH_POST = 'FETCH_POST',
              RECEIVE_POST = 'RECEIVE_POST',
              FAILED_POST = 'FAILED_POST';
 export function getOnePost(id) {
    return (dispatch) => {
        axios.get(`${SIGN_IN}/api/posts/${id}`)
        .then((response) => {
          // console.log(response.data)
            dispatch(receivePost(response));
            // dispatch({type: 'VIEW_ARTICLE', article})
        }).catch((error) => {
         errorHandler(dispatch, error.response, AUTH_ERROR)
       });
    }
}
const receivePost = function receivePost(data) {
 //  console.log(data)
  return {
    type: RECEIVE_POST,
    data: data
  }
}


 /********************
 * localhost:3000/api/comments
 *
 *This receive comments from the server
 *
 ************/
 export function comment({ text, postId, userId }) {
  return function(dispatch) {
   axios.post(`${SIGN_IN}/api/comments`, {
     text: text,
     postId: postId,
     userId: userId
   }).then(function(response) {
     if(response.status === 200){
       //  dispatch({ type: AUTH_USER });
      //  dispatch(PostPost(response.data));
      }
   }).catch((error) => {
    //  console.log(error.response)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }

  }




 export const FETCH_COMMENTS = 'FETCH_COMMENTS',
              RECEIVE_COMMENTS = 'RECEIVE_COMMENTS',
              FAILED_COMMENTS = 'FAILED_COMMENTS';


 export function getComments() {
  return function(dispatch) {

   axios.get(`${SIGN_IN}/api/comments`).then(function(response) {
       dispatch(receiveComments(response));
     }).catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }

  const receiveComments = function receiveComments(data) {
    return {
      type: RECEIVE_COMMENTS,
      data: data
    }
  }
