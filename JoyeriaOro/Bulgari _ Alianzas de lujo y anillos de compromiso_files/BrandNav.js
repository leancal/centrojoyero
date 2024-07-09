function BrandNav(el){
  if(!el.get(0))return;
  this.el = el;
  this.firstUl = this.el.children('ul');
  this.firstLis = this.firstUl.children('li');
  this.init();
}
BrandNav.prototype = {
  init: function(){
    this.setBrandNav();
  },
  setBrandNav: function(){
    if(this.el.find('.menu').get(0))return;
    var html = '<p class="menu">';
    this.el.find('.selected').each(function(index){
      if(index === 0){
        html += $j(this).children('a').text();
      }else{
        html += '<span>'+$j(this).children('a').text()+'</span>';
      }
    });
    this.el.prepend(html);
    this.el.on('click','.page-title,.menu',this.toggleOpen.bind(this));
    this.firstLis.children('a').on('click',this.toggleActive.bind(this));
  },
  killBrandNav: function(){
    if(!this.el.find('.menu').get(0))return;
    this.el.off('click','.page-title,.menu',this.toggleOpen.bind(this));
    this.firstLis.children('a').off('click',this.toggleActive.bind(this));
  },
  toggleOpen: function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    this.el.toggleClass('open');
    if(this.isNarrow()){
      if(this.el.hasClass('open')){
        $j('body').css({'overflow':'hidden'});
        $j('.container').css({'z-index':'11'});
      }
    }
    if(!this.el.hasClass('open')){
      $j('body').css({'overflow':'auto'});
      $j('.container').css({'z-index':'1'});
    }
  },
  toggleActive:function(e){
    var parentLi = $j(e.currentTarget).parent();
    if(parentLi.find('li').get(0)){
      e.preventDefault();
      if(parentLi.hasClass('active')){
        parentLi.removeClass('active');
      }else{
        this.el.find('.active').removeClass('active');
        parentLi.addClass('active');
      }
    }
  },
  isNarrow:function(){
    var narrow_bool = false;
    if(_obj.win_w<1024)narrow_bool =  true;
    return narrow_bool;
  },
  resize: function(){
    if(!this.el)return;
    if(this.isNarrow){
      this.setBrandNav();
      if($j('.container').height()<_obj.win_h-100){
        this.el.addClass('static');
        $j('.container').css({'padding-bottom':'30px'});
      } else{
        this.el.removeClass('static');
        $j('.container').css({'padding-bottom':'0px'});
      }
    }else{
      this.killBrandNav();
    }
  }
};