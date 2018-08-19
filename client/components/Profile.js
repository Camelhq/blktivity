import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Test from '../actions/index';
import NavBar from './NavBar';
import { userProfile } from '../actions/index'

import '../styles/styles.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.props.getPosts();

  }

  componentDidMount(){
    this.props.userProfile();
  }

  createProfile(){
    return (
      <div>
        <h1>You dont have a profile yet</h1>
        <Link to="/create-profile">Create Profile</Link>
      </div>
    );
  }

  content() {
    return (
      <div>
        <div class="profile-container">
          <div class="profile-header">
            <p>Welcome <Link to={`/profile/${this.props.user.user.handle}`}>{this.props.user.user.handle}</Link></p>
            <div>{this.props.user.user.bio}</div>
          </div>
          <div class="profile-body">
            <div>{this.props.user.user.company}</div>
            <div>{this.props.user.user.location}</div>
          </div>
            <Link to="/edit-profile">Edit Profile</Link>
        </div>
      </div>
    );
  }

  renderProfile(){
    if(this.props.user.user === null || this.props.user.user.loading){
      return <div>...loading</div>
    }else{
      //check if user just created profile
      if(Object.keys(this.props.user.user).length > 0){
        return <div>{this.content()}</div>
      }else{
        //User is logged in but doesnt have a profile
        return <div>{this.createProfile()}</div>
      }

    }
  }



  render() {
    // console.log(this.props.user)
    return (
      <div>
        <NavBar />
        <div>{this.renderProfile()}</div>
        <Link to="/delete-profile">Delete Profile</Link>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    setAuth: state.setAuth,
    user: state.user
  }
}

const mapDispatchToProps = {
  userProfile
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
