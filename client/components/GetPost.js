import React, { Component } from 'react';
// import 'whatwg-fetch';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/index'

import '../styles/styles.scss';

class GetPost extends Component {
  constructor(props) {
    super(props);

  }
  //need to go back to the Reactjs life cycles
  // I dont like the way componentWillMount and componentDidUpdate
  //has to be here in both. never seen it before.

  componentWillMount() {
    this.props.getPosts();
  }
  // componentWillReceiveProps(){
  //   this.props.getPosts();
  // }

  /**
  *
  * Have to figure out when a user clicks on the title link
  * it goes to the posts' body.
  * Need to use pass thru props
  **/

  renderPosts(){
    if(this.props.posts === null){
      return <div>...loading</div>
    }
    return <div>{this.props.posts.posts.reverse().map((data) => {
      // console.log(data)
      return <ul class="forum-single__post" key={data._id}>
              <Link class="post-link font-dark" to={`/posts/${data._id}`} >{data.title}</Link>
              <div class="post-metadata font-dark-purple">
                <div class="post-metadata__user">By:<span class="">{data.creator.userName}</span></div>
                <div class="post-metadata__time">{data.createdAt}</div>
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
