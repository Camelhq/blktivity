import React, { Component } from 'react';

// import Header from '../Header/Header';

import '../styles/styles.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
  return (
      <div class="footer-container dark-purple font-white">
        <div class="footer-container__column">
            <div class="footer-column">
              <div class="footer-column__content">
                <h1 class="foot-content__header">About Us</h1>
                <div class="foot-content__padding">
                  blktivity is owned and operated by <a href="https://camelhq.com">CamelHQ</a>
                  <br></br>for individuals to travel and connect with each other.
                </div>
                <div class="foot-content__padding">terms</div>
                <div class="foot-content__padding">Privacy</div>
              </div>
            </div>
            <div class="footer-column">
              <div class="footer-column__content">
                <h1 class="foot-content__header">Products</h1>
                <div class="foot-content__padding">Top Discussions</div>
                <div class="foot-content__padding">This Week</div>
                <div class="foot-content__padding">This Month</div>
              </div>
            </div>
          <div class="footer-column">
            <div class="footer-column__content">
              <h1 class="foot-content__header">Business</h1>
              <div class="foot-content__padding">About Us</div>
              <div class="foot-content__padding"><a href="https://twitter.com/blktivity">Twitter</a></div>
              <div class="foot-content__padding">Partners</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Footer;
