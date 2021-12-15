$(document).ready(function() {

  const $tweettext = $('#tweet-text')

  $tweettext.on('input', function() {
    const newText = $tweettext.val();

    const $textarea = $(this).text(newText);
    $tweettext.append($textarea);

    const textLength = $(this).val().length; // wrap "this" in jQuery
    const remainingChar = 140 - textLength;

    const counterChild = this.parentElement.counter
    const $counter = $(counterChild);

   $counter.val(remainingChar); // set value of counter to remaining char count

   console.log('counter is', $counter)
   console.log('counterChild is', counterChild)

    if ($counter.val() < 0) {
      console.log('if! counter is less than 0!')
      $counter.addClass("redCounter");
    } else {
      console.log('else!')
      $counter.removeClass("redCounter");
    }
  })
});
