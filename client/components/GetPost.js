import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getPosts } from '../actions/index'

import '../styles/styles.scss';

class GetPost extends Component {
  constructor(props) {
    super(props);

  }


  renderPosts(){
    if(this.props.posts === null){
      return <div>...loading</div>
    }
    return <div>{this.props.posts.posts.map((data) => {
      // console.log(data)
      return <ul class="forum-single__post" key={data._id}>
              <Link class="post-link font-dark" to={`/posts/${data._id}`} >{data.title}</Link>
              <div class="post-metadata font-dark-purple">
                <div class="post-metadata__user">By: <span class="">{data.creator.userName}</span></div>
                <div class="post-metadata__time"><Moment fromNow>{data.createdAt}</Moment></div>
                <div class="post-metadata__comments ">{data.comments.length} <span class="">comments</span></div>
               </div>
            </ul>
    })}</div>
  }

  render() {

    return (
      <div class="">
        <div>{this.renderPosts()}</div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}




export default connect(mapStateToProps, { getPosts })(GetPost)
