<?php ?>
<script type="text/javascript" language="javascript" >
<!--
    $(document).ready(function () {

        $.editable.addInputType('masked', {
            element: function (settings, original) {
                /* Crea un input. Enmascara usando el pluggin masked  */
                var input = $('<input />').mask(settings.mask);
                $(this).append(input);
                return(input);
            }
        });

        $.editable.addInputType('datepicker', {
            element: function (settings, original) {
                var input = $('<input>');
                if (settings.width != 'none') {
                    input.width(settings.width);
                }
                if (settings.height != 'none') {
                    input.height(settings.height);
                }
                input.attr('autocomplete', 'off');
                $(this).append(input);
                return(input);
            },
            plugin: function (settings, original) {
                var form = this;
                settings.onblur = 'cancel';
                $(this).find('input').datepicker({
                    showAnim: 'clip',
                    dateFormat: 'yy/mm/dd',
                    onSelect: function (dateText) {
                        $(this).hide();
                        $(form).trigger("submit");
                    },
                    onClose: function (dateText) {
                        $(this).hide();
                        $(form).trigger("submit");
                    }
                    //onClose: function(dateText) { $(this).hide(); $(form).trigger("submit");}
                });
            },
            submit: function (settings, original) {
            },
            reset: function (settings, original) {
            }
        });


        var table = $("#tps");
        /*Inicializamos la tabla*/
        var oTable = table.dataTable(
                {
                    "sPaginationType": "full_numbers",
                    "bStateSave": true,
                    "searching": true,
                    "ordering": true,
                    "entries": true,
                    "language": {
                        "emptyTable": "No data available in table",
                        "info": "Mostrando paginas _PAGE_ de _PAGES_",
                        "lengthMenu": 'Mostrar <select>' +
                                '<option value="10">10</option>' +
                                '<option value="30">30</option>' +
                                '<option value="50">50</option>' +
                                '<option value="100">100</option>' +
                                '<option value="-1">Todas</option>' +
                                '</select>  registros',
                        "sProcessing": "Procesando...",
                        "sLengthMenu": 'Mostrar <select>' +
                                '<option value="10">10</option>' +
                                '<option value="30">30</option>' +
                                '<option value="50">50</option>' +
                                '<option value="100">100</option>' +
                                '<option value="-1">Todas</option>' +
                                '</select>  registros',
                        "sZeroRecords": "No se encontraron resultados",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "paginate": {
                            "first": "|<",
                            "last": ">|",
                            "next": ">",
                            "previous": "<"
                        },
                        "dom": 'T<"clear">lfrtip',
                        "tableTools": {
                            "sSwfPath": "/swf/copy_csv_xls_pdf.swf"
                        },
                    }



                }
        );


        $.fn.dataTable.ext.search.push(
                function (settings, data, dataIndex) {
//var min = parseInt( $('#min').val(), 10 );
                    var suc = parseInt($('#suc').val(), 10);
                    var sucursal = parseFloat(data[3]) || 0; // usamos los datos de la columna que nos interesa

                    if (sucursal == suc)
                    {
                        return true;
                    } else if ($('#suc').val() == '') {
                        return true;
                    }
                    return false;
                }
        );

        $.fn.dataTable.ext.search.push(
                function (settings, data, dataIndex) {
//var min = parseInt( $('#min').val(), 10 );
                    var ruta = parseInt($('#ruta').val(), 10);
                    var rutaN = parseFloat(data[5]) || 0; // usamos los datos de la columna que nos interesa

                    if (rutaN == ruta)
                    {
                        return true;
                    } else if ($('#ruta').val() == '') {
                        return true;
                    }
                    return false;
                }
        );

        $.fn.dataTable.ext.search.push(
                function (settings, data, dataIndex) {
//var min = parseInt( $('#min').val(), 10 );
                    var ine = String($('#inegi').val());
                    var inegi = String(data[6]); // usamos los datos de la columna que nos interesa

                    if (inegi == ine)
                    {
                        return true;
                    } else if ($('#inegi').val() == '') {
                        return true;
                    }
                    return false;
                }
        );

        $.fn.dataTable.ext.search.push(
                function (settings, data, dataIndex) {
//var min = parseInt( $('#min').val(), 10 );
                    var max = parseInt($('#diaProg').val(), 10);
                    var age = parseFloat(data[13]) || 0; // usamos los datos de la columna que nos interesa

                    if (age == max)
                    {
                        return true;
                    } else if ($('#diaProg').val() == '') {
                        return true;
                    }
                    return false;
                }
        );





// evento que escucha los dos rangos para filtrar y redibujar 
        $('#diaProg').keyup(function () {
            oTable.draw();
        });


        $(".editable_select1", oTable.fnGetNodes()).editable("php_tps/ajax.php?r=edita&col=5", {
            indicator: '<img src="img/indicator.gif">',
            data: "<?php echo $filtro2; ?>",
            type: "select",
            submit: "Cambiar",
            style: "inherit",
            "tooltip": "Click para editar...",
            "callback": function (sValue, y) {
                var pagina = parseInt($("a.paginate_button.current").text());
                var fetch = sValue.split(",");
                var aPos = oTable.fnGetPosition(this);
                var filtroUp = <?php echo $filtro_array2; ?>;
                //alert (fetch[1]+" - "+ aPos[0]+" - "+ aPos[1]);
                //Actualiza id Sucursal Seleccionado 
                oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);
                // Actualiza nombre Sucursal al que se selecciono
                //oTable.fnUpdate(fetch[2], aPos[0], (aPos[1]+1));
                oTable.fnUpdate(filtroUp[fetch[1]], aPos[0], (aPos[1] + 1));
                // Actualiza estatus para guardar lo pone en uno
                oTable.fnUpdate(1, aPos[0], 1);

                //oTable.fnUpdate(fetch[1], aPos[0], 6);
                /* Actualiza todos los que tengan el ID punto de entrega */
                var tabla = oTable.fnGetData();
                //alert("aaaa"+tabla.length);
                var result = 0;
                for (var i = 0; i < tabla.length; i++) {
                    if (tabla[i][6] == fetch[3]) {
                        oTable.fnUpdate(fetch[1], i, 3);
                        oTable.fnUpdate(filtroUp[fetch[1]], i, 4);
                        oTable.fnUpdate(1, i, 1);
                        result = result + 1;
                    }
                    // result +=fetch[3];

                }
                //alert("--"+result);
                $("#test").html(result);
                $('#messages').puigrowl('show', [{severity: 'info', summary: 'Sucusal asignada a punto de entrega', detail: 'Puntos de Entrega con sucursal ' + result + ' actualizadas'}]);
                oTable.fnPageChange(pagina - 1);
            },
            "submitdata": function (value, settings) {
                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];
                return {
                    "row_id": this.parentNode.getAttribute("id"),
                    "column": oTable.fnGetPosition(this)[2],
                    "columnas": columnas,
                };
            },
            "height": "14px",
        });

        $(".editable_sel", oTable.fnGetNodes()).editable("php_tps/ajax.php?r=edita&col=5", {
            indicator: '<img src="img_tps/indicator.gif">',
            data: "<?php echo $filtro; ?>",
            type: "select",
            submit: "Cambiar",
            style: "inherit",
            "tooltip": "Click para editar...",
            "callback": function (sValue, y) {
                var pagina = parseInt($("a.paginate_button.current").text());
                var fetch = sValue.split(",");
                var aPos = oTable.fnGetPosition(this);
                var filtroUp = <?php echo $filtro_array; ?>;
                //alert (fetch[1]+" - "+ aPos[0]+" - "+ aPos[1]);
                oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);
                //oTable.fnUpdate(fetch[2], aPos[0], (aPos[1]+1));
                oTable.fnUpdate(filtroUp[fetch[1]], aPos[0], (aPos[1] + 1));

                oTable.fnUpdate(1, aPos[0], 1);
                oTable.fnPageChange(pagina - 1);
            },
            "submitdata": function (value, settings) {
                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];
                return {
                    "row_id": this.parentNode.getAttribute("id"),
                    "column": oTable.fnGetPosition(this)[2],
                    "columnas": columnas,
                };
            },
            "height": "14px",
        });

        /*Edicion sin validacion*/
        $(".editable", oTable.fnGetNodes()).editable("php_tps/ajax.php?r=edita", {
            "type": "masked",
            "mask": "99",
            "callback": function (sValue, y) {
                //alert ($( "a.paginate_button.current" ).text() );
                var pagina = parseInt($("a.paginate_button.current").text());
                var fetch = sValue.split(",");
                var aPos = oTable.fnGetPosition(this);
                // alert (fetch[1]+" - "+ aPos[0]+" - "+ aPos[1]);
                oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);
                oTable.fnUpdate(1, aPos[0], 1);
                oTable.fnPageChange(pagina - 1);

            },
            "tooltip": "Click para editar...",
            "submitdata": function (value, settings) {
                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];
                return {
                    "row_id": this.parentNode.getAttribute("id"),
                    "column": oTable.fnGetPosition(this)[2],
                    "columnas": columnas,
                };
            },
            "submit": 'Cambiar',
            "height": "14px"
        });
        /*validando la edicion */
        $(".editable_dia", oTable.fnGetNodes()).editable("php_tps/ajax.php?r=edita", {
            "callback": function (sValue, y) {
                //alert ($( "a.paginate_button.current" ).text() );
                var pagina = parseInt($("a.paginate_button.current").text());
                var fetch = sValue.split(",");
                var aPos = oTable.fnGetPosition(this);
                //	 alert (fetch[1]+" - "+ aPos[0]+" - "+ aPos[1]);
                if (fetch[1] >= 1 && fetch[1] <= 35) {
                    oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);
                    oTable.fnUpdate(fetch[4], aPos[0], 14);
                    oTable.fnUpdate(fetch[5], aPos[0], 15);
                    oTable.fnUpdate(1, aPos[0], 1);
                }
                else {
                    oTable.fnUpdate(fetch[3], aPos[0], aPos[1]);

                    $('#messages').puigrowl('show', [{severity: 'error', summary: 'Error Captura', detail: 'El valor debe ser desde 1 hasta 35.'}]);
                    //alert("error: valor debe estar desde 1 hasta 35"); 

                }
                oTable.fnPageChange(pagina - 1);

            },
            "tooltip": "Click para editar...",
            "submitdata": function (value, settings) {

                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];

                return {
                    "row_id": this.parentNode.getAttribute("id"),
                    "column": oTable.fnGetPosition(this)[2],
                    "columnas": columnas,
                };

            },
            "submit": 'Cambiar',
            "height": "14px"
        });

        /* Validando fechas*/

        $(".editableDate", oTable.fnGetNodes()).editable("php_tps/ajax.php?r=edita", {
            "type": "masked",
            "mask": "99/99/9999",
            "submit": 'OK',
            "tooltip": "Click para editar...",
            "callback": function (sValue, y) {
                //alert ($( "a.paginate_button.current" ).text() );

                var pagina = parseInt($("a.paginate_button.current").text());
                var fetch = sValue.split(",");
                var aPos = oTable.fnGetPosition(this);

                //alert (fetch[1]+" - "+ aPos[0]+" - "+ aPos[1]);
                oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);
                oTable.fnUpdate(1, aPos[0], 1);
                oTable.fnPageChange(pagina - 1);

            },
            "submitdata": function (value, settings) {
                //alert("el valor de la fecha es: "+value)
                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];
                return {
                    "row_id": this.parentNode.getAttribute("id"),
                    "column": oTable.fnGetPosition(this)[2],
                    "columnas": columnas,
                };
            },
            "submit" : 'cambiar',
                    "height": "14px"
        });



        $(".editableDateIni", oTable.fnGetNodes()).editable("php_tps/ajax.php?r=edita", {
            "type": "datepicker",
            "mask": "9999/99/99",
            "tooltip": "Click para editar...",
            "callback": function (sValue, y) {
                //alert ($( "a.paginate_button.current" ).text() );

                var pagina = parseInt($("a.paginate_button.current").text());
                var fetch = sValue.split(",");
                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];

                f1 = columnas[14].replace("/", "");
                f1 = f1.replace("/", "");

                f2 = fetch[1].replace("/", "");
                f2 = f2.replace("/", "");

                //alert (f1 + " vs " +f2);

                //alert (fetch[1]+" - "+ aPos[0]+" - "+ aPos[1]);
                oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);
                if (parseInt(f2) > parseInt(f1)) {
                    oTable.fnUpdate(fetch[1], aPos[0], (aPos[1] + 1));
                }

                oTable.fnUpdate(1, aPos[0], 1);
                oTable.fnPageChange(pagina - 1);

            },
            "submitdata": function (value, settings) {
                //alert("el valor de la fecha es: "+value)
                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];
                return {
                    "row_id": this.parentNode.getAttribute("id"),
                    "column": oTable.fnGetPosition(this)[2],
                    "columnas": columnas,
                };
            },
            "height": "14px"
        });

        $(".editableDateFin", oTable.fnGetNodes()).editable("php_tps/ajax.php?r=edita", {
            "type": "datepicker",
            "mask": "9999/99/99",
            "tooltip": "Click para editar...",
            "callback": function (sValue, y) {
                //alert ($( "a.paginate_button.current" ).text() );

                var pagina = parseInt($("a.paginate_button.current").text());
                var fetch = sValue.split(",");
                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];
                //alert (fetch[1]+" - "+ aPos[0]+" - "+ aPos[1]);
                f1 = columnas[14].replace("/", "");
                f1 = f1.replace("/", "");

                f2 = fetch[1].replace("/", "");
                f2 = f2.replace("/", "");
                if (parseInt(f1) <= parseInt(f2)) {
                    oTable.fnUpdate(fetch[1], aPos[0], aPos[1]);
                    oTable.fnUpdate(1, aPos[0], 1);
                    oTable.fnPageChange(pagina - 1);
                }
                else {

                    $('#messages').puigrowl('show', [{severity: 'error', summary: 'Error Captura', detail: 'la fecha final debe ser mayor o igual a la fecha inicial.'}]);
                    oTable.fnUpdate(fetch[5], aPos[0], aPos[1]);
                    oTable.fnPageChange(pagina - 1);
                }


            },
            "submitdata": function (value, settings) {
                //alert("el valor de la fecha es: "+value)
                var aPos = oTable.fnGetPosition(this);
                var columnas = oTable.fnGetData()[aPos[0]];


                return {
                    "row_id": this.parentNode.getAttribute("id"),
                    "column": oTable.fnGetPosition(this)[2],
                    "columnas": columnas,
                };
            },
            "height": "14px"
        });



        $(document).on("click", ".delete", function () {
            var celeb_id = $(this).attr("id").replace("delete-", "");
            var parent = $("#" + celeb_id);
            alert(" el id tr " + celeb_id);
            $.ajax({
                type: "get",
                url: "php_tps/ajax.php?r=delete_celeb&id=" + celeb_id,
                data: "",
                beforeSend: function () {

                    table.block({
                        message: "",
                        css: {
                            border: "none",
                            backgroundColor: "none"
                        },
                        overlayCSS: {
                            backgroundColor: "#fff",
                            opacity: "0.5",
                            cursor: "wait"
                        }
                    });
                },
                success: function (response) {
                    table.unblock();
                    var get = response.split(",");
                    if (get[0] == "success") {
                        $(parent).fadeOut(200, function () {
                            $(parent).remove();
                        });
                    }
                }
            });

        });
