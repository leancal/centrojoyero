<?php 
$title = "Confirmacion";
$content = '
<html> 
<head> 
   <title>Mensaje de Confirmación</title> 
</head> 
<body> 
<h1>JoyeriaOro.com.mx Agradece su preferencia.</h1> 
<p> 
<b>En breve uno de nuestros ejecutivos se pondrá en contacto con usted y lo asesora para que tome una excelente decisión. 
</p> 
</body> 
</html> 
'; 
include 'Template.php';

if(isset($_POST['enviar']))  {
	$emailbody = 'Nombre: '.$_POST ['Nombre']."\n"	
	.'Apellido Paterno: '.$_POST['Apellido_P']."\n"
	.'Apellido Materno: '.$_POST['Apellido_M']."\n"
	.'Edad: '.$_POST['Edad']."\n"
	.'E_Mail: '.$_POST['E_Mail']."\n"
	.'Telefono: '.$_POST['Telefono']."\n"
	.'Estado: '.$_POST['Estado'];
	mail('ventas@joyeriaoro.com.mx', 'Formulario Contacto Joyeria Oro', $emailbody,"From:$mail");
} else {
	header('location: Contacto.php');
	

}

?>