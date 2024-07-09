$(document).ready(function(){
	var areaUsuario = $("#areaUsuario").val();
	
	/***** Llenamos el combo de estado *****/
	llenaComboEstado(areaUsuario);
	if(areaUsuario>=1 && areaUsuario<=32){		
		$("#listaEstados option:eq(0)").remove();
		llenaComboZonas(areaUsuario);
	}
			
	
	/***** Eventos asociados a los combos *****/
	$("#listaEstados").bind("change",function(){ 
										limpiaCombos();
										llenaComboZonas($(this).val()); 										
									 });
	$("#listaZonasAtencion").bind("change",function(){ 
												var estado = $("#listaEstados option:selected").val();	
												var zona = $(this).val();
												limpiaComboMunicipio();
												limpiaComboLocalidad();
												limpiaComboAgeb();
												llenaComboMunicipios(estado, zona); 
									 	   });
	$("#listaMunicipios").bind("change",function(){ 
												var estado = $("#listaEstados option:selected").val();
												var municipio = $(this).val();
												limpiaComboLocalidad();
												limpiaComboAgeb();
												llenaComboLocalidades(estado, municipio); 
									 	   });
	$("#listaLocalidades").bind("change",function(){ 												
												var localidad = $(this).val();
												limpiaComboAgeb();
												llenaComboAgebs(localidad); 
									 	   });

	/***** Peticiones Ajax ****/
	function llenaComboEstado(estado){
		$.ajax({type:"GET",
				url:"classes/action/common/listas_combos_geo.php?combo=estado&estado="+estado,
				dataType:"json",
				success: function(resJson){
							if(typeof resJson == "object"){
								// llenamos combo de estado
								$.each(resJson, function(indice, estado){
													$("#listaEstados").append('<option value="'+estado.id+'">'+estado.nombre+'</option>');														
												}
									  );
							}else{
								alert(resJson);
							}
						 },
				error: function(){ alert("Recurso no disponible"); }
			  });
	}
	
	function llenaComboZonas(estado){
		$.ajax({type:"GET",
				url:"classes/action/common/listas_combos_geo.php?combo=zonaAtencion&estado="+estado,
				dataType:"json",
				success: function(resJson){
							if(typeof resJson == "object"){								
								// llenamos combo de zonas									
								$.each(resJson, function(indice, zona){
													$("#listaZonasAtencion").append('<option value="'+zona.id+'">'+zona.clavezona+'</option>');														
												}
									  );	
								
							}else{
								alert(resJson);
							}
						 },
				error: function(){ alert("Recurso no disponible"); }
			  });
	}
	
	function llenaComboMunicipios(estado, zona){
		$.ajax({type:"GET",
				url:"classes/action/common/listas_combos_geo.php?combo=municipio&estado="+estado+"&zona="+zona,
				dataType:"json",
				success: function(resJson){
							if(typeof resJson == "object"){								
								// llenamos combo de municipios
								$.each(resJson, function(indice, municipio){
													$("#listaMunicipios").append('<option value="'+municipio.id+'">'+municipio.nombre+'</option>');														
												}
									  );
							}else{
								alert(resJson);
							}
						 },
				error: function(){ alert("Recurso no disponible"); }
			  });
	}
	
	function llenaComboLocalidades(estado, municipio){
		$.ajax({type:"GET",
				url:"classes/action/common/listas_combos_geo.php?combo=localidad&estado="+estado+"&municipio="+municipio,
				dataType:"json",
				success: function(resJson){							
							if(typeof resJson == "object"){																
								// llenamos combo de localidades
								$.each(resJson, function(indice, localidad){
													$("#listaLocalidades").append('<option value="'+localidad.id+'">'+localidad.nombre+'</option>');														
												}
									  );
							}else{
								alert(resJson);
							}
						 },
				error: function(){ alert("Recurso no disponible"); }
			  });
	}
	
	function llenaComboAgebs(localidad){
		$.ajax({type:"GET",
				url:"classes/action/common/listas_combos_geo.php?combo=ageb&localidad="+localidad,
				dataType:"json",
				success: function(resJson){								
							if(typeof resJson == "object"){								
								// llenamos combo de agebs
								$.each(resJson, function(indice, ageb){
													$("#listaAgebs").append('<option value="'+ageb.id+'">'+ageb.clave+'</option>');														
												}
									  );
							}else{
								alert(resJson);
							}
						 },
				error: function(){ alert("Recurso no disponible"); }
			  });
	}
	
	function limpiaComboMunicipio(){
		var numChildsMun = $("#listaMunicipios > *").length;
		if(numChildsMun > 1){// limpiamos el combo por si seleccionan otra zona de atencion
			$("#listaMunicipios option:gt(0)").remove();
		}
	}
	
	function limpiaComboLocalidad(){
		var numChildsLoc = $("#listaLocalidades > *").length;
		if(numChildsLoc > 1){// limpiamos el combo por si seleccionan otro municipio
			$("#listaLocalidades option:gt(0)").remove();
		}
	}
	
	function limpiaComboAgeb(){
		var numChildsAgeb = $("#listaAgebs > *").length;
		if(numChildsAgeb > 1){// limpiamos el combo por si seleccionan otra localidad
			$("#listaAgebs option:gt(0)").remove();
		}
	}
	
	function limpiaCombos(){
		var numChildsZA = $("#listaZonasAtencion > *").length;								
		var numChildsMun = $("#listaMunicipios > *").length;		
		var numChildsLoc = $("#listaLocalidades > *").length;
		var numChildsAgeb = $("#listaAgebs > *").length;
		
		if(numChildsZA > 1){// limpiamos el combo por si seleccionan otro estado
			$("#listaZonasAtencion option:gt(0)").remove();
		}
		if(numChildsMun > 1){// limpiamos el combo por si seleccionan otra zona de atencion
			$("#listaMunicipios option:gt(0)").remove();
		}				
		if(numChildsLoc > 1){// limpiamos el combo por si seleccionan otro municipio
			$("#listaLocalidades option:gt(0)").remove();
		}
		if(numChildsAgeb > 1){// limpiamos el combo por si seleccionan otra localidad
			$("#listaAgebs option:gt(0)").remove();
		}
	}
});// JavaScript Document