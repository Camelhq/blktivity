import React, { Component } from 'react';

// import Header from '../Header/Header';

import Home from './Home';
import NavBar from './NavBar';
import News from './News';
import Footer from './Footer';
import '../styles/styles.scss';
// import img from "../imgs/exploring.png";

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }


  render() {
  return (
    <>
      <NavBar />
        <div class="home-header">
          <div class="home-header__description">
            <h1>blktivity find places to people work, travel and stay connected around the world</h1>
            <div>Blktivity help individuals work and travel the world without sitting behind a desk.</div>
          </div>
          <div >
            {/* <img src={img} class="home-header__travel-image"/> */}
          </div>
        </div>
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
