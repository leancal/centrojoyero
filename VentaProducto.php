<?php
$rutaImgProducto =$_POST ['rutaImgProducto'];
$nombreProducto =$_POST ['nombreProducto'];

$title = "Venta";
$content = '

<body>

<p><span class="ContactoDesControl"> Datos para la compra del producto:</span> 
            <a >
              
            </a>
            <br />
<table>
	<tr>        
		<td>			
<form action="confirmacionrog.php" method="post" name="Contacto" id="Contacto">


 <table>
  <tr>        
	<td>Nombre: <sup>*</sup>
	</td>
		<td>
			<input class="inputText" size="30" name="Nombre" id="Nombre" style="width: 201px;" value="" type="text" maxlength="50" required />
		</td>
  </tr>
  
  <tr>
    <td > <div style="width: 140;" >
	Apellido Paterno:  <sup>*</sup> </div> </td>
    <td><input class="inputText" size="30" name="Apellido_P" id="Apellido_P" style="width: 201px;" value="" type="text" maxlength="50" required />
	</td>
  </tr>
  <tr>
    <td>Apellido Materno:<sup></sup></td>
    <td><input class="inputText" size="30" name="Apellido_M" id="Apellido_M" style="width: 201px;" value="" type="text" maxlength="50"  /></td>
  </tr>
  <tr>
    <td>Edad: <sup>*</sup></td>
    <td><input class="inputText" size="30" name="Edad" id="Edad" style="width: 201px"value="" type="text" maxlength="10" required /></td>
  </tr>
  <tr>
    <td>E-Mail: <sup>*</sup></td>
    <td><input class="inputText" size="30" name="E_Mail" id="E-Mail" style="width: 201px"value="" type="email" maxlength="50" required /></td>
  </tr>
  <tr>
    <td>Teléfono: <sup></sup></td>
    <td><input class="inputText" size="30" name="Telefono" id="Telefono" style="width: 201px" value="" type="text" maxlength="15"/></td>
  </tr>
  <tr>
							<td>
								 <a>
								 Mensaje:<sup>*</sup>
								 </a>
							</td>
								<td> 
									<textarea  name="txtMensaje" maxlength="400"  placeholder="Ingrese sus dudas." style="width: 201px" required></textarea>
								</td>
	</tr>
	<tr>
  <td class="fieldname">Estado: <sup>*</sup></td>
    <td><select name="Estado" style="width: 207px;">
      <option value=""></option>
      <option value="Mexico D.F." selected="selected">Mexico D.F.</option>
      <option value="Aguascalientes" class="countryApprove">Aguascalientes</option>
      <option value="Baja California" class="countryApprove">Baja California</option>
      <option value="Baja California Sur" class="countryApprove">Baja California Sur</option>
      <option value="Campeche"class="countryApprove">Campeche</option>
      <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
      <option value="Colima" class="countryApprove">Colima</option>
      <option value="Chiapas" class="countryApprove">Chiapas</option>
      <option value="Chihuahua" class="countryApprove">Chihuahua</option>
      <option value="Distrito Federal" class="countryApprove">Distrito Federal</option>
      <option value="Durango" class="countryApprove">Durango</option>
      <option value="Guanajuato" class="countryApprove">Guanajuato</option>
      <option value="Guerrero" class="countryApprove">Guerrero</option>
      <option value="Hidalgo" class="countryApprove">Hidalgo</option>
      <option value="Jalisco" class="countryApprove">Jalisco</option>
      <option value="Estado de México" class="countryApprove">Estado de México</option>
      <option value="Michoacán" class="countryApprove">Michoacán</option>
      <option value="Morelos" class="countryApprove">Morelos</option>
      <option value="Nayarit" class="countryApprove">Nayarit</option>
      <option value="Nuevo León" class="countryApprove">Nuevo León</option>
      <option value="Oaxaca" class="countryApprove">Oaxaca</option>
      <option value="Puebla" class="countryApprove">Puebla</option>
      <option value="Querétaro" class="countryApprove">Querétaro</option>
      <option value="Quintana Roo" class="countryApprove">Quintana Roo</option>
      <option value="San Luis Potosí" class="countryApprove">San Luis Potosí</option>
      <option value="Sinaloa" class="countryApprove">Sinaloa</option>
      <option value="Sonora" class="countryApprove">Sonora</option>
      <option value="Tabasco" class="countryApprove">Tabasco</option>
      <option value="Tamaulipas" class="countryApprove">Tamaulipas</option>
      <option value="Tlaxcala" class="countryApprove">Tlaxcala</option>
      <option value="Veracruz" class="countryApprove">Veracruz</option>
      <option value="Yucatán" class="countryApprove">Yucatán</option>
      <option value="Zacatecas" class="countryApprove">Zacatecas</option>
    </select></td>	
	</tr>
	<tr>
		<td>
		
		</td>
		<td>
		 <input type="hidden" name="rutaImgProducto" value="'.$rutaImgProducto.'"> 
		 <input type="hidden" name="nombreProducto" value="'.$nombreProducto.'"> 
			<input type="submit" name="enviar" id="enviar"  value="Enviar" />
		</td>
	</tr>
</table>
</form>
	</td>
	<td>
		
			<table>
				<tr>
					<td>
						<img src="'.$rutaImgProducto.'" width="40%";/>
					</td>		
				</tr>
				<tr>
					<td >
						
							'.$nombreProducto.'
					
					</td>
				</tr>
			</table>
		
	</td>		
	</tr>
</table>
</body>
</html>
			
        </p>
        <p><span  class="ContactoDesControl">Informes:</span> 
            <a >info@joyeriaoro.com.mx</a>
            <br />


        </p>
        <p><span  class="ContactoDesControl">Tel: </span> 
            <a >
                + 52 55 68478750
            </a>
            <br />
        </p>     
         <br />
          <br />
           <br />

';
include 'Template.php';
?> 
