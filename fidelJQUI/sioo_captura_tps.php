<?php
require "CONEXION_USR_SIOO/conexion2.php";
?>
<!doctype html>
<html lang="es">
    <head>
        <title>Editables</title>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width">
        <meta name="Description" content="Transferencias programadas del programa oportunidades." />
        <meta name="Keywords" content="Transferencias, programadas, transferencias programadas " />
        <meta name="Owner" content="SEDESOL OPORTUNIDADES" />
        <link href="css/menu.css" rel="stylesheet" type="text/css" />
        <script src="menu.js" type="text/javascript"></script>

        <link href="css_tps/primeui-1.1-min.css" rel="stylesheet">
        <link href="css_tps/jquery-ui.css" rel="stylesheet">
        <script src="js_tps/jquery.min.js" type="text/javascript"></script>
        <script src="js_tps/jquery-ui.js"  type="text/javascript"></script>
        <script src="js_tps/primeui-1.1-min.js"></script>
        <script src="js_tps/funciones.js" type="text/javascript"></script>	
        <script src="js_tps/jquery.jeditable.js" type="text/javascript"></script>
        <link href="css_tps/style.css" media="screen" rel="stylesheet" type="text/css">
        <link href="css_tps/table.css" media="screen" rel="stylesheet" type="text/css">
        <script src="js_tps/jquery.datatables.js" type="text/javascript"></script>
        <link href="css_tps/data_table.css" media="screen" rel="stylesheet" type="text/css">
        <!--script type="text/javascript" src="js/jquery.blockui.js"></script-->
    </head>
    <body>
        <div id="response" > </div>
        <table width="780" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
                <td colspan="6"><?php require "encabezado.php"; ?></td>
            </tr>
            <tr>
                <td colspan="6"><?php require "genera_menu.php"; ?></td>
            </tr>
            <tr>
                <td colspan="6">
                    <h3 style="display:none" class="title title-short" style="margin-top: 0px;">Estado</h3>  
                    <select id="estados" name="estados" style="display:none">  
                        <option value="0">SELECCIONE...</option>																
                        <?php
                        $queryEdo = "SELECT ESTADO_ID, DESCRIPCION FROM estado WHERE estado_id>0 AND estado_id<=32 ORDER BY 1 ";
                        $stmtEdo = ociparse($pruebas, $queryEdo);
                        OCIDefineByName($stmtEdo, "ESTADO_ID", $ID);
                        OCIDefineByName($stmtEdo, "DESCRIPCION", $DESC);
                        ociexecute($stmtEdo, OCI_DEFAULT);
                        while (ocifetch($stmtEdo)) {
                            $anioIter = date('Y');
                            ?>
                            <option value="<?php echo $ID; ?>" ><?php echo $DESC; ?></option>
                            <?php }
                        ?>
                    </select> 
                    <br/><br/> 

                    <div id="aplicaFecha"> </div> 
                    <ul id="mb2" style="display:none">
                        <!--li> <a data-icon="ui-icon-grip-dotted-vertical">Filtrar</a>        
                        <ul>
                                <li><a onClick="$('#dlg').puidialog('show'); ">CVE Sucursal</a></li>
                                <li><a onClick="$('#dlg2').puidialog('show'); ">INEGI Punto Entrega</a></li>					
                        </ul>    
                        </li-->
                        <li><a onClick="$('#dlg3').puidialog('show');
                                ">Fijar una fecha inicial general</a><li>
                        <li>
                            <a data-icon="ui-icon-disk" onClick="$('#dlg-save').puidialog('show');
                                    ">Guardar Registros Modificados</a>
                        </li>
                    </ul>    
                    <br/>

                    <div id="contenido" > </div>	

                </td>
            </tr>
        </table>


    </body>
</html>