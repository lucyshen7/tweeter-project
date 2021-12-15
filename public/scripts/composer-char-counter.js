$(document).ready(function() {

  const $tweetText = $('#tweet-text');

  $tweetText.on('input', function() {
    const newText = $tweetText.val();

    const $newText = $(this).text(newText);
    $tweetText.append($newText);

    const textLength = $(this).val().length; // wrap "this" in jQuery to find char length
    const remainingChar = 140 - textLength;

    const $counter = $(this.parentElement.counter);
    
    $counter.val(remainingChar); // set value of counter to remaining char count

    if ($counter.val() < 0) {
      $counter.addClass("redCounter");
    } else {
      $counter.removeClass("redCounter");
    }
  });
});
