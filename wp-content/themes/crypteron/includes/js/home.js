jQuery( document ).ready(function( $ ){


    $('.main-logo').addClass('fadeInUp animated');

    function set_background_size(){
        var top_section_height = $('.top-section-home').height();

        $('.top-section-home, .navbar-cry').css('background-size',function(){
            return "100% " + top_section_height + "px";
        });
    };

    set_background_size();

    $(window).resize(set_background_size);

});