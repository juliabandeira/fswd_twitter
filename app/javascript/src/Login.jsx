import React from 'react';
import { useState } from 'react';

import $ from 'jquery';
import { createSession, authenticateUser } from './requests.js';

export default function Login({ updateState }) {
  const [show, setShow] = useState(false);

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
        $('.login-form').append(
          "<p id='message-alert'>Username or password does not match! Please, try again.</p>"
        );
        $('.username-login').val('');
        $('.password-login').val('');
      }
    });
  };

  return (
    <div className="login-div">
      <form onSubmit={handleLogin} className="login-form">
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

      <p>or</p>
      <button className="sign-button button" onClick={() => updateState()}>
        Sign Up
      </button>
    </div>
  );
}
