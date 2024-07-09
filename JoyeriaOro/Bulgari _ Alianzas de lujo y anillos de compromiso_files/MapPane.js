function MapPane(el){
  if(!el.get(0))return;
  this.el = el;
  this.direction = this.el.find('.directions-panel');
  this.details = this.el.find('.store-select');
  this.radio = this.el.find('input[name="travelMode"]:radio'); // DT Fix (syntax)
  this.init();
}
MapPane.prototype = {
  init: function (){
    this.el.on('click','.link a',this.setItinary.bind(this));
    this.details.on('click','a.close',this.closePane.bind(this));
    this.direction.on('click','a.close',this.closePane.bind(this));
    this.direction.on('change blur','#currentLocation',this.setItinary.bind(this));  // DT Fix (syntax)
    this.radio.on('change',this.setItinary.bind(this));  // DT Fix (syntax)
//    $j('.stores li').on('click',function(){
//      $j(this).find('a').trigger('click');
//    });
  },
  closePane: function(e){
    e.preventDefault();
    var pane = $j(e.currentTarget).parent();
    pane.removeClass('show');
  },
  setItinary: function(e){
    e.preventDefault();
    this.direction.addClass('show');
    setItinary(this.direction.find('.content').get(0));
  }
};