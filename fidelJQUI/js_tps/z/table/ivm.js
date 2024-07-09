 var xmlhttp;
 function GetXmlHttpObject(){
 	if (window.XMLHttpRequest){
 		return new XMLHttpRequest();
 	}
 	if (window.ActiveXObject){
 		return new ActiveXObject("Microsoft.XMLHTTP");
 	}
 	return null;
 }
 /****************************************** Zona de Atencion ******************************************************/
 var famE,famO,CasoB;
 function Casos(idCaso,fam,famOrigen,mov){
	famE = fam;
	famO = famOrigen;
	CasoB = idCaso;
 	xmlhttp=GetXmlHttpObject();
 	url = 'sioo_fam_dup.php?casoDupId=' + idCaso + '&fam=' + fam + '&famOrigen=' + famOrigen;
 	xmlhttp.onreadystatechange = stateChangedCasos;
 	xmlhttp.open("GET",url,true);
 	xmlhttp.send(null);
	
 }
 function stateChangedCasos(){
 	if (xmlhttp.readyState==4){
 		document.getElementById("Caso").innerHTML=xmlhttp.responseText;
		famBase(famE,famO,CasoB);
		
 	}
 }  
/****************************************** Datos de la Familia Base ***********************************************/ 
 function famBase(fam,famOr){
  	xmlhttp=GetXmlHttpObject();
  	url = 'sioo_casos_fam_dup.php?fam=' + fam + '&familiaOrigen=' + famOr + '&CasoBase=' + CasoB;
  	xmlhttp.onreadystatechange = stateChangedFamBase;
  	xmlhttp.open("GET",url,true);
  	xmlhttp.send(null);
  }
  function stateChangedFamBase(){
  	if (xmlhttp.readyState==4){
  		document.getElementById("base").innerHTML=xmlhttp.responseText;
  		document.getElementById("texto").innerHTML='Caso Base :'+document.getElementById('CasoBaseT').value;
		familiaDup(document.getElementById('0').value);
  	}
 }
 /****************************************** Datos de la Familia Duplicada ***********************************************/ 
  function familiaDup(fam){
   	xmlhttp=GetXmlHttpObject();
   	url = 'sioo_casos_fam_dup.php?fam=' + fam;
   	xmlhttp.onreadystatechange = stateChangedFamiliaDup;
   	xmlhttp.open("GET",url,true);
   	xmlhttp.send(null);
   }
   function stateChangedFamiliaDup(){
   	if (xmlhttp.readyState==4){
   		document.getElementById("familias").innerHTML=xmlhttp.responseText;
   	}
   }
