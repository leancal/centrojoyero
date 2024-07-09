$(document).ready(function(){
$("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
verlistado();

/*$('#estados').puidropdown({
	change: function(){
	$("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
	alert('valor :'+$("#estados").val());
				$.ajax({
						type: "POST",
						url: "dataTable.php",
						data: {opcion:'1', estado:$("#estados").val()},
						success: function(dataTable) 
						{
							$("#contenido").html(dataTable);
						},
						error: function(bimestre) 
						{
							$('#messages').puigrowl('show', [{severity:'error', summary: '!!', detail: 'La base de datos no responde.'}]);
						}
					})
	}
} ); //fin de combo estados */

})// fin document ready


function verlistado(){ //FUNCION PARA MOSTRAR EL LISTADO EN EL INDEX POR JQUERY

var randomnumber=Math.random()*11;
$.post("dataTable.php", {
opcion:0
}, function(data){

$("#contenido").html(data);
});


	

}