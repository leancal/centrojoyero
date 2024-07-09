function Popin(){
  if(this.login)return;
  this.isPopinDisplayed = false;
  this.login = $j('.popin-bt');
  this.init();
}
Popin.prototype = {
  init: function(){
	$j('body').on('click','.popin-bt',this.loadPopin.bind(this));
    //this.login.trigger('click');
  },
  loadPopin:function(e){
    e.preventDefault();
    var t = this;
    $j.ajax({
      url: $j(e.currentTarget).attr('href'),
      dataType: 'html',
      success: function(data){
        $j('body').prepend(data);
        t.setListener();
      }
    });
  },
  setListener: function(){
    this.isPopinDisplayed = true;
    this.popin = $j('.popin');
    this.popin.fadeIn(600,'easeInOutCubic');
    //this.popin.on('input','input[type="email"]',this.onEmailChanged.bind(this)); // DT Fix
    this.popin.on('click','.ok',this.onEmailChanged.bind(this));
    this.popin.on('click','.new-user input[type="submit"]',this.onUserAccept.bind(this));
    this.popin.on('click','.yes',this.onNewUsersubmited.bind(this));
    this.popin.on('click','.no',this.returnToPopin.bind(this)); // RP Fix 
    this.popin.on('click','a.close, .layout',this.closePopin.bind(this));
    if ($j('html').hasClass('lt-ie9')) {
      this.popin.find('input[type="email"], input[type="text"], input[type="password"]').each(function () {
          new Placeholder($j(this));
      });
      this.popin.find('input[type="checkbox"]').each(function () {
          new Checkbox($j(this));
      });
    }
    setSelect();
    this.resize();
  },
  onEmailChanged: function(e){
    //this.popin.off('keyup','input[type="email"]');
    e.preventDefault();
//    this.popin.off('click','.ok');
    if($j('#email_select').val() != '') { // DT - Bulgari Login Logic START
        $j.ajax({
            url: CHECK_EMAIL_URL,
            data: {email: $j('#email_select').val()},
            success: function(data){
                if(data > 0){
                    $j('.popin').find('.new-user').hide();
                    $j('.popin').find('.new-user').removeClass('active-form');
                    $j('.popin').find('.user #email_address_user').attr('value', $j('.popin').find('#email_select').val());
                    $j('.popin').find('.user').slideDown();
                    $j('.popin').find('.user').addClass('active-form');
                } else {
                    $j('.popin').find('.user').hide();
                    $j('.popin').find('.user').removeClass('active-form');
                    $j('.popin').find('.new-user #email_address_new_user').attr('value', $j('.popin').find('#email_select').val());
                    $j('.popin').find('.new-user').slideDown();
                    $j('.popin').find('.new-user').addClass('active-form');
                }
            }
        });
    } else {
        alert('Please insert email');
    }
//    else {
//        //if($j(e.currentTarget).val() === 'a'){
//        if($j('.email').val() === 'a'){
//          this.popin.find('.user').slideDown();
//        } else {
//          this.popin.find('.new-user').slideDown();
//        }
//    }
  },
  onUserAccept: function(e){
    e.preventDefault();
    if($j('.popin').find('input[name="firstname"]').val() == '') { // DT - Bulgari Login Validation START
        if($j('.popin').find('input[name="firstname"]').next('.validation-advice').length == 0) {
            $j('.popin').find('input[name="firstname"]').after('<div class="validation-advice">This is a required field</div>');
        }
    }
    else {
        $j('.popin').find('input[name="firstname"]').next('.validation-advice').remove();
    }
    if($j('.popin').find('input[name="lastname"]').val() == '') {
        if($j('.popin').find('input[name="lastname"]').next('.validation-advice').length == 0) {
            $j('.popin').find('input[name="lastname"]').after('<div class="validation-advice">This is a required field</div>');
        }
    }
    else {
        $j('.popin').find('input[name="lastname"]').next('.validation-advice').remove();
    }
    if($j('.popin').find('input[name="firstname_katakana"]').val() == '') { // RP - Bulgari Login Validation START
        if($j('.popin').find('input[name="firstname_katakana"]').next('.validation-advice').length == 0) {
            $j('.popin').find('input[name="firstname_katakana"]').after('<div class="validation-advice">This is a required field</div>');
        }
    }
    else {
        $j('.popin').find('input[name="firstname_katakana"]').next('.validation-advice').remove();
    }
    if($j('.popin').find('input[name="lastname_katakana"]').val() == '') {
        if($j('.popin').find('input[name="lastname_katakana"]').next('.validation-advice').length == 0) {
            $j('.popin').find('input[name="lastname_katakana"]').after('<div class="validation-advice">This is a required field</div>');
        }
    }
    else {
        $j('.popin').find('input[name="lastname_katakana"]').next('.validation-advice').remove();
    }
    
    if($j('.popin').find('.validation-advice:visible').length == 0) {
        if(!$j('.popin').find('#profile_auth').is(':checked') && !$j('.popin').find('#marketing_auth').is(':checked')) {
            $j('div.auth_flag').hide();
            $j('.popin').find('input[type="submit"]').before('<div class="auth_flag" style="color: #cc0000; font-family: Lato,Arial,sans-serif;font-size: 12px; margin-bottom: 10px;">Please select at least one authorization flag</div>');
            return;
        } else if($j('.popin').find('#profile_auth').is(':checked') && !$j('.popin').find('#marketing_auth').is(':checked')) {
            $j('.step').hide();
            $j('.step2').show();
        } else if($j('.popin').find('#profile_auth').is(':checked') || $j('.popin').find('#marketing_auth').is(':checked')) {
            this.onNewUsersubmited(e);
        }
    } // DT - Bulgari Login Validation END
  },
  onNewUsersubmited: function(e){
    e.preventDefault();
    $j('.popin').find('.active-form form').submit(); // DT - Bulgari Login Logic
    $j('.step').hide();
    $j('.step3').show();
  },
  closePopin: function(e){
    if(!DISABLE_POPIN_CLOSE) { // DT - Disable Popin close Logic
        e.preventDefault();
        var t = this;
        this.popin.fadeOut(600,'easeInOutCubic',function(){
          t.popin.remove();
        });
        this.isPopinDisplayed = true;
    }
  },
  resize:function(){
    if(this.isPopinDisplayed){
      this.popin.find('.layout').css({'width':_obj.width+'px','height':_obj.height+'px'});
    }
    if(_obj.isMobile){
      $j('.popin-container').css('margin-top',_obj.win.scrollTop());
    }
  },
  returnToPopin:function(){
        $j('.step2').hide();
        $j('.step1').show();
  }
};