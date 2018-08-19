import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getProfileByHandle } from '../actions/index'
// import ErrorAlert from './ErrorAlert';
import NavBar from './NavBar';
import Footer from './Footer';

import '../styles/styles.scss';

class ShowProfileURL extends Component {
  constructor(props) {
    super(props);

  }
componentDidMount(){
  if(this.props.match.params.handle){
    this.props.getProfileByHandle(this.props.match.params.handle)
  }
}
content() {
  return (
    <div>
      <p>{this.props.user.user.handle}</p>
      <div>{this.props.user.user.company}</div>
      <div>{this.props.user.user.location}</div>
    </div>
  );
}
renderPublicProfile(){
  if(this.props.user.user === null || this.props.user.user.loading){
    return <div>...loading</div>
  }else{
    //check if user just created profile
    return <div>{this.content()}</div>
    }
  }
  render() {
    console.log(this.props.user)
    return (
      <>
      <h1>Hello</h1>
      <div>{this.renderPublicProfile()}</div>
      </>
    );
  }
};


const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  getProfileByHandle
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProfileURL)
