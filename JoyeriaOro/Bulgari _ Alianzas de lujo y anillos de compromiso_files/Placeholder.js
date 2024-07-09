function Placeholder(el) {
  if(!el.get(0))return;
  this.el = el;
  if(this.el.hasClass('placeholder'))return;

  this.placeholder = this.el.attr('placeholder');
  this.init();
}

Placeholder.prototype = {
  init: function () {
    this.el.on('blur focus', $j.proxy(function (event) {
      var value = this.el.val();
      if (event.type === 'blur') {
        this.onBlur(value);
      } else
      if (event.type === 'focus') {
        this.onFocus(value);
      }
    }, this));
    this.el.val(this.placeholder).addClass('placeholder');
  },
  onBlur: function (value) {
    if (value === '') {
      this.el.val(this.placeholder).addClass('placeholder');
    }
  },
  onFocus: function (value) {
    if (value === this.placeholder) {
      this.el.val('').removeClass('placeholder');
    }
  },
  destroy: function() {
    this.el.off('blur focus');
  }
};