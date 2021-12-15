/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  }  

  const createTweetElement = (tweet) => {

    let time = timeago.format(tweet.created_at)

    let $tweet = `
    <article class="article">
      <header class="tweet-header">
        <div class="tweet-header">
          <div class="profile-container">
            <div class="profile">
              <img src=${tweet.user.avatars} class="display-pic">
              <h3 class="not-bold">${tweet.user.name}</h3>
            </div>
            <div class="username">
                <h3 class="username">${tweet.user.handle}</h3>
            </div>                
          </div>
        </div>
      </header>

      <div class="tweet-body">
        <p>${tweet.content.text}</p>
      </div>
      
      <footer>
        <p>${time}</p>
        <div class="tweet-icons">
          <i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `
    return $tweet;
  }

  renderTweets(data);

})