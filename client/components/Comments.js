import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getOnePost, getComments, userProfile, comment } from '../actions/index'
import Footer from './Footer';
import NavBar from './NavBar';

import '../styles/styles.scss';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: ''
    }

    this.text = this.text.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    componentDidMount(){
      this.props.userProfile();
      this.props.getComments();
      this.props.getOnePost(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
      // nextProps.getOnePost(this.props.match.params.id)
      // this.props.getOnePost(this.props.match.params.id);
    }



  text(event){
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    event.target.reset();
    const comment = {
      text: this.state.text,
      postId: this.props.match.params.id,
      userId: this.props.setAuth.user.userId
    }
    this.props.comment(comment)
  }

  //   /**
  //   *
  //   * Need to get the Creator out....right now its coming out
  //   * as an creator user Id
  //   *
  //   **/

  renderPosts(){
    if(this.props.post.fetched === false){
      return <div>...loading</div>
    }
    return <div>{this.props.post.post.comments.map((data) => {
      // console.log(data)
      return <div class="forum-single__comment" key={data._id}>
                <div class="comment-metadata__comments font-dark">{data.text}</div>
                <div class="comment-metadata">
                  <div class="comment-metadata__user font-dark">By: {data.creator.userName}</div>
                  <div class="comment-metadata__time font-dark"><Moment fromNow>{data.createdAt}</Moment></div>
                </div>
            </div>
    })}</div>
  }


  render() {
    const val = this.props.post.post.comments;
    // console.log(this.props.post.post)

    if(this.props.post.post.comments == null){
      return <div></div>
    }
    return (
      <div>
        <NavBar />
        <section class="comment-section">
          <div class="overview-comment__container">
            <div class="comment-content">
              <div class="comment-content__header">
                <h1 class="font-dark">{this.props.post.post.title}</h1>
              </div>
              <div class="comment-content__body">
                <div class="font-dark">{this.props.post.post.text}</div>
                <div class="font-dark"><Moment fromNow>{this.props.post.post.createdAt}</Moment></div>
              </div>

            </div>
            <div class="comment-content__footer">
              <div class="user-comment__profile">
                {/* <div>{Object.keys(this.props.post.post.creator.userName)}</div> */}
                {/* <div>This is where profile pic at</div> */}
              </div>
              <div class="comment_numberOf_replies">
                <div class="font-dark">{val.length} replies</div>
              </div>
            </div>
          </div>
          <form class="comment-text__forum" onSubmit={this.handleSubmit}>
            {/* {this.state.error && <ErrorAlert>Incorrect post try again</ErrorAlert>} */}
            <div>
              <input onChange={this.text} type="text" name="username" class="comment-text__box"/>
            </div>
            <div>
              <input type="submit" class="global-btn shady-purple font-white" value="POST COMMENT" />
            </div>
            {/* <button>Text</button> */}
          </form>
          <div class="comment-container">
            <div>{this.renderPosts()}</div>
          </div>
        </section>
        <section class="">
          <Footer />
        </section>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user,
    post: state.post,
    setAuth: state.setAuth
  }
  // return state
}

const mapDispatchToProps = {
    getOnePost,
    getComments,
    userProfile,
    comment
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments)
