import $ from 'jquery';
import { createTweet } from './requests.js';

export default function Tweet() {
  $('.post-button').on('click', () => {
    let tweet = $('input').value();
    if (tweet) {
      createTweet(tweet);
    }
  });
}
