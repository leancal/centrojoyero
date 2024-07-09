function ShoppingBag(call,header){
  if(!call.get(0))return;
  this.call = call;
  this.container = this.call.parents('body');
  this.containerSB = this.call.parents('body').find('.shoppingbagPreview');
  this.navSite = this.call.parents('body').find('.site-nav a');
  this.productSB = null;
  this.header = header;
  this.mobileLink = this.header.find('a.nav-site-mobile');
  this.isNavMobile = false;
  this.isNavFixed = false;
  this.navOffsetTop = 0;
  this.isShoppingBag = false;

  this.init();
}
ShoppingBag.prototype = {
  init:function(){
    if(this.mobileLink.is(':visible')) this.isNavMobile = true;
    this.call.on('click',this.getSB.bind(this));
    this.navSite.on('click', this.voidSB.bind(this));

    this.resize();
  },
  voidSB:function(){
    this.isShoppingBag = false;
    this.call.removeClass('active');
    this.containerSB.find('.wrapSB').hide(); // DT - Bulgari SB Logic
  },
  getSB:function(e){
    var that = this;
    if(!that.isShoppingBag)
    {
        that.isShoppingBag = true; // DT - Bulgari SB Logic START
        that.call.addClass('active');
        that.containerSB.show();
        that.containerSB.find('.wrapSB').show();
        that.containerSB.find('a.close').on('click', that.voidSB.bind(that)); // DT - Bulgari SB Logic END
    } else {
      that.voidSB();
    }
  },
  doScroll: function(){
    if(this.isNavMobile){
      if(this.isNavFixed){
        this.containerSB.removeClass('fixed');
        this.isNavFixed = false;
      }
    }else{
      if(_scroll > this.navOffsetTop){
        if(!this.isNavFixed){
          this.containerSB.addClass('fixed');
          this.isNavFixed = true;
        }
      }
      if(_scroll < this.navOffsetTop){
        if(this.isNavFixed){
          this.containerSB.removeClass('fixed');
          this.isNavFixed = false;
        }
      }
    }
  },
  resize: function(){
    if(!this.header)return;
    var title = this.header.find('.logo');
    this.navOffsetTop = title.offset().top + title.height();
    this.doScroll();
    if(this.mobileLink.is(':visible')){
      this.isNavMobile = true;
    }else{
      this.isNavMobile = false;
    }
  },
  removeItem:function(e){
    e.preventDefault();
    var elToRemove = $j(e.currentTarget).parent();
    elToRemove.remove();
    var getLengthSB = $j('.shoppingbagPreview .productSB').length;
    if(getLengthSB<=2) {
      $j('.shoppingbagPreview .wrapSB > p, .shoppingbagPreview .wrapSB .close, .shoppingbagPreview .wrapSB ul').addClass('right');
    }
    if(getLengthSB<1) {
      this.voidSB();
    }
  }
};