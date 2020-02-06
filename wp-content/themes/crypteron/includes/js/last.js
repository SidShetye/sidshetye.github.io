jQuery( document ).ready(function( $ ) {
    var s;
    s = skrollr.init({
        mobileCheck: function(){ return false;},
        forceHeight: false
    });
    setTimeout(function(){skrollr.menu.init(s);},3000)

});