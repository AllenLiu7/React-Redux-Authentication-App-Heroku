import React, { Component } from 'react';
import SignInForm from '../../sign-in-form/sign-in-form';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

import './sign-in.styles.scss';

class SignInPage extends Component {
  googleSignInClick = () => {
    window.open('https://lit-dawn-27957.herokuapp.com/oauth/google', '_self');
  };
  facebookSignInClick = () => {
    window.open('https://lit-dawn-27957.herokuapp.com/oauth/facebook', '_self');
  };
  render() {
    return (
      <div className='signin-page'>
        <SignInForm />
        <div className='buttons'>
          <FacebookLoginButton
            className='socail-button'
            onClick={this.facebookSignInClick}
          />

          <GoogleLoginButton
            className='social-button'
            onClick={this.googleSignInClick}
          />
        </div>
      </div>
    );
  }
}

export default SignInPage;
