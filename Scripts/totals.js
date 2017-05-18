$(appReady);

function appReady() {
  hideElements()
  clickFoodItem();
  removeFromList();
  $('#macroSubmit').submit(getUserMacros)
  $('#searchSubmit').submit(submitForm);
  $('#searchSubmit').submit(function() {
      $('html, body').stop(true, true).animate({
          scrollTop: $('.search').offset().top
      }, 1500);
  });
  $('.search').click(function() {
      $('html, body').stop(true, true).animate({
          scrollTop: $('.search').offset().top
      }, 1500);
  });
  $('#idLink').on("click", toggleAbout)
  $('.dismiss').on('click', function() {
    $('#about').hide();
  })
}
