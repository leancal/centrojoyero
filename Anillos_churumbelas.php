<?php
$title = "Anillos churumbelas";
$content = '<h3 style="text-align: center;" > Anillos churumbelas</h3>
               <div id="grid-gallery" class="grid-gallery">
                <section class="grid-wrap">
                    <ul class="grid">
                        <li class="grid-sizer"></li><!-- for Masonry column width -->
                       
                        <li>
                            <figure>
                                  <figcaption><h3>Corazón </h3></figcaption> 
                                <img src="ImgFourteenKarat/Anillos/Anillos_Compromiso/Corazon_14k_172gr.jpg" alt="img01"/>
                            </figure>
                        </li>
                         <li>
                            <figure>
                                  <figcaption><h3>Piedra Negra y Blanca </h3></figcaption> 
                                <img src="ImgFourteenKarat/Anillos/Anillos_Compromiso/Piedra_Negra_Blanca_14k_2_0gr.jpg" alt="img02"/>
                            </figure>
                        </li>                      
                    </ul>
                </section><!-- // grid-wrap -->
                <section class="slideshow">
                    <ul>
                       
                         <li>
                            <figure>
                                  <figcaption><h3>Corazón </h3></figcaption> 
                                <img src="ImgFourteenKarat/Anillos/Anillos_Compromiso/Corazon_14k_172gr.jpg" alt="img01"/>
                            </figure>
                        </li>
                         <li>
                            <figure>
                                  <figcaption><h3>Piedra Negra y Blanca </h3></figcaption> 
                                <img src="ImgFourteenKarat/Anillos/Anillos_Compromiso/Piedra_Negra_Blanca_14k_2_0gr.jpg" alt="img02"/>
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
'
;
include 'Template.php';
?>