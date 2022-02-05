$("#submit").click(function(){
  if($("#item-name-form").val() == '')
  {
    $("#error-form").text("Item Name is Required");
  }
  else
  {
    $("#error-form").text(" ");

    if(!$("#item-name-form").val()) //include condition to not allow same name
    {
      $("#error-form").text("This item already exists");
    }
    else
    {
      //var item-amount
      var cItemName = $("#item-name-form").val();
      var cItemUnit = $("#unit-form").val();
      var cItemLUC = $("#labor-unit-cost-form").val();
      var cItemMUC = $("#material-unit-cost-form").val();
      $("#item-list").append(
        ` <tr>
            <td></td>
            <td><input type="text" class="search-input item-name" placeholder="${cItemName}"></td>
            <td><input type="text" class="search-input item-unit" placeholder="${cItemUnit}"></td>
            <td><input type="text" class="search-input item-LUC" placeholder="${cItemLUC}"></td>
            <td><input type="text" class="search-input item-MUC" placeholder="${cItemMUC}"></td>
          </tr>
        `);
    }
  }
});
