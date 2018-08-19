import React, { Component } from 'react';

// import Header from '../Header/Header';
import { logoutUser, userProfile } from '../actions/index'

import Home from './Home';
import NavBar from './NavBar';
import News from './News';
import Footer from './Footer';
import '../styles/styles.scss';

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }



  render() {
    const descriptionHeader = (
      <div class="home-header">
        <div class="home-header__description">
          <h1>blktivity find places to people work, travel and stay connected around the world</h1>
          <div>Blktivity help individuals work and travel the world without sitting behind a desk.</div>
        </div>
        <div >
        </div>
      </div>
    )

    const noHeader = (
      <div className="">
      </div>
    )


  return (
    <>
      <NavBar />
        <div class="demo-home-header">
          {/* <div class="home-header__description">
            <h1>blktivity find places to people work, travel and stay connected around the world</h1>
            <div>Blktivity help individuals work and travel the world without sitting behind a desk.</div>
          </div>
          <div >
            <img src={img} class="home-header__travel-image"/>
          </div> */}
        </div>
        {/* {this.props.setAuth.authenticated ? descriptionHeader : noHeader} */}
        <div class="flex-box home-content">
          <Home />
          <News />
        </div>
        <div class="">
          <Footer />
        </div>
      </>
    );
  }
}

// export default App;
