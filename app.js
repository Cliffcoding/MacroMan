const $nutritionFacts = $('.nutritionFacts');
const $searchInput = $('#searchInput');
const macroNutrients = "?fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate%2C"
const keyId = "&appId=4e7274ea&appKey=882bd0a0ffb027f291e1829749c05598"
const url = "https://api.nutritionix.com/v1_1/search/"
const $form = $('form');


function submitForm(event) {
  event.preventDefault();
  $nutritionFacts.empty();
  getNutrients();
}
function getNutrients() {
  $.get(url + $searchInput.val() + macroNutrients + keyId)
  .then(showNutrients);

}
function showNutrients(result) {
  const results = result.hits
  results.forEach(addNutrients);
}
function addNutrients(nutrients) {
  const nutrientsElement = createNutrientsElement(nutrients)
  $('.nutritionFacts').append(nutrientsElement);
}
function createNutrientsElement(nutrients) {
  return $(`
          <tr>
            <td><a class="addButton waves-effect waves-light btn-floating btn-large scale-transition"><i class="material-icons">add</i></a></td>
            <td>${nutrients.fields.item_name}</td>
            <td>${Math.round(nutrients.fields.nf_calories)}</td>
            <td>${Math.round(nutrients.fields.nf_total_fat)}</td>
            <td>${Math.round(nutrients.fields.nf_total_carbohydrate)}</td>
            <td>${Math.round(nutrients.fields.nf_protein)}</td>
          </tr>
`);
}
