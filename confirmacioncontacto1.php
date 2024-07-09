<?php
$Nombre=$_POST["Nombre"];
$Apellido=$_POST["Apellido_P"];
$Apellido=$_POST['Apellido_M']
$Edad=$_POST["Edad"];
$E_Mail=$_POST["E_Mail"];
$Telefono=$_POST["Telefono"];
$Estado=$_POST["Estado"];

if ($Nombre!="" && $Apellido_P!="" && $Edad!="" && $E_Mail!="" && $Telefono!="" && $Estado!="")

$mensaje="Conferencia Febrero 2015 \n\nNombre: $Nombre\n\nApellido: $Apellido_P\n\nEdad: $Edad\n\nE_Mail: $E_Mail \n\nTelefono: $Telefono \n\nEstado: $Estado";

mail("ventas@joyeriaoro.com.mx","Contacto",$mensaje,"From:$mail")

?>

