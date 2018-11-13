import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import Header from '../Header';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  onSubmit = (e) => {
    const name = this.refs.name.value.trim();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    e.preventDefault();

    if (password.length < 5) {
      return this.setState({error: 'Password must be more than 5 characters long.'});
    }

    Accounts.createUser(
      {
        username: email,
        email,
        password,
        profile: {
          name,
        },
      }
    ,
      (err) => {
        if (err) {
          this.setState({
            error: err.reason,
          });
        } else {
          this.setState({
            error: '',
          });
        }
      }
    );
  }
  render() {
    return (
      <div className='signup'>

        <Header title={this.props.title} subtitle='Sign Up' />

        <div className='boxed-view'>
          <div className='boxed-view__box'>
            {this.state.error
              ?
              (
                <p>{this.state.error}</p>
              )
              : null
            }

            <form onSubmit={this.onSubmit} noValidate className='signup__form'>
              <input type='name' ref='name' name='name' placeholder='Name' />
              <input type='email' ref='email' name='email' placeholder='Email' />
              <input type='password' ref='password' name='password' placeholder='Password' />
              <button className='button button--extrapadding button--larger button--purple'>Create Account</button>
            </form>

            <Link to='/'>Already have an account? Click here.</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
