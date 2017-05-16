


function hideElements() {
  $table.hide();
  $('.listNutrients').hide()
  $('table').hide()
}
function clickFoodItem() {
  $('.nutritionFacts').on("click", "a.addButton", getFoodItemData);
}
function getFoodItemData() {
  const $targetParent = $(this).parents('tr')[0]
  const targetData = JSON.parse($targetParent.dataset.json);
  const nutrientsList = createNutrientsList($(targetData));

  $('.listNutrients').show();
  $('.listNutrients').append(nutrientsList);
}
function createNutrientsList(data) {
  return $(`<div class="itemSelector">
    <li data-json='${JSON.stringify(data)}' class="collection-header truncate"><a class="deleteButton waves-effect waves-light btn-floating btn"><i class="material-icons">delete</i></a>  ${data[0].fields.item_name}</li>
    <li class="collection-item">Calories: <span class="calories">${Math.round(data[0].fields.nf_calories)}</span><br>
    Fats:<span class="fats"> ${Math.round(data[0].fields.nf_total_fat)}</span><br>
    Carbohydrates: <span class="carbs"${Math.round(data[0].fields.nf_total_carbohydrate)}</span><br>
    Protein: <span class="protein">${Math.round(data[0].fields.nf_protein)}</span><br>
    </li>
    </div>
    `)
}

function removeFromList() {
  $('.listNutrients').on("click", "a.deleteButton", removeItem)
}
function removeItem() {
  const deleteFromList = $(this).parents('.itemSelector');
  deleteFromList.remove();
}
