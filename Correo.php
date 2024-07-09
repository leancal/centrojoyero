<?php 
$title = "Nosotros";
$destinatario = ""; 
$asunto = "Este mensaje es de prueba"; 
$content = '
<html> 
<head> 
   <title>Prueba de correo</title> 
</head> 
<body> 
<h1>Hola amigos!</h1> 
<p> 
<b>Bienvenidos a mi correo electrónico de prueba</b>. Estoy encantado de tener tantos lectores. Este cuerpo del mensaje es del artículo de envío de mails por PHP. Habría que cambiarlo para poner tu propio cuerpo. Por cierto, cambia también las cabeceras del mensaje. 
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

mail($destinatario,$asunto,$cuerpo,$headers);
include 'Template.php';
?>