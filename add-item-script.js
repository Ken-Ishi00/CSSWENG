$("#error-form").hide();

$("#submit").click(function () {
  if ($("#item-name-form").val() == "") {
    $("#error-form").show();
    $("#error-form").text("Item Name is Required");
  } else {
    $("#error-form").show();
    if (!$("#item-name-form").val()) {
      //include condition to not allow same name
      $("#error-form").text("This item already exists");
    } else {
      $("#error-form").hide();
      //var item-amount
      tempArray = [
        generateUniqueID(),
        $("#item-name-form").val(),
        $("#unit-form").val(),
        $("#labor-unit-cost-form").val(),
        $("#material-unit-cost-form").val()
      ];

      addItemToCanvas(tempArray, dataArray.length + 1)

      $("#item-name-form").val("");
      $("#unit-form").val("");
      $("#labor-unit-cost-form").val("");
      $("#material-unit-cost-form").val("");

      dataArray.push(tempArray);
      window.gsheets.updateData(dataArray);

      $("#submit").click(window.location.reload());
    }
  }
});
