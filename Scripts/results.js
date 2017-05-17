function hideElements() {
  $('#searchSubmit').hide();
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
  Materialize.toast(`${targetData.fields.item_name} added!`, 3000)
  $('.listNutrients').show();
  $('.listNutrients').append(nutrientsList);
  totalMacros($(targetData));
  console.log(macroTotal);
  updateMacros();
}
function createNutrientsList(data) {
  return $(`<div class="itemSelector">
    <li class="collection-header truncate macroData" data-json='${JSON.stringify(data)}'>
    <a class="deleteButton grey darken-2 waves-effect waves-light btn-floating btn"><i class="material-icons">delete</i></a>
    ${data[0].fields.item_name}</li>
    <li class="collection-item">Calories: <span class="calories">${Math.round(data[0].fields.nf_calories)}</span><br>
    Fats:<span class="fats"> ${Math.round(data[0].fields.nf_total_fat)}</span><br>
    Carbohydrates: <span class="carbs">${Math.round(data[0].fields.nf_total_carbohydrate)}</span><br>
    Protein: <span class="protein">${Math.round(data[0].fields.nf_protein)}</span><br>
    </li>
    </div>
    `)
}
function totalMacros(data) {
  macroTotal.calories -= Math.round(data[0].fields.nf_calories);
  macroTotal.carbs -= Math.round(data[0].fields.nf_total_carbohydrate);
  macroTotal.fats -= Math.round(data[0].fields.nf_total_fat);
  macroTotal.protein -= Math.round(data[0].fields.nf_protein)
}
function removeFromList() {
  $('.listNutrients').on("click", "a.deleteButton", removeItem)
}
function removeItem() {
  const deleteFromList = $(this).parents('.itemSelector');
  const targetMacros = $(this).parents('.macroData')[0]
  const deleteMacro = JSON.parse(targetMacros.dataset.json)
  deleteFromList.remove();
  removeMacros($(deleteMacro));
  updateMacros();
  console.log(macroTotal);
}
function removeMacros(data) {
  macroTotal.calories += Math.round(data[0].fields.nf_calories);
  macroTotal.carbs += Math.round(data[0].fields.nf_total_carbohydrate);
  macroTotal.fats += Math.round(data[0].fields.nf_total_fat);
  macroTotal.protein += Math.round(data[0].fields.nf_protein)
}
