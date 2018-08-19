import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { SignInUser, getPosts } from '../actions/index'
// import ErrorAlert from './ErrorAlert';
import NavBar from './NavBar';
import Footer from './Footer';

import '../styles/styles.scss';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // componentWillReceiveProps(){
  //   if(this.props.setAuth.authenticated === true){
  //     this.props.history.push('/dashboard')
  //   }
  //
  // }

  email(event){
    this.setState({
      email: event.target.value
    });
  }
  password(event){
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
  event.preventDefault()
  event.target.reset()
  this.props.SignInUser(this.state)
}

  render() {
    // console.log(this.props.setAuth.authenticated)
    return (
      <>
      <NavBar />
      <div class="sign-in__container">
        <div class="sign-in__form">
          <h1>Sign In</h1>
          <form onSubmit={this.handleSubmit} >
            {this.state.error && <ErrorAlert>Your username/password is incorrect</ErrorAlert>}
            <div>
              <div>Email:</div>
              <input onChange={this.email} type="text" name="username" class="global-form" placeholder="Enter Username"/>
            </div>
            <div>
              <div>Password:</div>
              <input onChange={this.password} type="password" name="username" class="global-form" placeholder="Enter Password"/>
            </div>
            <input type="submit" class="global-btn shady-purple font-white" value="Sign In" />
          </form>
          <div>
            <div class="">Did you forget you password?</div>
          </div>
        </div>
      </div>
      <section>
        <Footer />
      </section>
      </>
    );
  }
};


const mapStateToProps = state => {
  return {
    setAuth: state.setAuth
  }
}

const mapDispatchToProps = {
  SignInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
