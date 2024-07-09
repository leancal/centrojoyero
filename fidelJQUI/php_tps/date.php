<?php

$fecha = date('2014/08/28');
$nuevafecha = strtotime('+366 day', strtotime($fecha));
$nuevafecha = date('Y/m/d', $nuevafecha);
echo $nuevafecha;
?>