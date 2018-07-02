import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Test from '../actions/index';
import { userProfile } from '../actions/index'

import '../styles/styles.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.props.getPosts();

  }

  componentWillMount(){
    this.props.userProfile();
  }

  renderPosts(){
    if(this.props.user.user === null){
      return <div>...loading</div>
    }
    return <div>{this.props.user.user.userName}</div>

  //   return <div>{this.props.user.user.map(function(data){
  //     return (<div key={data._id}>{...data}</div>)
  //   })}</div>
  }



  render() {
    return (
      <div>
        <h1>this is the dashboard</h1>
        <div>{this.renderPosts()}</div>
        {/* <div>{this.props.user.user}</div> */}
        {/* <ul>{this.props.user.fetched ?
          this.props.user.user.Daily.Data.map(data=>{
            return <li key={data.Time}>{data.Summary}</li>
          }) : null
          }</ul> */}

      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user
    // content: state.auth.content
  }
  // return state
}

const mapDispatchToProps = {
  userProfile
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
