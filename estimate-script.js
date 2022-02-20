estArray = [];
estSize = 1;
$("#est-list").on("click", ".est-editButton", function () {
  var oldQty = this.parentElement.parentElement.children[1].textContent;
  var index = this.parentElement.parentElement.children[1].id.slice(0, 1);

  $(`#${index}-est-qty`).html(
    $(
      `<input type="text" id="tempQty" value="${oldQty}" form="${index}-est-editForm" style="width:30px">` +
      `</input>`
    )
  );
  $(`#${index}-est-edit`).hide();
  $(`#${index}-est-save`).show();

  $(`#${index}-est-save`).on("click", function () {
    estArray[index][1] = $("#tempQty").val();
    $(`#${index}-est-qty`).html($("#tempQty").val());
    estArray[index][4] = estArray[index][3] * estArray[index][1];
    estArray[index][6] = estArray[index][5] * estArray[index][1];
    estArray[index][7] = estArray[index][6] + estArray[index][4];
    $(`#${index}-est-LAC`).html(estArray[index][4]);
    $(`#${index}-est-MAC`).html(estArray[index][6]);
    $(`#${index}-est-total`).html(estArray[index][7]);

    $(`#${index}-est-edit`).show();
    $(`#${index}-est-save`).hide();
  });
});

$("#est-list").on("click", ".est-delButton", function () {
  var tempSlice = this.parentElement.parentElement.children[1].id.slice(0, 2);
  var dash = tempSlice.slice(-1);
  if (dash == "-") {
    var index = parseInt(this.parentElement.parentElement.children[1].id.slice(0, 1));
    $(`#est-item-${index}`).remove();
    estArray.splice(index, 1);
  } else {
    console.log("test");
    var index = parseInt(this.parentElement.parentElement.children[1].id.slice(0, 2));
    $(`#est-item-${index}`).remove();
    estArray.splice(index, 1);
  }
});
