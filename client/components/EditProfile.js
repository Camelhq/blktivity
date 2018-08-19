import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { SignInUser, getPosts } from '../actions/index'
import { createProfile } from '../actions/index'
import NavBar from './NavBar';


import '../styles/styles.scss';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      company: '',
      // file:  null,
      website: '',
      location: '',
      instagram: '',
      facebook: '',
      twitter: '',
      bio: ''
    }
    this.handle = this.handle.bind(this);
    // this.file = this.file.bind(this);
    this.company = this.company.bind(this);
    this.website = this.website.bind(this);
    this.location = this.location.bind(this);
    this.instagram = this.instagram.bind(this);
    this.facebook = this.facebook.bind(this);
    this.twitter = this.twitter.bind(this);
    this.bio = this.bio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handle(event){
    this.setState({
      handle: event.target.value
    });
  }
  company(event){
    this.setState({
      company: event.target.value
    });
  }
  // file(event){
  //   this.setState({
  //     file: event.target.files[0]
  //   });
  //   // console.log(event.target.files[0])
  // }
  website(event){
    this.setState({
      website: event.target.value
    });
  }
  location(event){
    this.setState({
      location: event.target.value
    });
  }
  instagram(event){
    this.setState({
      instagram: event.target.value
    });
  }
  facebook(event){
    this.setState({
      facebook: event.target.value
    });
  }
  twitter(event){
    this.setState({
      twitter: event.target.value
    });
  }
  bio(event){
    this.setState({
      bio: event.target.value
    });
  }

  handleSubmit(event) {

  event.preventDefault()
  event.target.reset()
  // const fd = new FormData();
  // fd.append('file', this.state.file)
  // console.log(fd)
  // let fd = new FormData()
  // fd.append('image', file)
  const profileData = {
    handle: this.state.handle,
    // file: this.state.file,
    company: this.state.company,
    website: this.state.website,
    location: this.state.location,
    instagram: this.state.instagram,
    facebook: this.state.facebook,
    twitter: this.state.twitter,
    bio: this.state.bio
  }
  // console.log(profileData)
  this.props.createProfile(profileData)
  // console.log(this.props.createProfile(profileData))
}


  render() {
    console.log(this.props)
    return (
      <div>
      <NavBar />
      <h1>Create Profile</h1>
      <div class="sign-in__container">
        <div class="sign-in__form">
          <form class="forum-header__linkbar" onSubmit={this.handleSubmit}>
            <div>
              <div>handle:</div>
              <input onChange={this.handle} type="text" name="handle" class="global-form"/>
            </div>
            {/* <div>
              <div>image:</div>
              <input onChange={this.file} type="file" name="file" class="global-form"/>
            </div> */}
            <div>
              <div>company:</div>
              <input onChange={this.company} type="text" name="company" class="global-form"/>
            </div>
            <div>
              <div>website:</div>
              <input onChange={this.website} type="text" name="website" class="global-form"/>
            </div>
            <div>
              <div>location:</div>
              <input onChange={this.location} type="text" name="location" class="global-form"/>
            </div>
            <div>
              <div>instagram:</div>
              <input onChange={this.instagram} type="text" name="instagram" class="global-form"/>
            </div>
            <div>
              <div>facebook:</div>
              <input onChange={this.facebook} type="text" name="facebook" class="global-form"/>
            </div>
            <div>
              <div>twitter:</div>
              <input onChange={this.twitter} type="text" name="twitter" class="global-form"/>
            </div>
            <div>
              <div>bio:</div>
              <input onChange={this.bio} type="text" name="bio" class="global-form"/>
            </div>
            <button>Text</button>
          </form>
        </div>
      </div>
    </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    setAuth: state.setAuth,
    user: state.user
  }
}

const mapDispatchToProps = {
  createProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
