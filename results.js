const $addToResults = $('.addToResults');

$(appReady);

function appReady() {
  $form.submit(submitForm);

}
$('.nutritionFacts').on("click", "a.addButton", function() {
  $target = $(this).parent().parent();
  $target.clone().appendTo($('.addedNutrients'));
})
