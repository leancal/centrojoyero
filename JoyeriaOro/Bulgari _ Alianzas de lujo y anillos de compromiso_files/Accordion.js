function Accordion(el){
  if(!el.get(0))return;
  this.el = el;
  this.titleLink = this.el.find('.accordion-title');
  this.init();
}
Accordion.prototype = {
  init:function(){
    this.titleLink.on('click',this.toggleOpen.bind(this));
  },
  toggleOpen: function(e){
    e.preventDefault();
    this.el.toggleClass('open');
  }
};