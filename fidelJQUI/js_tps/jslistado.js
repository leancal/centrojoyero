$(document).ready(function(){
	
var table = $("#tps");


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
												"sProcessing":     "Procesando...",
												"sLengthMenu":     "Mostrar _MENU_ registros",
												"sZeroRecords":    "No se encontraron resultados",
												"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
												"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
												"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
												"sInfoPostFix":    "",
												"sSearch":         "Buscar:",
												"sUrl":            "",
												"sInfoThousands":  ",",
												"sLoadingRecords": "Cargando...",
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
			//alert ($( "a.paginate_button.current" ).text() );
			var pagina = parseInt($( "a.paginate_button.current" ).text() );
			var fetch = sValue.split(",");		
			
			
			var aPos = oTable.fnGetPosition(this);
			 
			oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);	
			
			oTable.fnPageChange(pagina-1);
				
		},
		"submitdata": function(value, settings) {
			return {
				"row_id": this.parentNode.getAttribute("id"),
				"column": oTable.fnGetPosition(this)[2]
			};
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
	// menu 
	$('#mb1').puimenubar();
                
                $('#mb2').puimenubar({
                    autoDisplay: false
                });

	
/* DIALOGS PARA SELECCIONAR FILTROS */

$('#inline').puilightbox(); 

$('#dlg').puidialog({
        showEffect: 'fade',
        hideEffect: 'fade',
        minimizable: true,
        maximizable: true,
        modal: true,
        buttons: [{
                text: 'Filtrar',
                icon: 'ui-icon-check',
                click: function() {
									$('#dlg').puidialog('hide');
									opciones=$('.chk:checked').serialize();
									$("#contenido").html("<center> <img src=\"img/load29.gif\" /> <br/> espere un momento por favor ..</center>");
									//$('#inline').puilightbox('hide'); 
									$.ajax({
										url: "dataTable.php",
										type: "post",
										data: opciones,
										success: function(data) {
										$('#contenido').html(data);
										}
										});
									}
            },
            {
                text: 'Cancelar',
                icon: 'ui-icon-close',
                click: function() {
                    $('#dlg').puidialog('hide');
                }
            }
        ]
    });

 $('#btn-show').puibutton({  
        icon: 'ui-icon-carat-1-s',  
        click: function() {  
            $('#dlg').puidialog('show');  
        }  
    });  
	
	
$('#dlg2').puidialog({
        showEffect: 'fade',
        hideEffect: 'fade',
        minimizable: true,
        maximizable: true,
        modal: true,
		width:'400',
		height:'200',
        buttons: [{
                text: 'Filtrar',
                icon: 'ui-icon-check',
                click: function() {
									$('#dlg2').puidialog('hide');
									opciones=$('.chk2:checked').serialize();
									$("#contenido").html("<center> <img src=\"img/load29.gif\" /> <br/> espere un momento por favor ..</center>");
									//$('#inline').puilightbox('hide'); 
									$.ajax({
										url: "dataTable.php",
										type: "post",
										data: opciones,
										success: function(data) {
										$('#contenido').html(data);
										}
										});
									}
            },
            {
                text: 'Cancelar',
                icon: 'ui-icon-close',
                click: function() {
                    $('#dlg2').puidialog('hide');
                }
            }
        ]
    });
	
$('#btn-cpea').puibutton({  
        icon: 'ui-icon-carat-1-s',  
        click: function() {  
            $('#dlg2').puidialog('show');  
        }  
    });  
$('#btn-cvemun').puibutton({  
        icon: 'ui-icon-carat-1-s',        
    });  
	
$('#btn-acepta').puibutton({  
        icon: 'ui-icon-arrow-4-diag',  
        click: function() {  
            $('#inline').puilightbox('hide'); 
			$("#contenido").html("<center> <img src=\"img/load29.gif\" /> <br/> espere un momento por favor ..</center>");
			$.ajax({
				url: "dataTable.php",
				type: "post",
				data: $('.chk:checked').serialize(),
				success: function(data) {
				$('#contenido').html(data);
				}
				});
        } 
        }  
    ); 

$(':checkbox').puicheckbox();


function actual() {  
            $('#inline').puilightbox('hide'); 
			$("#contenido").html("<center> <img src=\"img/load29.gif\" /> <br/> espere un momento por favor ..</center>");
			$.ajax({
				url: "dataTable.php",
				type: "post",
				data: $('.chk:checked').serialize(),
				success: function(data) {
				$('#contenido').html(data);
				}
				});
        }  

})