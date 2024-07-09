function ProductImages(el){
  if(!el.get(0))return;
  this.el = el;
  this.thumbnails = this.el.find('.thumbnails');
  this.visuals = this.el.find('.images');
  this.init();
}
ProductImages.prototype = {
  init: function(){
    this.thumbnails.on('click','a',this.onThumbnailClick.bind(this));
  },
  onThumbnailClick: function(e){
    e.preventDefault();
    var id = $j(e.currentTarget).parent().index();
    this.el.find('.selected').removeClass('selected');
    this.thumbnails.find('a').eq(id).addClass('selected');
    this.visuals.find('li').eq(id).addClass('selected');
  }
};