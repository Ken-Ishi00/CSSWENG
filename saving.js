$("#est-save").click(function () {
  file.save(estArray);
});

$("#est-load").click( async function () {
  let data = await file.load();
  estArray = [];
  estSize = 1;
  $("#est-list").empty();
  data.forEach((item, index) => {
    var estName = item[0];
    var estQty = item[1];
    var estUnit = item[2];
    var estLUC = parseInt(item[3]);
    var estLAC = parseInt(item[4]);
    var estMUC = parseInt(item[5]);
    var estMAC = parseInt(item[6]);
    var estTotal = parseInt(item[7]);
    $("#est-list").append(
      `<tr id="est-item-${estSize - 1}">
        <td>${estName}</td>
        <td id="${estSize - 1}-est-qty">${estQty}</td>
        <td>${estUnit}</td>
        <td>${estLUC}</td>
        <td id="${estSize - 1}-est-LAC">${estLAC}</td>
        <td>${estMUC}</td>
        <td id="${estSize - 1}-est-MAC">${estMAC}</td>
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
      estQty,
      estUnit,
      estLUC,
      estLAC,
      estMUC,
      estMAC,
      estTotal,
    ];
    estArray.push(tempEstArray);
    estSize++;
  });
});

$("#est-export").click(function () {
  file.exportCSV(estArray);
});
