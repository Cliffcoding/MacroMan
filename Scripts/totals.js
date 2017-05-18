$(appReady);

function appReady() {
  hideElements()
  clickFoodItem();
  removeFromList();
  $('#macroSubmit').submit(getUserMacros)
  $('#searchSubmit').submit(submitForm);
  $('#searchSubmit').submit(function() {
    $('html, body').stop(true, true).animate({
      scrollTop: $('table').delay(300).offset().top
    }, 1500);
  });
  $('#idLink').on("click", toggleAbout)
  $('.dismiss').on('click', function() {
    $('#about').hide();
  })
  $('.clear-search').click(function () {
    $('.nutritionFacts').empty();
    $('table').hide()
  })
}
