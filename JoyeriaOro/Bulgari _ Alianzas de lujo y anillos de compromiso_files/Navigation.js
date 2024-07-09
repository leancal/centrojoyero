function Navigation(nav,header,siteNav){
  if(!nav.get(0))return;
  if(!header.get(0))return;
  this.nav = nav;
  this.navLis = this.nav.children('ul').children('li');
  this.header = header;
  this.mobileLink = this.header.find('a.nav-site-mobile');
  this.headerSiteNav = siteNav;
  this.headerLinks = this.headerSiteNav.find('a:not(".hotel,.news,.home,.login-bt")');
  this.isNavOpen_bool = false;
  this.isSiteNavOpen_bool = false;
  this.isNavMobile = false;
  this.isNavFixed = false;
  this.currentSection = '';
  this.navOffsetTop = 0;
  $j('#search-nav').click(function(e) {e.stopPropagation();}); // DT Fix
  this.init();
}
Navigation.prototype = {
  init: function(){

    if(this.mobileLink.is(':visible'))this.isNavMobile = true;
    this.headerLinks.on('click',this.onHeaderClicked.bind(this));
    this.mobileLink.on('click',this.openMobileNav.bind(this));
    this.initNav();

    this.resize();

  },
  doScroll: function(){
    if(this.isNavMobile){
      if(this.isNavFixed){
        this.headerSiteNav.removeClass('fixed');
        this.nav.removeClass('fixed');
        this.isNavFixed = false;
      }

    }else{

      if(_scroll > this.navOffsetTop){
        if(!this.isNavFixed){
          this.headerSiteNav.addClass('fixed');
          this.nav.addClass('fixed');
          this.isNavFixed = true;
        }
      }
      if(_scroll < this.navOffsetTop){
        if(this.isNavFixed){
          this.headerSiteNav.removeClass('fixed');
          this.nav.removeClass('fixed');
          this.isNavFixed = false;
        }
      }
    }

  },
  initNav: function(){
    this.currentSection = '';
    this.headerSiteNav.find('.hover').removeClass('hover');
    //this.header.removeClass('active');
    this.navLis.hide();
  },
  onHeaderClicked: function(e){
    if(!$j(e.target).data('section'))return;
    e.preventDefault();
    var section = $j(e.target).data('section');
    if(section === this.currentSection){
      this.closeNav();
      return;
    }
    this.navLis.hide();
    this.currentSection = section;
    this.showSection();
    if(!this.isNavOpen_bool){
      this.openNav();
    }
  },
  checkMouseDown: function(e){
    if(!$j(e.target).is(this.headerLinks) && !$j(e.target).is('#search-nav')){
      this.closeNav();
    }
  },
  openMobileNav: function(e){
    e.preventDefault();
    if(this.isSiteNavOpen_bool){
      this.headerSiteNav.stop().slideUp(600,'easeInOutCubic');
    }else{
      this.closeNav();
      this.headerSiteNav.slideDown(600,'easeInOutCubic');
    }
    this.isSiteNavOpen_bool = !this.isSiteNavOpen_bool;
  },
  showSection: function(){
    this.headerSiteNav.find('.hover').removeClass('hover');
    this.headerSiteNav.find('a[data-section='+this.currentSection+']').addClass('hover');
    this.nav.find('.'+this.currentSection).stop().show();
  },
  openNav: function(){
    //this.header.addClass('active');
    this.isNavOpen_bool = true;
    this.nav.slideDown(600,'easeInOutCubic');
    _obj.win.on('mousedown',this.checkMouseDown.bind(this));
    if(this.isSiteNavOpen_bool){
      this.headerSiteNav.find('li').each(function(){
        if(!$j(this).find('a.hover').get(0))$j(this).addClass('hide');
      });
    }
  },
  closeNav: function(){
    this.isNavOpen_bool = false;
    this.nav.slideUp(600,'easeInOutCubic',this.initNav.bind(this));
    _obj.win.off('mousedown',this.checkMouseDown.bind(this));

    if(this.isSiteNavOpen_bool){
      this.headerSiteNav.find('li').removeClass('hide');
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
    if(this.isNavMobile && !this.isSiteNavOpen_bool){
      this.headerSiteNav.hide();
    }
    if(!this.isNavMobile){
      this.headerSiteNav.show();
    }
  }
};