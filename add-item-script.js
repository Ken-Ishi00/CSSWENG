$("#error-form").hide();

$("#submit").click(function(){
  if($("#item-name-form").val() == '')
  {
    $("#error-form").show();
    $("#error-form").text("Item Name is Required");
  }
  else
  {
    $("#error-form").show();
    if(!$("#item-name-form").val()) //include condition to not allow same name
    {
      $("#error-form").text("This item already exists");
    }
    else
    {
      $("#error-form").hide();
      //var item-amount
      var cItemName = $("#item-name-form").val();
      var cItemUnit = $("#unit-form").val();
      var cItemLUC = $("#labor-unit-cost-form").val();
      var cItemMUC = $("#material-unit-cost-form").val();
      $("#item-list").append(
        ` <tr>
            <td></td>
            <td class="item item-name">${cItemName}</td>
            <td class="item item-unit">${cItemUnit}</td>
            <td class="item item-LUC">${cItemLUC}</td>
            <td class="item item-MUC">${cItemMUC}</td>
          </tr>
        `);

        $("#item-name-form").val("");
        $("#unit-form").val("");
        $("#labor-unit-cost-form").val("");
        $("#material-unit-cost-form").val("");

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
    }
  }
});