// menu 
        $('#mb1').puimenubar();

        $('#mb2').puimenubar({
            autoDisplay: false
        });


        /* DIALOGS PARA SELECCIONAR FILTROS */

        $('#inline').puilightbox();
        $('#messages').puigrowl({
            sticky: false,
            life: 10000,
        });

        $('#dlg').puidialog({
            location: 'left top',
            showEffect: 'fade',
            hideEffect: 'fade',
            minimizable: true,
            maximizable: true,
            modal: true,
            buttons: [{
                    text: 'Filtrar',
                    icon: 'ui-icon-check',
                    click: function () {
                        $('#dlg').puidialog('hide');
                        opciones = $('.chk:checked').serialize();
                        $("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
                        //$('#inline').puilightbox('hide'); 
                        $.ajax({
                            url: "dataTable.php",
                            type: "post",
                            data: opciones,
                            success: function (data) {
                                $('#contenido').html(data);
                            }
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    icon: 'ui-icon-close',
                    click: function () {
                        $('#dlg').puidialog('hide');
                    }
                }
            ]
        });


        $('#dlg2').puidialog({
            location: 'left top',
            showEffect: 'fade',
            hideEffect: 'fade',
            minimizable: true,
            maximizable: true,
            modal: true,
            width: '400',
            height: '200',
            buttons: [{
                    text: 'Filtrar',
                    icon: 'ui-icon-check',
                    click: function () {
                        $('#dlg2').puidialog('hide');
                        opciones = $('.chk2:checked').serialize();
                        $("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
                        //$('#inline').puilightbox('hide'); 
                        $.ajax({
                            url: "dataTable.php",
                            type: "post",
                            data: opciones,
                            success: function (data) {
                                $('#contenido').html(data);
                            }
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    icon: 'ui-icon-close',
                    click: function () {
                        $('#dlg2').puidialog('hide');
                    }
                }
            ]
        });

        $('#dlg3').puidialog({
            showEffect: 'fade',
            hideEffect: 'fade',
            minimizable: true,
            maximizable: true,
            modal: true,
            width: '200',
            height: '50',
            location: 'left top',
            buttons: [{
                    text: 'Aplicar',
                    icon: 'ui-icon-check',
                    click: function () {
                        $("#aplicaFecha").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> aplicando fecha a la tabla ..</center>");

                        var tamano = oTable.fnSettings().fnRecordsTotal();
                        var iniFecha = $("#datepicker").val();
                        // forma optima de inicializar las fechas

                        $.ajax({
                            url: "dataTable.php",
                            type: "post",
                            data: {iniciaFecha: iniFecha},
                            success: function (data) {
                                $('#contenido').html(data);
                            }
                        });

                        // si inicializamos las fechas recorriendo el arreglo causa un error de ejecucion dentro del navegador

                        /*$('.m').html("1");
                         $('.editableDateIni').html(iniFecha);
                         $('.editableDateFin').html(iniFecha);
                         $('#dlg3').puidialog('hide');
                         oTable.fnDraw();
                         
                         for(var i=0; i<=tamano; i++)
                         {
                         if((i%100)==0){
                         delay(500);
                         oTable.fnUpdate(iniFecha, i, 14);
                         //oTable.fnUpdate(iniFecha, i, 15);
                         }else{
                         oTable.fnUpdate(iniFecha, i, 14);
                         //oTable.fnUpdate(iniFecha, i, 15);
                         }
                         
                         }
                         
                         for(var j=0; j<=tamano; j++)
                         {
                         if((j%100)==0){
                         delay(500);
                         
                         oTable.fnUpdate(iniFecha, j, 15);
                         }else{
                         
                         oTable.fnUpdate(iniFecha, j, 15);
                         }
                         
                         }
                         $('#dlg3').puidialog('hide');*/
                        /*alert(iniFecha);
                         
                         //$('#inline').puilightbox('hide'); */

                        $('#dlg3').puidialog('hide');
                        $("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");

                    }
                },
                {
                    text: 'Cancelar',
                    icon: 'ui-icon-close',
                    click: function () {
                        $('#dlg3').puidialog('hide');
                 },
                }
            ]
        });
        function delay(milisegundos)
        {
            for (i = 0; i <= milisegundos; i++)
            {
                setTimeout('return 0', 1);

            }
        }

        $('#dlg-save').puidialog({
            showEffect: 'fade',
            hideEffect: 'fade',
            minimizable: true,
            location: 'left top',
            maximizable: true,
            modal: true,
            width: '250',
            height: '50',
            buttons: [{
                    text: 'aceptar',
                    icon: 'ui-icon-check',
                    click: function () {
                        $('#dlg-save').puidialog('hide');
                        var table2 = $("#tps");
                        var pe = $("#pe").val();
                        /*Inicializamos la tabla*/
                        //alert($("#pe").val());

                        var oTable2 = table2.dataTable();
                        var tabla = oTable2.fnGetData();
                        //alert (tabla);
                        $("#aplicaFecha").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
                        //$('#inline').puilightbox('hide'); 
                        $.ajax({
                            url: "sioo_salva_tps.php",
                            type: "post",
                            data: {puntosE: pe, opcion: tabla},
                            //dataType: "json",
                            success: function (data) {
                                //$( "#mb2" ).hide( "slow" );
                                $('#aplicaFecha').html(data);
                            }
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    icon: 'ui-icon-close',
                    click: function () {
                        $('#dlg-save').puidialog('hide');
                    }
                }
            ]
        });

        /*$('#btn-cpea').puibutton({  
         icon: 'ui-icon-carat-1-s',  
         click: function() {  
         $('#dlg2').puidialog('show');  
         }  
         });  */
        $('#btn-cvemun').puibutton({
            icon: 'ui-icon-carat-1-s',
        });

        $('#btn-filtrar').puibutton({
            icon: 'ui-icon-grip-dotted-horizontal',
            click: function () {
                oTable.fnPageChange('first');
            }
        });

        $('#btn-acepta').puibutton({
            icon: 'ui-icon-arrow-4-diag',
            click: function () {
                $('#inline').puilightbox('hide');
                $("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
                $.ajax({
                    url: "dataTable.php",
                    type: "post",
                    data: $('.chk:checked').serialize(),
                    success: function (data) {
                        $('#contenido').html(data);
                    }
                });
            }
        }
        );

        $(':checkbox').puicheckbox();
        /*Barra de menu*/
        $("#mb2").show("slow");
        $('#mb2').puimenubar({
            autoDisplay: false
        });
        /* Calendarios*/
        $(function () {
            $(".datepicker").datepicker({
                showButtonPanel: false,
                dateFormat: 'yy/mm/dd',
                showAnim: 'clip'
            });
        });
        /* */
        function actual() {
            $('#inline').puilightbox('hide');
            $("#contenido").html("<center> <img src=\"img_tps/load29.gif\" /> <br/> espere un momento por favor ..</center>");
            $.ajax({
                url: "dataTable.php",
                type: "post",
                data: $('.chk:checked').serialize(),
                success: function (data) {
                    $('#contenido').html(data);
                }
            });
        }


    });

-->
</script>