// CheckoutForm.js
import React, { Component } from 'react';
import {injectStripe} from 'react-stripe-elements';

// import AddressSection from './AddressSection';
import CardSection from './CardSection';

class CheckoutForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    const token = localStorage.getItem('token');
    this.setState({ token: token})
  }
  handleSubmit(ev){
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({}).then(({token}) => {
      console.log('Received Stripe token:', token);
      fetch('http://localhost:8080/api/account/create', {
        //${SIGN_IN}/api/account/signin
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body: JSON.stringify({
          token: token.id
        })
      }).then((res) => res.json()).then((response) => {
        console.log('response', response)
      })
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', owner: {
    //   name: 'Jenny Rosen'
    // }});
  }
// <AddressSection />
  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
