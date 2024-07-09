$(document).ready(function(){
	
	$.editable.addInputType('masked', {
		element : function(settings, original) {
				/* Crea un input. Enmascara usando el pluggin masked  */
				
				var input = $('<input />').mask(settings.mask);
				$(this).append(input);
				return(input);
			}
		});
	$.editable.addInputType('datepicker', {
    element : function(settings, original) {
        var input = $('<input>');
        if (settings.width  != 'none') { input.width(settings.width);  }
    	if (settings.height != 'none') { input.height(settings.height); }
        input.attr('autocomplete','off');
    	$(this).append(input);
    	return(input);
    },
   plugin : function(settings, original) {
        var form = this;
        settings.onblur = 'cancel';
        $(this).find('input').datepicker({
			showAnim: 'clip',
            dateFormat: 'yy/mm/dd',
            onSelect: function(dateText) { $(this).hide(); $(form).trigger("submit"); },
            onClose: function(dateText) { $(this).hide(); $(form).trigger("submit"); }
            //onClose: function(dateText) { $(this).hide(); $(form).trigger("submit");}
        });            
    },
    submit  : function(settings, original) { },
    reset   : function(settings, original) { }
});
	

var table = $("#tps");
/*Inicializamos la tabla*/
var oTable = table.dataTable(
								{	
									"sPaginationType": "full_numbers", 
									"bStateSave": true,
									"searching": false,
									"ordering":  true,
									"entries":true,
									"language": {
												"emptyTable": "No data available in table",
												"info": "Mostrando paginas _PAGE_ de _PAGES_",
												"lengthMenu":     'Mostrar <select>'+
																	 
																	 '<option value="10">10</option>'+
																	 '<option value="30">30</option>'+																	 
																	 '<option value="50">50</option>'+
																	 '<option value="100">100</option>'+
																	 '<option value="-1">Todas</option>'+
																	 '</select>  registros',
												"sProcessing":     "Procesando...",
												"sLengthMenu":      'Mostrar <select>'+
																	 '<option value="10">10</option>'+
																	 '<option value="30">30</option>'+																	 
																	 '<option value="50">50</option>'+
																	 '<option value="100">100</option>'+
																	 '<option value="-1">Todas</option>'+
																	 '</select>  registros',
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
															},
												"dom": 'T<"clear">lfrtip',
									"tableTools": {
										"sSwfPath": "/swf/copy_csv_xls_pdf.swf"
									},
															
												}
									


								}
							);
							
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( data[0] ) || 0; // usamos los datos de la columna que nos interesa
 
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && age <= max ) ||
             ( min <= age   && isNaN( max ) ) ||
             ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);
 

     
    // evento que escucha los dos rangos para filtrar y redibujar 
    $('#min, #max').keyup( function() {
        oTable.draw();
    } );
	
	
	
	
	$(document).on("click", ".delete", function() {
		var celeb_id = $(this).attr("id").replace("delete-", "");
		var parent = $("#"+celeb_id);
		alert(" el id tr "+celeb_id);
		$.ajax({
			type: "get",
			url: "php_tps/ajax.php?r=delete_celeb&id="+celeb_id,
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
 $('#messages').puigrowl({
 sticky:false,
 life:10000,
 });
$('#dlg').puidialog({
		  location : 'left top',
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
									$("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
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
	
	
$('#dlg2').puidialog({
		location : 'left top',
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
									$("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
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
	
$('#dlg3').puidialog({
        showEffect: 'fade',
        hideEffect: 'fade',
        minimizable: true,
        maximizable: true,
        modal: true,
		width:'200',
		height:'50',
		  location : 'left top',
        buttons: [{
                text: 'Aplicar',
                icon: 'ui-icon-check',
                click: function() {
						$("#aplicaFecha").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> aplicando fecha a la tabla ..</center>");
						var tabla=oTable.fnGetData();
			//alert("aaaa"+tabla.length);
						var iniFecha=$("#datepicker").val();
				alert(iniFecha);
						
									//$('#inline').puilightbox('hide'); 
									$.ajax({
										url: "dataTable.php",
										type: "post",
										data: {iniciaFecha:iniFecha},
										success: function(data) {
										$('#contenido').html(data);
										}
										});
									$('#dlg3').puidialog('hide');
									$("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");									
									
										}
						},
						{
							text: 'Cancelar',
							icon: 'ui-icon-close',
							click: function() {
								$('#dlg3').puidialog('hide');
							}
            }
        ]
    });
	
$('#dlg-save').puidialog({
        showEffect: 'fade',
        hideEffect: 'fade',
        minimizable: true,
		location : 'left top',
        maximizable: true,
        modal: true,
		width:'250',
		height:'40',
        buttons: [{
                text: 'aceptar',
                icon: 'ui-icon-check',
                click: function() {
									$('#dlg-save').puidialog('hide');
									var tabla=oTable.fnGetData();
									//alert (tabla);
									$("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
									//$('#inline').puilightbox('hide'); 
									$.ajax({
										url: "sioo_salva_tps.php",
										type: "post",
										data: {opcion:tabla},
										//dataType: "json",
										success: function(data) {
										$( "#mb2" ).hide( "slow" );
										$('#contenido').html(data);
										}
										});
									}
            },
            {
                text: 'Cancelar',
                icon: 'ui-icon-close',
                click: function() {
                    $('#dlg-save').puidialog('hide');
                }
            }
        ]
    });
	
/*$('#btn-cpea').puibutton({  
        icon: 'ui-icon-carat-1-s',  
        click: function() {  
            $('#dlg2').puidialog('show');  
        }  
    });  */
$('#btn-cvemun').puibutton({  
        icon: 'ui-icon-carat-1-s',        
    });  
	
$('#btn-acepta').puibutton({  
        icon: 'ui-icon-arrow-4-diag',  
        click: function() {  
            $('#inline').puilightbox('hide'); 
			$("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
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
/*Barra de menu*/
$( "#mb2" ).show( "slow" );
$('#mb2').puimenubar({  
            autoDisplay: false  
        }); 
/* Calendarios*/
$(function() {
    $( ".datepicker" ).datepicker({
      showButtonPanel: false,
	  dateFormat: 'yy/mm/dd',
	  showAnim: 'clip'
    });
  });
/* */
function actual() {  
            $('#inline').puilightbox('hide'); 
			$("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
			$.ajax({
				url: "dataTable.php",
				type: "post",
				data: $('.chk:checked').serialize(),
				success: function(data) {
				$('#contenido').html(data);
				}
				});
        } 
	
 } );
