<?php
$title = "Medallas Oro";
$content = '
<h3 style="text-align: center;" > Medallas Oro </h3>
               <div id="grid-gallery" class="grid-gallery">
                <section class="grid-wrap">
                    <ul class="grid">
                        <li class="grid-sizer"></li><!-- for Masonry column width -->
                       
                        <li>
                            <figure>
								<form action="VentaProducto.php" method="post">
									<figcaption><h3>Medalla Oro </h3></figcaption> 
									<img src="ImgFourteenKarat/Medallas/Medalla_Oro_14k_0_98gr.jpg" alt="img01"/>
									<input type="hidden" name="rutaImgProducto" value="ImgFourteenKarat/Medallas/Medalla_Oro_14k_0_98gr.jpg"> 
									<input type="hidden" name="nombreProducto" value="Medalla Oro"> 
									<figcaption><h3>$---  <input type="submit" value="Comprar" id="rutaImagen" class="btnbotonComprar"> </h3>   
									</figcaption> 
								</form>	
                            </figure>
                        </li>
                        <li>
                            <figure>
								<form action="VentaProducto.php" method="post">
									<figcaption><h3> San Judas </h3></figcaption> 
									<img src="ImgFourteenKarat/Medallas/Medalla_Oro_14k_San Judas_2_83gr.jpg" alt="img02"/>
									<input type="hidden" name="rutaImgProducto" value="ImgFourteenKarat/Medallas/Medalla_Oro_14k_San Judas_2_83gr.jpg"> 
									<input type="hidden" name="nombreProducto" value="San Judas"> 
									<figcaption><h3> $---  <input type="submit" value="Comprar" id="rutaImagen" class="btnbotonComprar"> </h3>   
									</figcaption> 
								</form>	
                            </figure>
                        </li>					
					
						
                    </ul>
                </section><!-- // grid-wrap -->
                <section class="slideshow">
                    <ul>
                       
                         <li>
                            <figure>
								<form action="VentaProducto.php" method="post">
									<figcaption><h3>Medalla Oro </h3></figcaption> 
									<img src="ImgFourteenKarat/Medallas/Medalla_Oro_14k_0_98gr.jpg" alt="img01"/>
									<input type="hidden" name="rutaImgProducto" value="ImgFourteenKarat/Medallas/Medalla_Oro_14k_0_98gr.jpg"> 
									<input type="hidden" name="nombreProducto" value="Medalla Oro"> 
									<figcaption><h3> $---  <input type="submit" value="Comprar" id="rutaImagen" class="btnbotonComprar"> </h3>   
									</figcaption> 
								</form>
                            </figure>
                        </li>
                        <li>
                            <figure>
								<form action="VentaProducto.php" method="post">
									<figcaption><h3> San Judas </h3></figcaption> 
									<img src="ImgFourteenKarat/Medallas/Medalla_Oro_14k_San Judas_2_83gr.jpg" alt="img02"/>
									 <input type="hidden" name="rutaImgProducto" value="ImgFourteenKarat/Medallas/Medalla_Oro_14k_San Judas_2_83gr.jpg"> 
									 <input type="hidden" name="nombreProducto" value="San Judas"> 
									<figcaption><h3> $---  <input type="submit" value="Comprar" id="rutaImagen" class="btnbotonComprar"> </h3>   
									</figcaption> 
								</form>
                            </figure>
                        </li>                                                         
                      
                    </ul>
                    <nav>
                        <span class="icon nav-prev"></span>
                        <span class="icon nav-next"></span>
                        <span class="icon nav-close"></span>
                    </nav>
                    <div class="info-keys icon">Navigate with arrow keys</div>
                </section><!-- // slideshow -->
            </div><!-- // grid-gallery -->
                <script src="jsGrid/imagesloaded.pkgd.min.js"></script>
        <script src="jsGrid/masonry.pkgd.min.js"></script>
        <script src="jsGrid/classie.js"></script>
        <script src="jsGrid/cbpGridGallery.js"></script>
        <script>
            new CBPGridGallery(document.getElementById("grid-gallery"));
        </script>

';
include 'Template.php';
?>