//webshims.polyfill('forms');

jQuery( document ).ready(function( $ ){

    // to exclude ios 8 safari from exceptions add to if condition:
    //  && !/(iphone|ipod|ipad) os 8_/i.test(navigator.userAgent)
    // Disable some features on mobile
    if( /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera))
    {
        $('.disable-mobile').each(function(){
            var element = $(this);
            var data = element.get(0).attributes;
            var toRemove = "";
            //console.log(data);

            for(var i = 0; i < data.length; i++) {


                if(data[i].nodeName.lastIndexOf("data", 0) === 0) {
                    toRemove += data[i].nodeName + " ";
                }
            }

            element.removeAttr(toRemove);
        });
    }


    var hero_sticky = $('.hero-text-home');
    var wrapper = '<div class="sticky-wrapper"/>';
    var stickyOffset = 50;
    if($('body').hasClass('no-nav')){
        stickyOffset = 0;
    }

    if($('body').hasClass('admin-bar')){
        stickyOffset = 82;
    }
    if(hero_sticky.hasClass('delay')){
        wrapper = '<div class="sticky-absolute"/>';
    }
    if(hero_sticky.length > 0 ) {
        var sticky = new Waypoint.Sticky({
            element: hero_sticky[0],
            offset: stickyOffset,
            wrapper: wrapper
        });
    }

    function trackFullPage(){
        if(typeof gtag === 'function' ) {
            gtag('event', 'page_view', { 'page_path': location.pathname + location.search + location.hash });
        }
    };

    $('a.popup-youtube, .popup-youtube a').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                youtube: {
                    src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
                }
            }
        }
    }).on('mfpOpen', function(e){
        if(typeof mixpanel !== 'undefined' ) {
            var title;
            var link_title = $(this).attr('title');
            var url = $(this).attr('href');
            if(url.indexOf('M_UldvVo89A') !== -1){
                title = "Crypteron Overview";
            }
            else if(url.indexOf('CzoqGXzjG-w') !== -1){
                title = "3-Minute Demo"
            } else if(typeof link_title !== 'undefined' || link_title != ''){
                title = link_title;
            } else {
                title = '[Unknown]'
            }

            mixpanel.track('video.open', {
                'Video URL': url,
                'Video Title': title
            });
        }
    });

    $('.youtube-icon a').append('<button aria-label="Watch Video" style="" tabindex="23" class="ytp-large-play-button ytp-button"><svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" fill="#1f1f1e" fill-opacity="0.9"/><path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#fff"/><path d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" fill="#ccc"/></svg></button>');

    $('.white-popup').on('click', '.close-modal', function(e){
        e.preventDefault();
        $.magnificPopup.close();
    });

    // Fade in jumbotron
    $('.jumbotron-cry, .fadeInFirst, .fadeInStagger').addClass('fadeIn animated');

    // collapse mobile navbar on menu click

    $('.navbar-cry .navbar-collapse a').not('a.dropdown-toggle').on('click', function(){
        if($('.navbar-cry .navbar-toggle').css('display') !='none'){
            $(".navbar-cry .navbar-toggle").trigger( "click" );
        }
    });

    $('.navbar-sub .navbar-collapse a').not('a.dropdown-toggle').on('click', function(){
        if($('.navbar-sub .navbar-toggle').css('display') !='none'){
            $(".navbar-sub .navbar-toggle").trigger( "click" );
        }
    });

    // highlight menu location on sub menu
    $('body').scrollspy({ target: '.navbar-sub', offset: 200 });

    $('.inline-popup').magnificPopup({
        type:'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        closeBtnInside: false
    });

    $('.modal-img').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile mfp-with-zoom',
        cursor: 'mfp-zoom-out-cur',
        image: {
            verticalFit: true
        },
        zoom:{
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function(element) {
                return element.find('img');
            }
        },
        titleSrc: 'title',
        verticalFit: true,
        disableOn: 768,
        gallery: {
            enabled: true,
            preload: [1,3],
            navigateByImgClick: false
        }
    });

    $('.modal-btn a').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile mfp-with-zoom',
        cursor: 'mfp-zoom-out-cur',
        image: {
            verticalFit: true
        },
        zoom:{
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function(element) {
                return element;
            }
        },
        verticalFit: true,
        disableOn: 768
    });

    $('.fadeOnScroll').waypoint(function () {
        $(this.element).addClass('fadeIn animated');
    }, {
        offset: '90%'
    });

    $('.introAnimation').each(function(){
        var element = $(this);
        var animateFcn = element.data('intro-animation');

        element[animateFcn](800, function(){
            $('.fadeOnScrollAfterIntro').waypoint(function () {
                $(this.element).addClass('fadeIn animated');
            }, {
                offset: '90%'
            });
        });
    });

    $('.slideStagger:nth-of-type(even)').waypoint(function(){
        $(this.element).addClass('bounceInLeft animated').removeClass('slideStagger');
    }, {
        offset: '90%'
    });

    $('.slideStagger:nth-of-type(odd)').waypoint(function(){
        $(this.element).addClass('bounceInRight animated').removeClass('slideStagger');
    }, {
        offset: '90%'
    });

    // Helper method to set up modals
    var setup_modal = function(args){
        $.extend({
            id: null,
            strict: false
        }, args);

        var id = args.id;

        if(id === null) return;

        $('a[href="#' + id + '"]').each(function(){
            var link_item = $(this);
            var link_field_name = link_item.data('field-name');
            var link_field_value = link_item.data('field-value');
            var link_field_props = link_item.data('field-props');
            var link_show_selector = link_item.data('show-selector');

            var modal = $('#' + id);
            var form = modal.find('form');

            // Tell skrollr to ignore the anchor links and load magnficic popup
            $(this).attr('data-ignore-skrollr', true).magnificPopup({
                type:'inline',
                midClick: true, // Allow opening popup on middle mouse click.
                modal: args.strict, // Disable standard close operations
                callbacks: {
                    close: function() {     // operations to do when modal is closed
                        form.find('input[type="password"], textarea, input[type="text"], input[type="email"]').val("");   // clear the input fields
                        form.find('input[type="checkbox"]').prop('checked',false); // uncheck terms of service
                        modal.find('.alert-success, .alert-danger').hide();       // clear and hide the alerts
                        form.show().find('input, button').prop('disabled', false);      // re-enable the inputs and buttons
                        form.find('.hide-on-close').hide().find('input').prop('disabled', true);
                        modal.find('.loader-container').hide();                          // hide the loader
                        if(link_field_name && link_field_value){

                            form.find('input[type="hidden"][name="' + link_item.data('field-name') + '"]').prop('disabled',true);
                            form.find('input.disable-if-dynamic').prop('disabled', false);
                            form.find('.hide-if-dynamic').show();
                        } else {
                            form.find('.radio-label').tooltip('destroy');
                        }

                        trackFullPage();

                        if(typeof mixpanel !== 'undefined' ){
                            if(id == 'register'){
                                mixpanel.track('user.registration.modal.close');
                            } else {
                                mixpanel.track(id + '.modal.close');
                            }
                        }
                    },
                    open: function() {
                        // Track modal open as virtual page view in analytics
                        if(typeof gtag === 'function') {
                            gtag('event', 'page_view', { 'page_path': '/' + id + '_modal_open' });
                        }

                        // If mixpanel exists
                        if(typeof mixpanel !== 'undefined' ){
                            // Track the event
                            if(id == 'register'){
                                mixpanel.track('user.registration.modal.open');
                            } else {
                                mixpanel.track(id + '.modal.open');
                            }

                            // fill in distinct ID since this is cleared when modal closes
                            form.find('input[name="DistinctId"]').val(mixpanel.get_distinct_id());
                        }

                        var setupToolTip = true;
                        // fill in any fields in the modal set by the link
                       if(typeof(link_field_name) != 'undefined' && typeof(link_field_value) != 'undefined'){
                           form.find('input[type="hidden"][name="' + link_item.data('field-name') + '"]').val(link_field_value).prop('disabled',false);
                           form.find('input.disable-if-dynamic').prop('disabled', true);
                           form.find('.hide-if-dynamic').hide();
                           setupToolTip = false;
                        }

                        if(typeof(link_field_props) != 'undefined') {
                            var props;
                            if(typeof link_field_props === 'object'){
                                props = link_field_props;
                            } else {
                                link_field_props = link_field_props.replace(/\'/g,'\"');
                                props = $.parseJSON(link_field_props);
                            }

                            for(var i = 0; i < props.length; i++){
                                if(props[i].name && props[i].value) {
                                    form.find('input[name="' + props[i].name + '"]').val(props[i].value).prop('disabled', false);
                                }
                                if(props[i].selector && props[i].text){
                                    modal.find(props[i].selector).text(props[i].text);
                                }								
                            }
                            form.find('input.disable-if-dynamic').prop('disabled', true);
                            form.find('.hide-if-dynamic').hide();
                            setupToolTip = false;
                       }

                        if(typeof(link_show_selector) != 'undefined'){
                            form.find(link_show_selector).show().find('input').prop('disabled', false);
                        }

                       if(setupToolTip) {
                           form.find('.radio-label').tooltip();
                       }
                    }
                }
            });
        });
    };


    // Setup register modal
    setup_modal({id: 'register', strict: true});

    // Registration script
    $("#register-form").submit(function(e){
		e.preventDefault();

		
        var form = $(this);

		var data = form.serialize();
		var campaign = form.find('input[name="Campaign"]');
		var email = form.find('input[name="Email"]').val();

        $('#register-form input:visible, #register-form button').prop('disabled', true);
        $('#register-error').html('').hide();
        $('#register-form .loader-container').show();

        $.ajax({
            type: "POST",
            url: Crypteron_Vars.api_url + "/account/register",
            data: data,
            success: function(data){
                // $('#register-form').hide();
                // $('#register-email').text(email);
                // $('#register-success').fadeIn();
                // $('#register-ok').fadeIn();
                // $('#register-form input, #register-form button').prop('disabled', false);
                $('#register-form .loader-container').hide();
                if(typeof gtag === 'function') {
                    // fire default sign_up event, put label as our main marketing site
                    gtag('event', 'sign_up', { method : 'www.crypteron.com' })
                    // Set the user ID registered user as a persistent value 
                    gtag('config', gtagScriptLoader.GA_TRACKING_ID, { 'user_id': data.UserName }); 
                }
                
				if(campaign.length && campaign.val() == 'webinar' && typeof fbq == 'function'){					
					fbq('track', 'Lead');
				}

                if(typeof mixpanel !== 'undefined' ){
                    mixpanel.identify(data.UserName);
                }

                // All set, redirect to registration location
                window.location.href = data.RedirectAfterRegister;
            },
            error: function(error){
                $('#register-form input:visible, #register-form button').prop('disabled', false);
                $('#register-form .loader-container').hide();

                var msg = "";

                if(!error.hasOwnProperty('responseJSON')){
                    $('#register-error').html('<strong>An unknown error occurred.  Please contact <a href="https://support.crypteron.com" title="Crypteron Support" target="_blank">Support</a>.</strong> Error details: "No error response returned."<br/>').fadeIn();
                    return;
                }

                if(error.responseJSON.hasOwnProperty('ModelState')) {
                    msg += "<strong>Please correct the errors below:</strong><br/>";
                    $.each(error.responseJSON.ModelState, function(index, modelState){
                        $.each(modelState, function(index2, stateMessage){
                            msg += stateMessage + "<br/>";
                        });
                    });
                } else if(error.responseJSON.hasOwnProperty('Message')){
                    msg += "<strong>" + error.responseJSON.Message + "</strong><br/>";
                }
                else {
                    msg += '<strong>An unknown error occurred.  Please contact <a href="https://support.crypteron.com" title="Crypteron Support" target="_blank">Support</a>.</strong> Error details: "No error message provided."<br/>';
                }


                $('#register-error').html(msg).fadeIn();
            }
        });
        e.preventDefault();
    });


    // Setup coming soon modal
    setup_modal({id: 'coming-soon'});

    // Gravity Forms Tweak
    $('.gform_wrapper').find('input[type="text"], input[type="url"], input[type="email"], input[type="tel"], input[type="number"], input[type="password"], select').addClass('form-control input-lg');

    $(".switch-pill, a.toggle-switch").on("click", function () {

        $(".switch-pill").toggleClass("right");
        $(".yearly.toggle-switch").toggleClass("right");
        $(".monthly.toggle-switch").toggleClass("grey");
        $("#pricing-table-container").toggleClass("yearly");
        /*
         $(".plan").each(function () {
         var amount = $(this).find(".amount");
         // var newVal = amount.data('hourly-amount');
         var label = $(this).find(".month");

         $(this).toggleClass("hourly");
         if (parseFloat(amount.text()) === parseFloat(amount.data("hourly-amount"))) {
         amount.text(amount.data("dollar-amount"));
         label.text("mo");
         } else {
         amount.data("dollar-amount", amount.text());
         amount.text(amount.data("hourly-amount"));
         label.text("hr");
         }
         });
         */
    });

    if ( 'undefined' != typeof FLBuilderLayoutConfig ) {
        //FLBuilderLayoutConfig.anchorLinkAnimations.duration = 1000;
        //FLBuilderLayoutConfig.anchorLinkAnimations.easing = 'swing';
        FLBuilderLayoutConfig.anchorLinkAnimations.offset = 75;
    }

    $('a.pdf-img').click(function(e){
        if(typeof mixpanel !== 'undefined' ) {
            mixpanel.track('download.casestudy');
        }
    })

    function loadDemo(){
        if(window.location.hash == '#demo' || window.location.href == "https://www2.crypteron.com/#howitworks") {
            
            var url = 'https://www.youtube.com/watch?v=CzoqGXzjG-w';
            if (typeof mixpanel !== 'undefined') {
                mixpanel.track('video.open', {
                    'Video URL': url,
                    'Video Title': '3-Minute Demo'
                });
            }
            $.magnificPopup.open({
                items: {
                    src: url
                },
                type: 'iframe',
                iframe: {
                    patterns: {
                        youtube: {
                            src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
                        }
                    }
                }
            }, 0);
        }
    }

    // Evaluate demo on page load
    loadDemo();

    // Evaluate demo on hash change
    $(window).on('hashchange', loadDemo);

    // track hash changes in GA
    $(window).on('hashchange', trackFullPage);

    // Copy BeaverBuilder code for initializing smooth scrolling but tie it to GA instead
    $( 'a' ).each(function(){
        var link    = $( this ),
            href    = link.attr( 'href' ),
            loc     = window.location,
            id      = null,
            element = null;

        if ( 'undefined' != typeof href && href.indexOf( '#' ) > -1 ) {

            if ( loc.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && loc.hostname == this.hostname ) {
                try {

                    id      = href.split( '#' ).pop();
                    element = $( '#' + id );
                    if ( element.length > 0 ) {
                        $( link ).on( 'click', function(){
                            if(typeof gtag === 'function' ) {
                                gtag('event', 'page_view', { 'page_path': location.pathname + '#' + id });
                            }
                        });
                    }
                }
                catch( e ) {}
            }
        }
    } );

    function ScrollToOnLoad() {
        if (window.location.hash) {
            var element = $(window.location.hash);

            if (element.length > 0) {
                if (element.hasClass('fl-row') || element.hasClass('fl-col') || element.hasClass('fl-module')) {
                    FLBuilderLayout._scrollToElement(element);
                }
            }
        }
    }

    ScrollToOnLoad();
    $(window).on('hashchange', ScrollToOnLoad);



    if(!$('html').hasClass('fl-builder-edit')) {
        $('#fixed-sidebar-to-nav').appendTo('.fixed-sidebar-nav').fadeIn();
        var dropdown = '<select id="sidebar-dropdown">';
        $('.fixed-sidebar-nav li a').each(function(){
           dropdown +=  '<option value="' + $(this).attr('href') + '">' + $(this).text() + '</option>';
        });
        dropdown += '</select>';
        var dropdownElement = $(dropdown);
        dropdownElement.on('change', function(){
           window.location.hash = $(this).val()
        });
        $('.fixed-sidebar-mobile-dropdown').append(dropdownElement);
    }

    // cache hash clicks and track them as such


});

