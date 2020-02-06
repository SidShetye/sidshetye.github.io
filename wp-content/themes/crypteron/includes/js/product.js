
jQuery( document ).ready(function( $ ){

    // zoom in fbi quote
    $('#fbi-quote').waypoint(function () {
        $(this.element).addClass('zoomIn animated').removeClass('invisible');
        this.destroy();
    }, {
        offset: 'bottom-in-view'
    });


    // stagger animate features
    $('.feature').waypoint(function () {
            $(this.element).addClass('fadeIn animated');
            this.destroy();
        },{
                    offset: '90%'
        });
		

    var sticky = new Waypoint.Sticky({
        element: $('#how-it-works-sidebar')[0],
        offset: 200
    });

    var sticky2 = new Waypoint.Sticky({
        element: $('.navbar-sub')[0],
        offset: 50
    });

    /*
    $('#cloud-image').waypoint({
        handler: function(){
            $(this.element).addClass('fadeInUp animated');
            this.disable();
        },
        offset: '70%'
    });
*/
    $('#safe-image').waypoint({
        handler: function(){
            $(this.element).addClass('bounceInDown animated').removeClass('invisible');
            this.destroy();
        },
        offset: '70%'
    });



    // Unstick how it works
    var calc_bottom = function(){
        return -1*($('#how-it-works').height() - $('#how-it-works-sidebar').height() - 200);
    };

    $('#how-it-works').waypoint(function(direction){
        if(direction === 'down'){
            $('#how-it-works-sidebar').css({
               position: 'absolute',
                top: -1*calc_bottom()
            });
        }else if(direction === 'up'){
            $('#how-it-works-sidebar').css({
                position: '',
                top: ''
            })
        }
    },{
            offset: calc_bottom
        }
    );

    // highlight active sidebar menu item
    $('#how-it-works .section').each(function () {
        var element  = $(this);
        element.waypoint(function () {
            $('#how-it-works-sidebar li.active').removeClass('active');
            $('#how-it-works-sidebar li a[href="#' + element.attr('id') + '"]').parent('li').addClass('active');
        }, {
            offset: -1*element.data('menu-offset')
        });
    });

    // toggle code samples when clicked
  
    var toggleCode = function (button) {
        var new_text = button.data('hide-text');
        var old_text = button.text();

        button.text(new_text);
        button.data('hide-text', old_text);

        var hide_class = button.data("hide-class");
        var show_class = button.data("show-class");

        button.addClass(hide_class)
        button.removeClass(show_class);
        button.data("hide-class", show_class);
        button.data("show-class", hide_class);

        var hide = button.data('hide');
        var show = button.data('show');

        $(hide).hide();
        $(show).show();

        button.data('hide', show);
        button.data('show', hide);
    }
    $('.toggle-code').click(function () {        
        toggleCode($(this));
    });

    // animate how it works section
    $('#how-it-works').waypoint(function () { 
        $('#how-it-works .left').addClass('animated bounceInLeft').removeClass('invisible');

    },{
        offset: '80%',
        triggerOnce: true
    });


    $('#how-it-works .left').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass('animated bounceInLeft');
    });

});