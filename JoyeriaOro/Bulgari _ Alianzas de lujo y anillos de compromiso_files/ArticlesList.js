function ArticlesList(el){
  if(!el.get(0))return;
  this.el = el;
  this.articles = this.el.find('article');
  this.article_array = [];
  this.init();
}
ArticlesList.prototype = {
  init: function(){
    var t = this;
    if(_obj.isMobile)return;
    if(_obj.touch)return;
    this.articles.each(function(){
      t.article_array.push(new Article($j(this)));
    });
  },
  doScroll:function(s){
    if(!this.el)return;
    for (var i = 0; i < this.article_array.length; i++) {
      this.article_array[i].doScroll(s);
    }
  },
  resetScroll:function(s){
    if(!this.el)return;
    for (var i = 0; i < this.article_array.length; i++) {
      this.article_array[i].resetScroll(s);
    }
  },
  resize: function(){
    if(!this.el)return;
    for (var i = 0; i < this.article_array.length; i++) {
      this.article_array[i].resize();
    }

  }
};