import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from './fetchHelper.js';
import Tweet from './Tweet.jsx';
import { getCurrentUser } from './requests.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';

const UserFeed = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [tweets, setTweets] = useState();
  let pageUser = window.location.pathname.replace('/users/', '');

  useEffect(() => {
    getCurrentUser(function (response) {
      setCurrentUser(response.username);
    });
    fetchUserTweets();
  }, []);

  function fetchUserTweets() {
    fetch('/api/users/' + pageUser + '/tweets')
      .then(handleErrors)
      .then((res) => {
        setTweets(res.tweets);
      });
  }

  let handleLogout = function () {
    logout(function (response) {
      if (response.success == true) {
        window.location.replace('/');
      }
    });
  };

  const randomColor = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';

  return (
    <>
      <div className="main-container user-wrapper">
        <div className="current-user-container">
          <a href="/feed" className="current-user">
            <FontAwesomeIcon icon={faHouse} className="home-icon" />
          </a>
          <FontAwesomeIcon
            icon={faPersonWalkingArrowRight}
            className="signout"
            onClick={handleLogout}
          />
        </div>
        <div className="user-banner" style={{ backgroundColor: randomColor }}>
          <h3>@{pageUser.slice(1)}</h3>
        </div>
        <Tweet
          tweets={tweets}
          fetchTweets={fetchUserTweets}
          currentUser={currentUser}
        />
      </div>
    </>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserFeed />,
    document.body.appendChild(document.createElement('div'))
  );
});
