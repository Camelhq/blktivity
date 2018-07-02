import React, { Component } from 'react';
// import 'whatwg-fetch';

import { connect } from 'react-redux'
import GetPost from './GetPost';
import { forumPost, userProfile } from '../actions/index'

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
    const post = {
      title: this.state.title,
      text: this.state.text,
      userId: this.props.setAuth.user.userId
    }
    this.props.forumPost(post)
  }


  render() {
    return (
      <div>
        <section>
          <div class="forum-container">
            <div class="forum-header">
              {/* <div class="forum-header__linkbar"> */}
                <h3 class="forum-header__linkbar">Top</h3>
                <h3 class="forum-header__linkbar">Newest</h3>
                <h3 class="forum-header__linkbar">Week</h3>
                <h3 class="forum-header__linkbar">Month</h3>
              {/* </div> */}
              <form class="forum-header__linkbar" onSubmit={this.handleSubmit}>
                {/* {this.state.error && <ErrorAlert>Incorrect post try again</ErrorAlert>} */}
                <input onChange={this.title} type="text" name="username" class="forum-header__linkbar"/>
                <input onChange={this.text} type="text" name="username" class="forum-header__linkbar"/>
                <button>Text</button>
              </form>
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
    setAuth: state.setAuth
  }
}

const mapDispatchToProps = {
    forumPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
