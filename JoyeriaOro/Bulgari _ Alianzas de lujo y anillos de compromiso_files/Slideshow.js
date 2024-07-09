function Slideshow(el){
  if(!el.get(0))return;
  this.el = el;
  this.currentId = 0;
  this.ul = this.el.children('ul');
  this.lis = this.ul.children('li');
  this.init();
}
Slideshow.prototype = {
  init: function(){
    this.resize();
    this.lis.each(function(i){
      if(i>0){
        $j(this).hide();
      }
    });
    if(this.lis.size()>1){
      this.setDots();
      this.slide(1);
      this.imageCounter = 0;
      this.loadImage();
    }
  },
  loadImage: function(){
    var t = this;
    this.lis.each(function(){
      var img = new Image();
      if (!img.addEventListener) {
        img.attachEvent('load',t.loadFinish.bind(t));
      }else {
        img.addEventListener('load',t.loadFinish.bind(t), false);
      }
      img.src = $j(this).find('article img').attr('src');
    });
  },
  loadFinish: function(){
    this.imageCounter++;
    if(this.imageCounter === this.lis.size())this.resize();
  },
  setDots: function(){
    var html = '<ul class="dots"><a href="#" class="dot">left</a><a href="#" class="dot active">right</a></div>';
    this.el.prepend(html);
    this.dots = this.el.find('.dots').hide();
    this.dots.on('click','a',this.onDotsClicked.bind(this));
    setTimeout(this.showDots.bind(this),2000);
  },
  showDots: function(){
    this.dots.fadeIn();
  },
  onDotsClicked: function(e){
    e.preventDefault();
    if(this.currentId === 1){
      this.slide(0);
    }else{
      this.slide(1);
    }
  },
  slide: function(id){
    if(_obj.isMobile){
      this.slideMobile(id);
    }else{
      this.slideDesktop(id);
    }

    if(this.dots){
      this.dots.find('.active').removeClass('active');
      this.dots.find('a').eq(id).addClass('active');
    }
    this.currentId  =  id;
  },
  slideMobile: function(id){
    var li = this.lis.eq(this.currentId),newLi = this.lis.eq(id);
    li.fadeOut(1000,'easeInOutCubic');
    newLi.fadeIn(1000,'easeInOutCubic');
  },
  slideDesktop: function(id){

    var li = this.lis.eq(this.currentId),newLi = this.lis.eq(id),
    article = li.find('article'),
    products = li.find('.related-products'),
    newArticle = newLi.find('article'),
    newProducts = newLi.find('.related-products');
    //
    article.find('.title').animate({'opacity':0,'margin-top':'50px'},'500','easeInOutCubic');
    products.find('.product').eq(0).animate({'opacity':0,'margin-top':'50px'},'500','easeInOutCubic');
    products.find('.product').eq(1).delay(100).animate({'opacity':0,'margin-top':'50px'},'500','easeInOutCubic');
    //
    li.delay(500).fadeOut(1000,'easeInOutCubic');
    newLi.delay(500).fadeIn(1000,'easeInOutCubic');
    newArticle.find('.title').css({'opacity':0,'margin-top':'50px'}).delay(1000).animate({'opacity':1,'margin-top':'0px'},'1000','easeInOutCubic');
    newProducts.find('.product').eq(0).css({'opacity':0,'margin-top':'50px'}).delay(1000).animate({'opacity':1,'margin-top':'0px'},'500','easeInOutCubic');
    newProducts.find('.product').eq(1).css({'opacity':0,'margin-top':'50px'}).delay(1100).animate({'opacity':1,'margin-top':'0px'},'500','easeInOutCubic');

  },
  doScroll: function(s){
    if(!this.el)return;
  },
  resetScroll: function(s){
    if(!this.el)return;
  },
  resize: function(){
    if(!this.el)return;
    if(this.lis.size()>1){
      var maxHeight = 0;
      this.lis.each(function(){
        maxHeight = Math.max($j(this).height(),maxHeight);
      });
      this.ul.height(maxHeight);
    }
  }
};