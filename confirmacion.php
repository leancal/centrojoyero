<?php 
$title = "Confirmacion";
$destinatario = ""; 
$asunto = "Mensaje de Confirmación"; 
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

//para el envío en formato HTML 
//$headers = "MIME-Version: 1.0\r\n"; 
$//headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

//dirección del remitente 
//$headers .= "From: Miguel Angel Alvarez <>\r\n"; 

//dirección de respuesta, si queremos que sea distinta que la del remitente 
//$headers .= "Reply-To: mariano@desarrolloweb.com\r\n"; 

//ruta del mensaje desde origen a destino 
//$headers .= "Return-path: \r\n"; 

//direcciones que recibián copia 
//$headers .= "Cc: maria@desarrolloweb.com\r\n"; 

//direcciones que recibirán copia oculta 
//$headers .= "Bcc: pepe@pepe.com,juan@juan.com\r\n"; 
$headers = 'From: '.$destinatario."\r\n".
'Reply-To: '.$destinatario."\r\n" .
'X-Mailer: PHP/' . phpversion();

mail($contacto@joyeriaoro.com.mx,$Formulario de Contacto,$cuerpo,$headers);
include 'Template.php';
?>