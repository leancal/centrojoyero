<?php

$title = "Contacto";
$content = '
<div class="contact-container">
    <h1 class="contact-title">Contáctenos</h1>
    <p class="contact-intro">Nos puede contactar por los siguientes medios:</p>
    
    <form action="confirmacionrog.php" method="post" name="Contacto" id="Contacto" class="contact-form">
        <div class="form-group">
            <label for="Nombre">Nombre: <sup>*</sup></label>
            <input class="inputText" size="30" name="Nombre" id="Nombre" type="text" />
        </div>
        <div class="form-group">
            <label for="Apellido_P">Apellido Paterno: <sup>*</sup></label>
            <input class="inputText" size="30" name="Apellido_P" id="Apellido_P" type="text" />
        </div>
        <div class="form-group">
            <label for="Apellido_M">Apellido Materno:<sup>*</sup></label>
            <input class="inputText" size="30" name="Apellido_M" id="Apellido_M" type="text" />
        </div>
        <div class="form-group">
            <label for="Edad">Edad: <sup>*</sup></label>
            <input class="inputText" size="30" name="Edad" id="Edad" type="text" />
        </div>
        <div class="form-group">
            <label for="E_Mail">E-Mail: <sup>*</sup></label>
            <input class="inputText" size="30" name="E_Mail" id="E_Mail" type="text" />
        </div>
        <div class="form-group">
            <label for="Telefono">Teléfono: <sup>*</sup></label>
            <input class="inputText" size="30" name="Telefono" id="Telefono" type="text" />
        </div>
        <div class="form-group">
            <label for="Estado">Estado: <sup>*</sup></label>
            <select name="Estado" id="Estado">
                <option value=""></option>
                <option value="Mexico D.F." selected="selected">Mexico D.F.</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                <option value="Colima">Colima</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Distrito Federal">Distrito Federal</option>
                <option value="Durango">Durango</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Estado de México">Estado de México</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
            </select>
        </div>
        <button type="submit" name="enviar" id="enviar" class="submit-button">Enviar</button>
    </form>
    
    <div class="contact-info">
        <p><span class="ContactoDesControl">Informes:</span> 
            <a class="Contenido_BOLD" href="mailto:info@joyeriaoro.com.mx">info@joyeriaoro.com.mx</a>
        </p>
        <p><span class="ContactoDesControl">Tel:</span> 
            <a class="Contenido_BOLD" href="tel:+525568478750">+52 55 68478750</a>
        </p>
    </div>
</div>
';
include 'Template.php';
?>
