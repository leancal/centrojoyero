function Article(el){
  if(!el.get(0))return;
  this.el = el;
  this.figure = this.el.find('figure');
  this.randomTop = 0;

  this.init();
}
Article.prototype = {
  init: function(){
    if(this.el.hasClass('shadow')){
      this.productOne = this.el.next('.related-products').find('.product').eq(0);
      this.productTwo = this.el.next('.related-products').find('.product').eq(1);
      this.title = this.el.find('.title');
    }
    if(this.el.find('.title').get(0) && !this.title){
      this.scrollable = this.el.find('.title');
    }
    if(this.el.find('.content').get(0)){
      this.scrollable = this.el.find('.content');
    }
    if(this.el.find('.non-align').get(0)){
      this.push = this.el.find('li').eq(1);
    }
    if(!_obj.touch && !this.title && this.el.index() !== 1 && !this.el.hasClass('header')){
      this.randomTop =  50;
    }
    this.loadImage();
  },
  loadImage: function(){
    var img = new Image();
    if (!img.addEventListener) {
      img.attachEvent('load',this.onImageLoad.bind(this));
    }else {
      img.addEventListener('load',this.onImageLoad.bind(this), false);
    }
    img.src = this.figure.find('img').attr('src');
  },
  onImageLoad: function(){
    this.loaded = true;
    this.resize();
    this.doScroll(0);
  },
  doScroll:function(scrollTop){
    if(!this.el)return;
    if(!this.loaded)return;
    var s = ((this.top)-scrollTop)/(_obj.win_h)+0;

    if(s > 1)s=1;
    if(s < 0)s=0;

    if(this.scrollable){
      this.animeScrollable(s);
    }
    if(this.push){
      this.animePush(s);
    }
    if(this.title){
      this.scrollShowcase(-scrollTop);
    }
    if(this.randomTop)this.scrollEl(s);
  },
  scrollShowcase: function(scrollTop){
    this.title.css({
      '-webkit-transform':'translate3d(0,'+scrollTop/2+'px,0)',
      '-moz-transform':'translate3d(0,'+scrollTop/2+'px,0)',
      '-ms-transform':'translate3d(0,'+scrollTop/2+'px,0)',
      '-o-transform':'translate3d(0,'+scrollTop/2+'px,0)',
      'transform':'translate3d(0,'+scrollTop/2+'px,0)'
    });
    //
    this.productOne.css({
      '-webkit-transform':'translate3d(0,'+scrollTop/3+'px,0)',
      '-moz-transform':'translate3d(0,'+scrollTop/3+'px,0)',
      '-ms-transform':'translate3d(0,'+scrollTop/3+'px,0)',
      '-o-transform':'translate3d(0,'+scrollTop/3+'px,0)',
      'transform':'translate3d(0,'+scrollTop/3+'px,0)'
    });
    //
    this.productTwo.css({
      '-webkit-transform':'translate3d(0,'+scrollTop/4+'px,0)',
      '-moz-transform':'translate3d(0,'+scrollTop/4+'px,0)',
      '-ms-transform':'translate3d(0,'+scrollTop/4+'px,0)',
      '-o-transform':'translate3d(0,'+scrollTop/4+'px,0)',
      'transform':'translate3d(0,'+scrollTop/4+'px,0)'
    });
  },
  scrollEl: function(s){
    this.el.css({'margin-top':32 + this.randomTop*s});
  },
  resetScroll:function(){
    if(!this.el)return;
    if(this.scrollable){
      this.resetScrollable();
    }
    if(this.push){
      this.resetPush();
    }
    if(this.title){
      this.resetSlideshow();
    }
    this.el.css({'margin-top':0});
  },
  animeScrollable: function(s){
    var scroll = s*(this.height);
    this.scrollable.css({
      '-webkit-transform':'translate3d(0,'+scroll+'px,0)',
      '-moz-transform':'translate3d(0,'+scroll+'px,0)',
      '-ms-transform':'translate3d(0,'+scroll+'px,0)',
      '-o-transform':'translate3d(0,'+scroll+'px,0)',
      'transform':'translate3d(0,'+scroll+'px,0)'
    });
  },
  animePush: function(s){
    var scroll = s*(this.height)/2;
    this.push.css({
      'margin-top':scroll
    });
  },
  resetSlideshow: function(){
    this.title.css({
      '-webkit-transform':'translate3d(0,0,0)',
      '-moz-transform':'translate3d(0,0,0)',
      '-ms-transform':'translate3d(0,0,0)',
      '-o-transform':'translate3d(0,0,0)',
      'transform':'translate3d(0,0,0)'
    });
    this.productOne.css({
      '-webkit-transform':'translate3d(0,0,0)',
      '-moz-transform':'translate3d(0,0,0)',
      '-ms-transform':'translate3d(0,0,0)',
      '-o-transform':'translate3d(0,0,0)',
      'transform':'translate3d(0,0,0)'
    });
    this.productTwo.css({
      '-webkit-transform':'translate3d(0,0,0)',
      '-moz-transform':'translate3d(0,0,0)',
      '-ms-transform':'translate3d(0,0,0)',
      '-o-transform':'translate3d(0,0,0)',
      'transform':'translate3d(0,0,0)'
    });
  },
  resetScrollable: function(){
    this.scrollable.css({
      '-webkit-transform':'translate3d(0,0,0)',
      '-moz-transform':'translate3d(0,0,0)',
      '-ms-transform':'translate3d(0,0,0)',
      '-o-transform':'translate3d(0,0,0)',
      'transform':'translate3d(0,0,0)'
    });
  },
  resetPush: function(s){
    var scroll = s*(this.height)/2;
    this.push.css({
      'margin-top':0
    });
  },
  resize: function(){
    if(!this.el)return;
    this.height = 200;
    this.width = this.figure.find('img').width();
    this.top = this.el.offset().top-parseInt(this.el.css('margin-top'),0);
  }
};