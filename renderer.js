// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

async function initializeData() {
    dataArray = await window.gsheets.getData()
    dataArray.forEach((item, i) => {
        var cItemName = item[0];
        var cItemUnit = item[1];
        var cItemLUC = item[2];
        var cItemMUC = item[3];

        $("#item-list").append(
            `<tr>
                <td></td>
                <td id="${i}-Name" class="item item-name">${cItemName}</td>
                <td id="${i}-unit" class="item item-unit">${cItemUnit}</td>
                <td id="${i}-LUC" class="item item-LUC">${cItemLUC}</td>
                <td id="${i}-MUC" class="item item-MUC">${cItemMUC}</td>
                <td><button id="${i}-edit" type="button" onclick="editFunction()">Edit</button></td>
            </tr>`
        );
        


    });
}

initializeData()
