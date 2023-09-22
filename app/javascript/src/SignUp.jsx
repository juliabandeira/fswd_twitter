import React from 'react';
import $ from 'jquery';
import { createUser, createSession, authenticateUser } from './requests.js';

export default function SignUp() {
  let handleSignUp = (e) => {
    e.preventDefault();
    const username = $('.username').val();
    const email = $('.email').val();
    const password = $('.password').val();

    createUser(username, email, password, function (response) {
      if (response.user) {
        $('.signup-message').remove();
        $('.signup').append('<p>You may now login</p>');
      } else {
        $('.signup-message').remove();
        $('.signup').append(
          "<p class='signup-message'>Ops, something happened! Please, try again.</p>"
        );
      }
    });
    $('.username').val('');
    $('.email').val('');
    $('.password').val('');
  };

  let handleLogin = (e) => {
    e.preventDefault();

    const username = $('.username-login').val();
    const password = $('.password-login').val();

    createSession(username, password, function (response) {
      if (response.success) {
        $('#message-alert').remove();
        authenticateUser(function (response) {
          if (response.authenticated == true) {
            window.location.assign('/feed');
          }
        });
      } else {
        $('#message-alert').remove();
        $('.login form').append(
          "<p id='message-alert'>Username or password does not match! Please, try again.</p>"
        );
        $('.username-login').val('');
        $('.password-login').val('');
      }
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-div signup">
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            className="input-access username"
            placeholder="Username"
            minLength="3"
            required
          />
          <input
            type="email"
            className="input-access email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="input-access password"
            placeholder="Password"
            minLength="8"
            required
          />
          <button type="submit" className="sign-button button">
            Sign Up
          </button>
        </form>
      </div>

      <div className="signup-div login">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="input-access username-login"
            placeholder="username"
            required
          />
          <input
            type="password"
            className="input-access password-login"
            placeholder="password"
            required
          />
          <button type="submit" className="login-button button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
