$(document).ready(function() {

  const $tweetText = $('#tweet-text');

  $tweetText.on('input', function() {
    const newText = $tweetText.val(); // get value of new tweet

    const $newText = $(this).text(newText);
    $tweetText.append($newText);

    const textLength = $(this).val().length; // wrap "this" in jQuery to find character length
    const remainingChar = 140 - textLength;

    const $counter = $(this.parentElement.counter);
    
    $counter.val(remainingChar); // set counter value to remaining character count

    if ($counter.val() < 0) {
      $counter.addClass("redCounter");
    } else {
      $counter.removeClass("redCounter");
    }
  });

  $(document).scroll(function() { // second toggle stretch
    $('#toggle-up').show();
  });

  $('#toggle-up').on('click', function() { 
    window.scrollTo(0,0);
    $('#tweet-text').focus();
  }); 

});
