/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    $('#tweets-container').empty(); // empty container
    const sortedTweets = tweets.sort((a, b) => { // sort tweets by date
      if (a.created_at > b.created_at) {
        return -1;
      } else {
        return 1;
      }
    })
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };  

  const createTweetElement = (tweet) => {
    const time = timeago.format(tweet.created_at);
    // prevent XSS with escaping
    const escape = function (str) { 
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
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
        <p>${escape(tweet.content.text)}</p>
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

  // Form Submission using jQuery
  
  $('form').submit(function(event) { // event listener for submit event on the form element
    event.preventDefault();

    const input = $(this).children('#tweet-text').val();
    const tweetCount = $(this.counter).val();

    if (input === "") {
      alert("Tweet cannot be empty.");
    } else if (tweetCount < 0) {
      alert("Exceeded maximum characters.");
    } else {
      const newTweet = $(this).serialize(); 
      $.ajax({
        url: "/tweets/",
        method: 'POST',
        data: newTweet,
        success: function() {
          $('#tweet-text').val(''); // clear form after submission
          loadTweets();
        }
      })
    }

  });

  // Fetch tweets with Ajax

  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      method: 'GET'
    })
    .then((response) => {
      renderTweets(response);
    })
    .catch((error) => {
      console.log('error:', error);
    });
  }

  loadTweets();

})