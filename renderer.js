// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

async function initializeData() {
  dataArray = await window.gsheets.getData();
  dataArray.forEach((item, i) => {
    var cItemName = item[0] ? item[0] : "";
    var cItemUnit = item[1] ? item[1] : "";
    var cItemLUC = item[2] ? item[2] : "";
    var cItemMUC = item[3] ? item[3] : "";

    //ADD ITEM LIST FOR ESTIMATE SAME AS BELOW

    $("#estimate-list").append(
      `
      <tr id="est-item-${i}" class="est-items">
        <td class="est-index">${i + 1}</td>
        <td id="est-${i}-Name" class="add-est-name">${cItemName}</td>
        <td>
          <button id="${i}-est-add" class="button-3">Add</button>
        </td>
      </tr>`
    );

    $("#item-list").append(
      `<tr id="item-${i}">
        <td></td>
        <form id="${i}-editForm"></form>
        <td id="${i}-Name" class="item item-name">${cItemName}</td>
        <td id="${i}-unit" class="item item-unit">${cItemUnit}</td>
        <td id="${i}-LUC" class="item item-LUC">${cItemLUC}</td>
        <td id="${i}-MUC" class="item item-MUC">${cItemMUC}</td>
        <td>
          <button id="${i}-edit" class="editButton" type="button">Edit</button>
          <input id="${i}-save" type="submit" class="saveButton" form="${i}-editForm" value="Save"></input>
          <button id="${i}-del" class="delButton" type="button">Delete</button>
        </td>
      </tr>`
    );

    $(`#${i}-edit`).click(function () {
      var tempValName = $(`#${i}-Name`).html();
      var tempValunit = $(`#${i}-unit`).html();
      var tempValLUC = $(`#${i}-LUC`).html();
      var tempValMUC = $(`#${i}-MUC`).html();
      $(`#${i}-Name`).html(
        $(
          `<input type="text" id="tempName" value="${tempValName}" form="${i}-editForm">` +
            `</input>`
        )
      );
      $(`#${i}-unit`).html(
        $(
          `<input type="text" id="tempUnit" value="${tempValunit}" form="${i}-editForm">` +
            `</input>`
        )
      );
      $(`#${i}-LUC`).html(
        $(
          `<input type="text" id="tempLUC" value="${tempValLUC}" form="${i}-editForm">` +
            `</input>`
        )
      );
      $(`#${i}-MUC`).html(
        $(
          `<input type="text" id="tempMUC" value="${tempValMUC}" form="${i}-editForm">` +
            `</input>`
        )
      );
      $(`#${i}-edit`).hide();
      $(`#${i}-save`).show();

      $(`#${i}-editForm`).submit(function (e) {
        dataArray[i][0] = $("#tempName").val();
        $(`#${i}-Name`).html($("#tempName").val());

        dataArray[i][1] = $("#tempUnit").val();
        $(`#${i}-unit`).html($("#tempUnit").val());

        dataArray[i][2] = $("#tempLUC").val();
        $(`#${i}-LUC`).html($("#tempLUC").val());

        dataArray[i][3] = $("#tempMUC").val();
        $(`#${i}-MUC`).html($("#tempMUC").val());

        $(`#${i}-edit`).show();
        $(`#${i}-save`).hide();
        window.gsheets.updateData(dataArray);
        e.preventDefault();
      });
    });

    $(`#${i}-del`).click(function () {
      $(`#item-${i}`).remove();
      dataArray.splice(i, 1);
      window.gsheets.deleteRow(i);
    });

    function exists(arr, search) {
      return arr.some((row) => row.includes(search));
    }

    $(`#${i}-est-add`).click(function () {
      var estName = $(`#${i}-Name`).html();
      var estUnit = $(`#${i}-unit`).html();
      var estLUC = parseInt($(`#${i}-LUC`).html());
      var estMUC = parseInt($(`#${i}-MUC`).html());
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
  });
}
initializeData();
