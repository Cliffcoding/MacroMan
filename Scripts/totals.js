$(appReady);
function appReady() {
  hideElements()
  $('#macroSubmit').submit(getUserMacros)
  $('#searchSubmit').submit(submitForm);
  clickFoodItem();
  removeFromList();
  
}
