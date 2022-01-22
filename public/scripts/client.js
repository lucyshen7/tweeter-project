// 
// Client-side JS logic
//

$(document).ready(function() {
  
  $('.error').hide(); // hide error messages

  $('.new').on('click', function() { // form toggle stretch
    $('form').slideToggle();
    $('#tweet-text').focus();
  }); 

  $('.fa-toggle-off').on('click', () => { // toggle on night mode
    $('.fa-toggle-off').addClass('hide');
    $('.fa-toggle-on').removeClass('hide');
    $('body').addClass('dark');
    $('body').removeClass('light');
  })

  $('.fa-toggle-on').on('click', () => { // toggle off night mode
    $('.fa-toggle-on').addClass('hide');
    $('.fa-toggle-off').removeClass('hide');
    $('body').addClass('light');
    $('body').removeClass('dark');
  })

  const renderTweets = function(tweets) { // render all tweets

    $('#tweets-container').empty(); // empty container
    
    const sortedTweets = tweets.sort((a, b) => { // sort tweets from most to least recent
      if (a.created_at > b.created_at) {
        return -1;
      } else {
        return 1;
      }
    });

    for (const tweet of sortedTweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };  

  const createTweetElement = (tweet) => { // create single tweet article

    const time = timeago.format(tweet.created_at);

    const escape = function (str) { // prevent XSS with escaping
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
    </article>`
    return $tweet;
  }

  // Form Submission using jQuery
  
  $('form').submit(function(event) { // listen for submit event on the form element
    event.preventDefault();

    const input = $(this).children('#tweet-text').val(); // get the # of chars in new tweet
    const tweetCount = $(this.counter).val(); // get the remaining chars

    if (input === "") {
      $('#too-long').hide();
      $('#empty-tweet').removeClass('hide').slideDown();

    } else if (tweetCount < 0) {
      $('#empty-tweet').hide();
      $('#too-long').removeClass('hide').slideDown();

    } else {
      $('.error').slideUp();

      const newTweet = $(this).serialize(); // happy path, send ajax request to /tweets/
      $.ajax({
        url: "/tweets/",
        method: 'POST',
        data: newTweet,
        success: function() {
          $('#tweet-text').val(''); // clear form after submission
          loadTweets();
        }
      });

      $(this.counter).val(140); // reset counter
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

});