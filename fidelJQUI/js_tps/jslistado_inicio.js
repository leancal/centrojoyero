$(document).ready(function(){
	
var table = $("#celebs");

var oTable = table.dataTable(
								{	
									"sPaginationType": "full_numbers", 
									"bStateSave": true,
									"searching": false,
									"ordering":  false,
									"entries":false,
									"language": {
												"emptyTable": "No data available in table",
												"info": "Mostrando paginas _PAGE_ de _PAGES_",
												"lengthMenu":     "Mostrar _MENU_ entradas",
												"paginate": {
															"first":      "|<",
															"last":       ">|",
															"next":       ">",
															"previous":   "<"
															}
															
												}
									


								}
							);

	$(".editable", oTable.fnGetNodes()).editable("php/ajax.php?r=edit_celeb", {
		
		"callback": function(sValue, y) {	
			
			var fetch = sValue.split(",");		
			
			var aPos = oTable.fnGetPosition(this);
			oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);	
				
		},
		"submitdata": function(value, settings) {
			return {
				"row_id": this.parentNode.getAttribute("id"),
				"column": oTable.fnGetPosition(this)[2]
			};
		},
		"height": "14px"
	});
	
	$(".editable_select", oTable.fnGetNodes()).editable("php/ajax.php?r=edit_celeb", {
		indicator : '<img src="img/indicator.gif">',
		data   : "{'1':'test1','2':'test2','3':'test3'}",
		type   : "select",
		submit : "OK",
		style  : "inherit",
    
		
		"callback": function(sValue, y) {	
			
			var fetch = sValue.split(",");		
			
			var aPos = oTable.fnGetPosition(this);
			oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);	
				
		},
		"submitdata": function(value, settings) {
			return {
				"row_id": this.parentNode.getAttribute("id"),
				"column": oTable.fnGetPosition(this)[2]
			};
			oTable.fnPageChange( 4 );
		},
		"height": "14px"
	});
	
	
	

	$(document).on("click", ".delete", function() {
		var celeb_id = $(this).attr("id").replace("delete-", "");
		var parent = $("#"+celeb_id);
		alert(" el id tr "+celeb_id);
		$.ajax({
			type: "get",
			url: "php/ajax.php?r=delete_celeb&id="+celeb_id,
			data: "",
			beforeSend: function() {
			
				table.block({
					
					message: "",
					css: {
						border: "none",
						backgroundColor: "none"
					},
					overlayCSS: {
						backgroundColor: "#fff",
						opacity: "0.5",
						cursor: "wait"
					}
				});
			},
			success: function(response) {
				table.unblock();
				var get = response.split(",");
				if(get[0] == "success") {
					$(parent).fadeOut(200,function() {
						$(parent).remove();
					});
				}
			}
		});
	
	});
	


})