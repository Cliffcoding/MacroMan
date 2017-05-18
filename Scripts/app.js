const $nutritionFacts = $('.nutritionFacts');
const $searchInput = $('#searchInput');
const $table = $('table');
const caloriesPerFat = 9;
const caloriesPerCarbProtein = 4;

const macroNutrients = "?results=0:15&fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_total_carbohydrate%2C";
const keyId = "&appId=4e7274ea&appKey=882bd0a0ffb027f291e1829749c05598";
const url = "https://api.nutritionix.com/v1_1/search/";

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

function toggleAbout() {
  $('#about').toggle();
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
  updatePieChart();
}

function addMacros() {
  return $(`
    <article class="col s12 m6 l4">
    <h5>Calories Remaining</h5>
    <p>Calories: ${macroTotal.calories}</p>
    </article>
    <article class="col s12 m6 l4">
    <h5>Macronutrients Remaining</h5>
    <p>Fats: ${macroTotal.fats}</p>
    <p>Carbohydrates: ${macroTotal.carbs}</p>
    <p>Protein: ${macroTotal.protein}</p>
    </article>
    <article class="col s12 l4">
    </canvas><canvas id="myChart"></canvas>
    </article>
    `)
}

function updatePieChart() {
  var ctx = $('#myChart')[0].getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Fats", "Carbohydrates", "Protein"],
      datasets: [{
        backgroundColor: [
          "#2ecc71",
          "#3498db",
          "#95a5a6"
        ],
        data: [macroTotal.fats * caloriesPerFat, macroTotal.carbs * caloriesPerCarbProtein, macroTotal.protein * caloriesPerCarbProtein]
      }]
    }
  });

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
          <td><a class="addButton cyan lighten-1 waves-effect waves-light btn-floating btn-large"><i class="material-icons">add</i></a></td>
          <td>${nutrients.fields.item_name}</td>
          <td>${Math.round(nutrients.fields.nf_calories)}</td>
          <td>${Math.round(nutrients.fields.nf_total_fat)}</td>
          <td>${Math.round(nutrients.fields.nf_total_carbohydrate)}</td>
          <td>${Math.round(nutrients.fields.nf_protein)}</td>
        </tr>
`);
}
