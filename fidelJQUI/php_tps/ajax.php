<?php

include('functions.php');

if (isset($_GET['r'])) {
    // Ejecuta las funciones por cada peticion
    $r = clean_input($_GET['r']);
    // para borrar de de la base de datos el registro elegido en tabla tps 
    if ($r == 'delete_celeb') {
        $fp = fopen('data.txt', 'w+');
        fwrite($fp, 'borra');
        fclose($fp);
        if (isset($_GET['id'])) {
            $celeb_id = intval($_GET['id']);
            if (!empty($celeb_id)) {
                /*
                  Borrando informacion

                 */

                ## Sending the response back to the page
                echo 'El registro ha sido borrado.';
            } else {
                echo 'Error, valores nulos.';
            }
        } else {
            echo 'error, solicitud invalida.';
        }
    }

    // Editando informacion en la tabla #tps 
    if ($r == 'edita') {

        if (isset($_POST['value']) && isset($_POST['column']) && isset($_POST['row_id'])) {
            $new_value = clean_input($_POST['value']);
            $column = intval($_POST['column']);
            $c_id = intval($_POST['row_id']);
            $columnas = $_POST['columnas'];

            //actualiza();
            $fp = fopen('data.txt', 'a+');
            fwrite($fp, "\ntamaño: " . sizeof($columnas) . " | valor- " . $new_value . " columna - " . $column . "  id-" . $c_id . " columnas : [0] " . $columnas[0] . " [1] : " . $columnas[1] . " [2] :" . $columnas[2] . "   [3] :" . $columnas[3] . "  [4]:" . $columnas[4] . " [5]:" . $columnas[5] . "  [6]:" . $columnas[6] . "  [7]:" . $columnas[7] . " [8]:" . $columnas[8] . "  [9]:" . $columnas[9] . "  [10]:" . $columnas[10] . "  [11]:" . $columnas[11] . " [12]:" . $columnas[12] . "  [13]:" . $columnas[13] . "  [14]:" . $columnas[14] . "  [15]:" . $columnas[15] . " \n");
            fclose($fp);
            if (!empty($column) && !empty($c_id)) {

                if ($col == 5) {/*
                  $new_value=str_replace("_", "", $_POST['value']);
                  $queryCheck2= "select sb.clave_sucursal AS CVE , sb.nombre_sucursal AS DESCRIPCION
                  from sucursales_bansefi sb
                  where sb.bansefi_estado_id=18  AND sb.clave_sucursal IN (".$new_value.")
                  ";

                  $fp = fopen('data.txt', 'a+');
                  fwrite($fp, "\n".$queryCheck2);
                  fclose($fp);

                  $stmtCheck2 = ociparse($pruebas,$queryCheck2);
                  OCIDefineByName($stmtCheck2,"CVE",$PID);
                  OCIDefineByName($stmtCheck2,"DESCRIPCION",$DESCRIPCION);
                  ociexecute($stmtCheck2,OCI_DEFAULT);

                  $c=0;
                  $products = array();
                  while(ocifetch($stmtCheck2))
                  {
                  $resultCheck2.=$PID.",".$DESCRIPCION ;
                  $c++;
                  } */
                    $new_value = "" . str_replace("_", "", $_POST['value']) . ",dos";
                }

                /*
                  Actualizando la informacion con un query
                  idealmente se actualizará en la base de datos
                 */
                //sumar dias a fecha propuesta

                $fecha = date($columnas[14]);
                $nuevafecha = strtotime('+' . clean_input($_POST['value']) . ' day', strtotime($fecha));
                $nuevafecha = date('Y/m/d', $nuevafecha);
                $date1 = str_replace("/", "", $nuevafecha);
                $date2 = str_replace("/", "", $columnas[15]);
                if ($date1 > $date2) {
                    $dateFin = $nuevafecha;
                } else {
                    $dateFin = $columnas[15];
                }

                ## Enviando los resultados a la pagina
                echo 'exito,' . $new_value . "," . $columnas[6] . "," . $columnas[13] . "," . $nuevafecha . "," . $dateFin;
                $fp = fopen('data.txt', 'a+');
                fwrite($fp, "\n exito," . $new_value . "," . $columnas[6] . "," . $columnas[13] . "," . $nuevafecha . "," . $dateFin . "\n");
                fclose($fp);
            } else {
                echo 'error,valores nulos.';
            }
        } else {
            echo 'error en solicitud.';
        }
    }
} else {
    echo 'error, se hizo una solicitud invalida.';
}

function actualiza($PEALOC_ID, $PEA_ID, $FECHA_INI, $DIA_PEA, $NUM_DEA, $FECHA_FIN, $RUTA) {
    require "../CONEXION_USR_SIOO/conexion2.php";

    $proc = "begin  pg_trf_entrega_apoyos.PA_ACTUALIZA_PUNTO_ENT_APY_LOC (:PINPUNTOENTAPOYOLOCID ,:PINPUNTOENTGAPOYOID ,:PIDFECHAINICIOENTREGAAPY ,:PINDIAENTREGAAPOYO ,:PINDURACENTGAPOYO ,:PIDFECHATERENTGAPY ,:PINRUTA ,:PONERROR ,:POSERROR ); end;";
    $stmt = oci_parse($pruebas, $proc);
    $rc = oci_new_cursor($pruebas);
    oci_bind_by_name($stmt, ":PINPUNTOENTAPOYOLOCID", $PEALOC_ID);
    oci_bind_by_name($stmt, ":PINPUNTOENTGAPOYOID", $PEA_ID);
    oci_bind_by_name($stmt, ":PIDFECHAINICIOENTREGAAPY", $FECHA_INI);
    oci_bind_by_name($stmt, ":PINDIAENTREGAAPOYO", $DIA_PEA);
    oci_bind_by_name($stmt, ":PINDURACENTGAPOYO", $NUM_DEA);
    oci_bind_by_name($stmt, ":PIDFECHATERENTGAPY", $FECHA_FIN);
    oci_bind_by_name($stmt, ":PINRUTA", $RUTA);
    oci_bind_by_name($stmt, ":PONERROR", $PONERROR, 1000);
    oci_bind_by_name($stmt, ":POSERROR ", $POSERROR, 1000);
    oci_execute($stmt);
    oci_execute($rc);
}

?>	