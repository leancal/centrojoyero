<?php
$rutaImgProducto =$_POST ['rutaImgProducto'];
$nombreProducto =$_POST ['nombreProducto'];

$title = "Anillo de Oro 14k Estrellas Amatista Circonia";
$content = '

<body>
<table>
<tr>
<td>
<p><span class="ContactoDesControl">Anillo de Oro 14k Estrellas Amatista Circonia</span> 
            <a >              
            </a>
            
            <td>
            <table>
				<tr>
					<td>
						<img src="'.$rutaImgProducto.'" width="80%";/>
					</td>		
				</tr>				
			</table>
			</tr>

<table>
	<tr>        
		<td>			
<form action="confirmacionrog.php" method="post" name="Contacto" id="Contacto">
</td>
<td>

 <table>
  <tr>        
	<td><span  class="ContactoDesControl">Especificaciones</span><sup></sup>
	</td>
  </tr>
</table>
<br />

<table>
  

  <tr>
    <td >Peso:  <sup></sup> </td>
    <td> <span>2.4 gr aprox</span> </td>
	
  </tr>
  <tr>
    <td>Medidas:<sup></sup></td>
    <td>5 - 9</td>
  </tr>
  <tr>
    <td>Clave: <sup></sup></td>
    <td>FKD1</td>
  </tr>
  
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
						<img src="'.$rutaImgProducto.'" width="80%";/>
					</td>		
				</tr>				
			</table>
		
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
