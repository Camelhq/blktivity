import React, { Component } from 'react';

// import Header from '../Header/Header';

import { Link } from 'react-router-dom';
import '../styles/styles.scss';

import china from "../imgs/china.png";
import newYork from "../imgs/New-York.png";
import greece from "../imgs/Greece.png";
import idk from "../imgs/IDK.png";

const News = () => (

  <div>
    <section>
        <div class="newsContainer">
          <h1>blktivity find places to people work, travel and stay connected around the world</h1>
          <div>Blktivity help individuals work and travel the world without sitting behind a desk.</div>
          <div class="news-header">
            <div>Trending Cities</div>
          </div>
          <div class="news-travel-body">
            <div class="news-travel__card">
              <div class="news-card">
                <div class="">
                  <img src={china} class="news-card__image"/>
                </div>
              </div>
              <div class="news-card">
                <div class="">
                  <img src={newYork} class="news-card__image"/>
                </div>
              </div>
            </div>
            <div class="news-travel__card">
              <div class="news-card">
                <div class="">
                  <img src={greece} class="news-card__image"/>
                </div>
              </div>
              <div class="news-card">
                <div class="">
                  <img src={idk} class="news-card__image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="trending-about">
          <a href="https://twitter.com/blktivity">@blktivity</a>
          <div>About</div>
          <div>Terms</div>
          <div>Privacy</div>
        </div>
    </section>
  </div>
);

export default News;
