import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from '../../assets/images/logo.png';

import './home.scss';
import SignUp from './SignUp';
import Login from './Login';

const Home = () => {
  const [show, setShow] = useState(false);

  function handleState() {
    setShow(!show);
  }

  return (
    <div className="hero-container">
      <div className="logo-container">
        <img src={logo} className="logo" />
        <h3>
          Like the old Twitter,
          <br />
          before the billionaire prick.
        </h3>
      </div>
      <div className="login-container">
        {show ? <SignUp /> : null}
        {!show ? <Login updateState={handleState} /> : null}
      </div>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  );
});
