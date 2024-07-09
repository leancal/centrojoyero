function Cookie(el){
  if(!el.get(0))return;
  this.el = el;
  this.closeButton = this.el.find('span');
  this.init();
}
Cookie.prototype = {
  init:function(){
    this.closeButton.on('click',this.remove.bind(this));
    _obj.win.on('scroll', this.remove.bind(this));
    $j('body').on('click', function(){
      $j('.cookie').remove();
    });
  },
  remove:function(){
    this.el.remove();
    this.offScroll();
  },
  offScroll: function () {
    _obj.win.off('scroll', this.remove.bind(this));
  }
};