<?php
if(isset($_POST['enviar']))  {
	$emailbody = 'Nombre: '.$_POST ['Nombre']."\n"	
	.'Apellido Paterno: '.$_POST['Apellido_P']."\n"
	.'Apellido Materno: '.$_POST['Apellido_M']."\n"
	.'Edad: '.$_POST['Edad']."\n"
	.'E_Mail: '.$_POST['E_Mail']."\n"
	.'Telefono: '.$_POST['Telefono']."\n"
	.'Estado: '.$_POST['Estado'];
	mail('ventas@joyeriaoro.com.mx', 'Formulario Contacto Joyeria Oro', $emailbody);
	header('location: confirmacion.php');
} else {
	header('location: Contacto.php');	
}
?>

