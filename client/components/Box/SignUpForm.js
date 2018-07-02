import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { SignUpUser } from '../../actions/index'
import ErrorAlert from './ErrorAlert';

// import '../styles/styles';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: ''
    }
    this.userName = this.userName.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // componentDidMount(){
  //   console.log(this.props)
  // }
  userName(event){
    this.setState({
      username: event.target.value
    });
  }
  email(event){
    this.setState({
      email: event.target.value
    });
  }
  password(event){
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
  event.preventDefault()
  event.target.reset()
  this.props.SignUpUser(this.state)
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.error && <ErrorAlert>Your username/password is incorrect</ErrorAlert>}
        <div>
          <div>Username:</div>
          <input onChange={this.userName} type="text" name="username" class="global-form" placeholder="Enter your Username"/>
        </div>
        <div>
          <div>Email:</div>
          <input onChange={this.email} type="text" name="username" class="global-form" placeholder="Enter your Email"/>
        </div>
        <div>
          <div>Password:</div>
          <input onChange={this.password} type="password" name="username" class="global-form" placeholder="Enter your Password"/>
        </div>
        <input type="submit" class="global-btn shady-purple font-white" value="Sign Up" />
      </form>
    );
  }
};

// SignUpForm.propTypes = {
//   SignUpRequest: React.PropTypes.func.isRequired
// }

const mapStateToProps = state => {
  return {
    post: state.post
  }
  // return state
}

const mapDispatchToProps = {
  SignUpUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
