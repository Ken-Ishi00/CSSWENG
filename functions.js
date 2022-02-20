function generateUniqueID () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addItemToCanvas (item, index) {
  var cItemID = item[0];
  var cItemName = item[1] || "";
  var cItemUnit = item[2] || "";
  var cItemLUC = item[3] || "";
  var cItemMUC = item[4] || "";

  //ADD ITEM LIST FOR ESTIMATE SAME AS BELOW

  $("#estimate-list").append(
    `
    <tr id="est-item-${index}" class="est-items">
      <td class="est-index">${index + 1}</td>
      <td id="est-${index}-Name" class="add-est-name">${cItemName}</td>
      <td>
        <button id="${index}-est-add" class="button-3">Add</button>
      </td>
    </tr>`
  );

  $("#item-list").append(
    `<tr id="item-${index}">
      <td></td>
      <form id="${index}-editForm"></form>
      <td id="${index}-Name" class="item item-name">${cItemName}</td>
      <td id="${index}-unit" class="item item-unit">${cItemUnit}</td>
      <td id="${index}-LUC" class="item item-LUC">${cItemLUC}</td>
      <td id="${index}-MUC" class="item item-MUC">${cItemMUC}</td>
      <td>
        <button id="${index}-edit" class="editButton" type="button">Edit</button>
        <input id="${index}-save" type="submit" class="saveButton" form="${index}-editForm" value="Save"></input>
        <button id="${index}-del" class="delButton" type="button">Delete</button>
      </td>
    </tr>`
  );

  $(`#${index}-edit`).click(function () {
    var tempValName = $(`#${index}-Name`).html();
    var tempValunit = $(`#${index}-unit`).html();
    var tempValLUC = $(`#${index}-LUC`).html();
    var tempValMUC = $(`#${index}-MUC`).html();
    $(`#${index}-Name`).html(
      $(
        `<input type="text" id="tempName" value="${tempValName}" form="${index}-editForm">` +
          `</input>`
      )
    );
    $(`#${index}-unit`).html(
      $(
        `<input type="text" id="tempUnit" value="${tempValunit}" form="${index}-editForm">` +
          `</input>`
      )
    );
    $(`#${index}-LUC`).html(
      $(
        `<input type="text" id="tempLUC" value="${tempValLUC}" form="${index}-editForm">` +
          `</input>`
      )
    );
    $(`#${index}-MUC`).html(
      $(
        `<input type="text" id="tempMUC" value="${tempValMUC}" form="${index}-editForm">` +
          `</input>`
      )
    );
    $(`#${index}-edit`).hide();
    $(`#${index}-save`).show();

    $(`#${index}-editForm`).submit(function (e) {
      dataArray[index][1] = $("#tempName").val();
      $(`#${index}-Name`).html($("#tempName").val());

      dataArray[index][2] = $("#tempUnit").val();
      $(`#${index}-unit`).html($("#tempUnit").val());

      dataArray[index][3] = $("#tempLUC").val();
      $(`#${index}-LUC`).html($("#tempLUC").val());

      dataArray[index][4] = $("#tempMUC").val();
      $(`#${index}-MUC`).html($("#tempMUC").val());

      $(`#${index}-edit`).show();
      $(`#${index}-save`).hide();
      window.gsheets.updateData(dataArray);
      e.preventDefault();
    });
  });

  $(`#${index}-del`).click(function () {
    $(`#item-${index}`).remove();
    dataArray.splice(index, 1);
    window.gsheets.deleteRow(index);
  });

  function exists(arr, search) {
    return arr.some((row) => row.includes(search));
  }

  $(`#${index}-est-add`).click(function () {
    var estName = $(`#${index}-Name`).html();
    var estUnit = $(`#${index}-unit`).html();
    var estLUC = parseInt($(`#${index}-LUC`).html());
    var estMUC = parseInt($(`#${index}-MUC`).html());
    var estTotal = estLUC + estMUC;
    $("#est-list").append(
      `<tr id="est-item-${estSize - 1}">
        <td>${estName}</td>
        <td id="${estSize - 1}-est-qty">1</td>
        <td>${estUnit}</td>
        <td>${estLUC}</td>
        <td id="${estSize - 1}-est-LAC">${estLUC}</td>
        <td>${estMUC}</td>
        <td id="${estSize - 1}-est-MAC">${estMUC}</td>
        <td id="${estSize - 1}-est-total">${estTotal}</td>
        <td>
          <button id="${
            estSize - 1
          }-est-save" type="button" class="button-3 est-saveButton" style="float: right">Save</input>
          <button id="${
            estSize - 1
          }-est-edit" class="button-3 est-editButton" type="button" style="float: right">Edit Qty</button>
          <button id="${
            estSize - 1
          }-est-delete" class="est-delButton" type="button" style="float: right">Delete</button>
        </td>
      </tr>
      `
    );
    var tempEstArray = [
      estName,
      1,
      estUnit,
      estLUC,
      estLUC,
      estMUC,
      estMUC,
      estTotal,
    ];
    estArray.push(tempEstArray);
    estSize++;
  });
}
