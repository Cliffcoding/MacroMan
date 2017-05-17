const $nutritionFacts = $('.nutritionFacts');
const $searchInput = $('#searchInput');
const $table = $('table')
const caloriesPerFat = 9
const caloriesPerCarbProtein = 4

const macroNutrients = "?fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate%2C"
const keyId = "&appId=4e7274ea&appKey=882bd0a0ffb027f291e1829749c05598"
const url = "https://api.nutritionix.com/v1_1/search/"

const macroTotal = {
  calories: null,
  fats: null,
  carbs: null,
  protein: null
}
function submitForm(event) {
  event.preventDefault();
  $table.show();
  $nutritionFacts.empty();
  getNutrients();

}
function getUserMacros(event) {
  event.preventDefault();
  $('#searchSubmit').show();
  parseFat = parseInt($('#userFats').val(), 10)
  parseCarbs = parseInt($('#userCarbs').val(), 10)
  parseProtein = parseInt($('#userProtein').val(), 10)
  macroTotal.calories = (parseFat * caloriesPerFat) + ((parseProtein + parseCarbs) * caloriesPerCarbProtein)
  macroTotal.fats = parseFat;
  macroTotal.carbs = parseCarbs;
  macroTotal.protein = parseProtein;
  updateMacros();
};
function updateMacros() {
  $('.results').empty()
  $('.results').append(addMacros);
}
function addMacros() {
  return $(`
    <p>Calories: ${macroTotal.calories}</p>
    <p>Fats: ${macroTotal.fats}</p>
    <p>Carbohydrates: ${macroTotal.carbs}</p>
    <p>Protein: ${macroTotal.protein}</p>
    `)
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
  const nutrientsTable = createNutrientsTable(nutrients)
  $('.nutritionFacts').append(nutrientsTable);
}
function createNutrientsTable(nutrients) {
  return $(`
        <tr data-json='${JSON.stringify(nutrients)}'>
          <td><a class="addButton blue-grey lighten-1 waves-effect waves-light btn-floating btn-large"><i class="material-icons">add</i></a></td>
          <td>${nutrients.fields.item_name}</td>
          <td>${Math.round(nutrients.fields.nf_calories)}</td>
          <td>${Math.round(nutrients.fields.nf_total_fat)}</td>
          <td>${Math.round(nutrients.fields.nf_total_carbohydrate)}</td>
          <td>${Math.round(nutrients.fields.nf_protein)}</td>
        </tr>
`);
}
