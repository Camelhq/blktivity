import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from "react-redux";
import thunk from 'redux-thunk';
import { BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/index'

import reducers from './reducers/index';
import App from './components/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import Comments from './components/Comments';
import GetPost from './components/GetPost';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import ShowProfileURL from './components/ShowProfileURL';
import './styles/styles.scss';



const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))
// const store = createStore( window.REDUX_DATA );

const checkAuth = () => {
	const token = localStorage.getItem('token');

	if(!token){
		return false
	}
	if(token){
		console.log("its a token here")
	}
	// try{
	//
	// }catch(e){
	// 	return false;
	// }
	return true
}
if(localStorage.token){
	setAuthToken(localStorage.token)
	const decode = jwt_decode(localStorage.token)
	store.dispatch(setCurrentUser(decode))
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkAuth() ?
		<Component {...props} />
      : <Redirect to={{pathname: '/signin'
					// state: {from: props.location }
        }} />
  )} />
)

const app = document.getElementById('app');

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
//put this back where you got it!
//renderMethod
 ReactDOM.render(
  <ReduxProvider store={store}>
  	<Router>
      <Switch>
        <Route exact path="/" component={App}/>
				<Route exact path="/signup" component={Signup}/>
				<Route exact path="/signin" component={Signin}/>
				<Route exact path="/posts/:id" component={Comments}/>
				<AuthRoute exact path="/profile" component={Profile}/>
				<AuthRoute exact path="/create-profile" component={CreateProfile}/>
				<AuthRoute exact path="/edit-profile" component={EditProfile}/>
				<Route exact path="/profile/:handle" component={ShowProfileURL}/>
        <Route component={NotFound}/>
      </Switch>
  	</Router>
  </ReduxProvider>
        ,
    app);
