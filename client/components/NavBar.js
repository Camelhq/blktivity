import React, { Component } from 'react';

// import Header from '../Header/Header';

import { Link } from 'react-router-dom';
import '../styles/styles.scss';
import { connect } from 'react-redux'

import { logoutUser, userProfile } from '../actions/index'

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.onClickLogOut = this.onClickLogOut.bind(this);
  }

  burgerToggle() {
  let linksEl = document.querySelector('.narrowLinks');
  if (linksEl.style.display === 'block') {
          linksEl.style.display = 'none';
      } else {
          linksEl.style.display = 'block';
      }
}


  onClickLogOut(event){
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    console.log(this.props)

    const authLinks = (
      <div className="navWide">
        <div className="wideDiv">
          <Link to="/">Community</Link>
          <a href="" onClick={this.onClickLogOut}>Logout</a>
          {/* <img src={user.avatar} alt={user.name} title="You must have a Gravtar connected to your email to display an image"/> */}
        </div>
      </div>
    )

    const guestLinks = (
      <div className="navWide">
        <div className="wideDiv">
          <Link to="/">Community</Link>
          {/* <Link to="/skills">Skills</Link> */}
          {/* <Link to="/chat">Chat</Link> */}
          <Link to="/signup">Sign up</Link>
          <Link to="/signin">Sign in</Link>
        </div>
      </div>
    )


    return (
      <>
        <nav>
          {this.props.setAuth.authenticated ? authLinks : guestLinks}
				<div className="navNarrow">
					<i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
					<div className="narrowLinks">
						<a href="#" onClick={this.burgerToggle}>Link 1</a>
						<a href="#" onClick={this.burgerToggle}>Link 2</a>
						<a href="#" onClick={this.burgerToggle}>Link 3</a>
					</div>
				</div>
			</nav>
      </>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user,
    setAuth: state.setAuth
  }
}

const mapDispatchToProps = {
    logoutUser,
    userProfile
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
