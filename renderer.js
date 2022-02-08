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
                <td class="item item-name">${cItemName}</td>
                <td class="item item-unit">${cItemUnit}</td>
                <td class="item item-LUC">${cItemLUC}</td>
                <td class="item item-MUC">${cItemMUC}</td>
            </tr>`
        );
        document.querySelectorAll("table tr td").forEach(function(node){
            node.ondblclick=function(){
                var val=this.innerHTML;
                var input=document.createElement("input");
                input.value=val;
                input.onblur=function(){
                    var val=this.value;
                    this.parentNode.innerHTML=val;
                }
                this.innerHTML="";
                this.appendChild(input);
                input.focus();
            }
        });
    });
}

initializeData()