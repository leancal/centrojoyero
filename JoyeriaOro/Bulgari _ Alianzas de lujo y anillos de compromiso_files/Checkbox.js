function Checkbox(el){
  this.el = el;
  this.parentEl = this.el.parent();
  this.labelEl = $j("label[for='"+this.el.attr('id')+"']");
  this.init();
}
Checkbox.prototype = {
  init: function(){
    this.labelEl.on('click',this.onChanged.bind(this));
  },
  onChanged: function(){
    if(this.el.is(':checked')){
      this.labelEl.removeClass('checked');
    }else{
      this.labelEl.addClass('checked');
    }
  //
  }
}