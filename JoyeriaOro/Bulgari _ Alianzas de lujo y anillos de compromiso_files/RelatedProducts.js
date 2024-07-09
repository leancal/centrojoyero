function RelatedProducts(el){
  if(!el.get(0))return;
  this.el = el;
  this.menu = this.el.find('a.related-menu');
  this.carrousel = this.el.children('.carrousel');
  this.init();
}
RelatedProducts.prototype = {
  init: function(){
    var t = this;
    this.carrousel.each(function(i){
      if(i>0)$j(this).hide();
    });
    this.menu.on('click',this.doMenuClicked.bind(this));
  },
  doMenuClicked: function(e){
    e.preventDefault();
    if($j(e.currentTarget).hasClass('selected'))return;
    this.menu.removeClass('selected');
    $j(e.currentTarget).addClass('selected');
    var id = $j(e.currentTarget).attr('href');
    this.carrousel.slideUp(600,'easeInOutCubic');
    $j(id).slideDown(600,'easeInOutCubic');
  }
};