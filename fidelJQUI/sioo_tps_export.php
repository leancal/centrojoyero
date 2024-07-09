<?php
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
header("Content-Disposition: attachment; filename=\"tps_export_" . $_POST['nFile'] . "_xls_" . date("Y-m-d") . ".xls\"");
header("Content-Transfer-Encoding: binary");
header("Pragma: no-cache");
header("Expires: 0");
$fp = fopen('data.txt', 'a+');
/* fwrite($fp, "\n <style>
  .header{background:#4F698A;font-size:10px;color: #FFFFFF;} .blanco{background-color:#FFF;}
  .gris{background-color: #F2F5F9;}  </style>".str_replace("\\\"", "\"", $_POST['tps_export'])."\n");
  fclose($fp); */
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <title>Sistema de Información para la operación de Oportunidades</title>
        <style>
            .header{background:#4F698A; font-size:12px;color: #FFFFFF; font-weight:bolder;}			
            .blanco{background-color:#FFF; font-size:10px; font-weight:bolder;}
            .gris{background-color: #F2F5F9;font-size:10px; font-weight:bolder;}		
        </style>
    </head> 
    <body>
        <?php
        $export = $_POST['tps_export'];
        str_replace("&nbsp;", "", $export);
        $export = str_replace("\\\"", "\"", $export);
        $export = str_replace("<th>", "<td>", $export);
        $export = str_replace("</th>", "</td>", $export);
        echo $export;
        ?>

    </body>
</html>