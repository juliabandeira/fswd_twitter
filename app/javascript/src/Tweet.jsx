import React from 'react';
import { safeCredentials, handleErrors } from './fetchHelper.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Tweet({ tweets, fetchTweets, currentUser }) {
  const deleteTweet = (e) => {
    var id = e.target.dataset.id;

    fetch(
      `api/tweets/${id}`,
      safeCredentials({
        method: 'delete',
      })
    )
      .then(handleErrors)
      .then((res) => {
        console.log(res);
        fetchTweets();
      });
  };

  return (
    <div className="tweets-container">
      {tweets &&
        tweets.map((tweet, i) => (
          <div key={i} className="tweet-item">
            <a href={`/${tweet.username}`} className="username-tag">
              @{tweet.username}
            </a>
            <p>{tweet.message}</p>
            {tweet.username === currentUser ? (
              <FontAwesomeIcon
                icon={faTrash}
                data-id={tweet.id}
                onClick={deleteTweet}
                className="button-delete"
              />
            ) : null}
          </div>
        ))}
    </div>
  );
}
