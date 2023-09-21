import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from './fetchHelper.js';
import Tweet from './Tweet.jsx';
import { getCurrentUser, logout } from './requests.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';

const Feed = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [message, setMessage] = useState('');
  const [tweets, setTweets] = useState();

  useEffect(() => {
    getCurrentUser(function (response) {
      setCurrentUser(response.username);
    });
    fetchTweets();
  }, []);

  function fetchTweets() {
    fetch(
      'api/tweets',
      safeCredentials({
        method: 'GET',
      })
    )
      .then(handleErrors)
      .then((res) => {
        setTweets(res.tweets);
      });
  }

  function postTweet() {
    fetch(
      `/api/tweets`,
      safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          tweet: {
            message,
          },
        }),
      })
    )
      .then(handleErrors)
      .then((res) => {
        console.log(res);
        fetchTweets();
      });
    setMessage('');
  }

  function handleChange(e) {
    setMessage(e.target.value);
    let char = message.length + 1;
    $('.char').text(char);
  }

  let handleLogout = function () {
    logout(function (response) {
      if (response.success == true) {
        window.location.replace('/');
      }
    });
  };

  return (
    <>
      <div className="main-container">
        <div className="current-user-container">
          <h3 className="current-user">
            Hello,
            <br />@{currentUser}!
          </h3>
          <FontAwesomeIcon
            icon={faPersonWalkingArrowRight}
            className="signout"
            onClick={handleLogout}
          />
        </div>
        <div className="feed-container">
          <form onSubmit={postTweet}>
            <div className="post-container">
              <textarea
                id="message-input"
                className="post-tweet"
                maxLength="140"
                placeholder="What's happening?"
                value={message}
                onChange={handleChange}
              />
              <div className="post-control">
                <p>
                  <span className="char">0</span>/140
                </p>
                <button type="submit" className="post-button">
                  Post
                </button>
              </div>
            </div>
          </form>
          <Tweet
            tweets={tweets}
            fetchTweets={fetchTweets}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div'))
  );
});
