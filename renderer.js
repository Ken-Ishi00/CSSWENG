// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

async function initializeData() {
    dataArray = await window.gsheets.getData()
    dataArray.forEach((item, i) => {

        var cItemName = item[0]? item[0]:"";
        var cItemUnit = item[1]? item[1]:"";
        var cItemLUC = item[2]? item[2]:"";
        var cItemMUC = item[3]? item[3]:"";

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

        $(`#${i}-edit`).click(function() {
          var tempValName = $(`#${i}-Name`).html();
          var tempValunit = $(`#${i}-unit`).html();
          var tempValLUC = $(`#${i}-LUC`).html();
          var tempValMUC = $(`#${i}-MUC`).html();
          $(`#${i}-Name`).html($(`<input type="text" id="tempName" value="${tempValName}" form="${i}-editForm">` + `</input>`));
          $(`#${i}-unit`).html($(`<input type="text" id="tempUnit" value="${tempValunit}" form="${i}-editForm">` + `</input>`));
          $(`#${i}-LUC`).html($(`<input type="text" id="tempLUC" value="${tempValLUC}" form="${i}-editForm">` + `</input>`));
          $(`#${i}-MUC`).html($(`<input type="text" id="tempMUC" value="${tempValMUC}" form="${i}-editForm">` + `</input>`));
          $(`#${i}-edit`).hide();
          $(`#${i}-save`).show();
          //$(`#${i}-edit`).replaceWith('<input id="save" type="submit" class="editButton" form="' + i + '-editForm" value="Save">' + '</input>');


          $(`#${i}-editForm`).submit(function(e) {
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
            //$("#save").replaceWith('<button id="' + i + '-edit" class="editButton" type="button">Edit</button>');
            window.gsheets.updateData(dataArray);
            e.preventDefault();
          });
        });

        $(`#${i}-del`).click(function() {
          $(`#item-${i}`).remove();
          dataArray.splice(i, 1);
          window.gsheets.deleteRow(i);
        });
    });

}
initializeData()
