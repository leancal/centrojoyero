function ProductText(el){
  if(!el.get(0))return;
  this.el = el;
  this.textContent = this.el.find('.text-content');
  this.open = this.el.find('a.open');
  this.close = this.el.find('a.close');
  this.init();
}
ProductText.prototype = {
  init: function(){
    this.open.on('click',this.doOpen.bind(this));
    this.close.on('click',this.doClose.bind(this));
  },
  doOpen: function(e){
    e.preventDefault();
    var top = this.el.offset().top - 40;
    $j('html,body').animate({'scrollTop':top},600,'easeInOutCubic');
    this.textContent.slideDown(600,'easeInOutCubic',this.setTransitionFinished.bind(this));
    setTimeout(this.btnCloseToggleClass.bind(this),400);
  },
  doClose: function(e){
    e.preventDefault();
    $j('html,body').animate({'scrollTop':0},600,'easeInOutCubic');
    this.textContent.slideUp(600,'easeInOutCubic',this.setTransitionFinished.bind(this));
    this.btnCloseToggleClass();
  },
  btnCloseToggleClass: function(){
    this.close.toggleClass('active');
  },
  setTransitionFinished: function(){
    onResize();
  }
};