import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './Box/SignUpForm';
import Footer from './Footer';
import NavBar from './NavBar';
import '../styles/styles.scss';

const Signup = () => (
  <>
  <NavBar />
  <div class="sign-in__container">
    <div class="sign-in__form">
      <h1>sign up page</h1>
      <SignUpForm  />
      <Link to="/">Go home</Link>
      <Link to="/signin">Sign in</Link>
    </div>
  </div>
  <Footer />
  </>
);

export default Signup;
// export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
