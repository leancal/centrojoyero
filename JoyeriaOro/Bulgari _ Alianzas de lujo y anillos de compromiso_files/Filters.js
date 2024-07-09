function Filters(el){
  if(!el.get(0))return;
  this.el = el;
  this.filters = this.el.find('.filters');
  this.choices = this.el.find('.choices');
  this.advanced = this.el.find('.advanced');
  this.reset = this.el.find('.reset');
  this.bt = this.el.find('.filters-bt');
  this.hidden = this.el.find('.hidden');
  this.init();
}
Filters.prototype = {
  init: function(){
    this.advanced.on('click',this.toggleAdvanced.bind(this));
    this.reset.on('click',this.resetChoice.bind(this));
    this.bt.on('click',this.toggleAdvanced.bind(this));
    this.el.on('click','.result a',this.onAnchorClicked.bind(this));
    if(this.hidden)this.filters.addClass('hidden-'+this.hidden.index());
    if(_obj.isMobile)this.filters.removeClass('open');
  },
  toggleAdvanced:function(e){
    e.preventDefault();
    this.filters.toggleClass('open');
    this.advanced.toggleClass('open');
    //
    if(_obj.isMobile){
      if(this.filters.hasClass('open')){
        $j('body').css({'overflow':'hidden'});
        $j('.container').css({'z-index':'11'});
      }
    }
    if(!this.filters.hasClass('open')){
      $j('body').css({'overflow':'auto'});
      $j('.container').css({'z-index':'1'});
    }
  },
  resetChoice: function(e){
    e.preventDefault();
    this.choices.find('select').each(function(){
      var option = $j(this).children().eq(0);
      option.attr( 'selected', 'selected' );
      $j(this).change();
    });
    this.choices.find('input:checkbox').prop('checked', true);
  },
  onAnchorClicked: function(e){
    e.preventDefault();
    var id = $j(e.currentTarget).attr('href');
    $j('html,body').animate({'scrollTop':$j(id).offset().top-10},1000,'easeInOutCubic');
  }
};