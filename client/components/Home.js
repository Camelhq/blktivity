import React, { Component } from 'react';
// import 'whatwg-fetch';

import { connect } from 'react-redux'
import GetPost from './GetPost';
import { forumPost, userProfile, getPosts } from '../actions/index'
import '../styles/styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      error: ''
    }

    this.title = this.title.bind(this);
    this.text = this.text.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //need to go back to the Reactjs life cycles
  // I dont like the way componentWillMount and componentDidUpdate
  //has to be here in both. never seen it before.

  componentDidMount() {
    this.props.getPosts();
    // console.log("componentDidMount")
  }
  // componentDidUpdate(nextProps){
  //   // console.log("componentDidUpdate")
  //   console.log(nextProps)
  //   // console.log(this.props.forumPost)
  //   if (nextProps.posts.loading === true) {
  //     this.props.getPosts()
  //   }
  //   // `nextProps` is the new props, while `this.props` are the old ones.
  //     // It is entirely possible that the new `playerName` is the same as the old one.
  // }

  /**
  *
  * Have to figure out when a user clicks on the title link
  * it goes to the posts' body.
  * Need to use pass thru props
  **/


  title(event){
    this.setState({
      title: event.target.value
    });
  }
  text(event){
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    event.target.reset();
    //we need to get the user  => const {user} = this.props.setAuth...
    const post = {
      //add user here name: user.username
      title: this.state.title,
      text: this.state.text,
      userId: this.props.setAuth.user.userId
    }
    this.props.forumPost(post)
  }


  render() {
    // console.log(this.props)
    const descriptionHeader = (
      <form class="forum-header__linkbar" onSubmit={this.handleSubmit}>
        <input onChange={this.title} type="text" name="username" class="global-form" placeholder="title"/>
        <input onChange={this.text} type="text" name="username" class="global-form" placeholder="text"/>
        <button>Text</button>
      </form>
    )

    const noHeader = (
      <div class="signIn-forum_button">
        <input type="submit" class="home-btn shady-purple font-white" value="Sign In" />
      </div>
    )

    return (
      <div>
        <section>
          <div class="forum-container">
            <div class="forum-header">
              {/* <div class="forum-header__linkbar"> */}
                <h3 class="forum-header__linkbar font-dark">Top</h3>
                <h3 class="forum-header__linkbar font-dark">Newest</h3>
                <h3 class="forum-header__linkbar font-dark">Week</h3>
                <h3 class="forum-header__linkbar font-dark">Month</h3>
              {this.props.setAuth.authenticated ? descriptionHeader : noHeader}
            </div>
            <div>
              <GetPost />
            </div>
          </div>
        </section>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    setAuth: state.setAuth,
    posts: state.posts
  }
}

const mapDispatchToProps = {
    forumPost,
    getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
