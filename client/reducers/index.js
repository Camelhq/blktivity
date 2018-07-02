import  { combineReducers } from 'redux'
import auth from './authReducer'
import setAuth from './setAuthReducer'
import posts from './postReducer'
import post from './onePostReducer'
import comments from './commentReducer'
import user from './userReducer'
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
	auth: auth,
	setAuth: setAuth,
	user: user,
	posts: posts,
	post: post,
	comments: comments
});

export default rootReducer
