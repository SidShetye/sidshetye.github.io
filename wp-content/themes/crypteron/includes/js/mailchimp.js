// $Id$
jQuery( document ).ready(function( $ ){
    var email, title, company, phone, fname, lname, interests;

    // AJAXify mailchimp Form
    $('#mailchimp-form').ajaxForm({
        beforeSubmit: function(arr, form, options){
            // Hide previous errors and messages
            $('#mailchimp-error, #mailchimp-success').text('').hide();

            // Validate email
            email = $('#mailchimp-email').val();
            if(!is_email(email)){
                $('#mailchimp-error').text('Please enter a valid email').fadeIn();
                return false;
            }

            // set other fields
            fname = $('#mailchimp-fname').val();
            lname = $('#mailchimp-lname').val();
            phone = $('#mailchimp-telephone').val();
            title = $('#mailchimp-title').val();
            company = $('#mailchimp-company').val();
            interests = $('#mailchimp-interests').val();

            $('#mailchimp-form input, #mailchimp-form button').prop('disabled', true);
            $('#mailchimp-form .loader-container').show();
        },
        clearForm: false, // clear form after posting
        dataType: 'json',
        error: function(xrh, textStatus, errorThrown){
            $('#mailchimp-error').text('An error has occurred.  Please contact support.  Error details: "' + errorThrown + '"').fadeIn();
            $('#mailchimp-form .loader-container').hide();
            $('#mailchimp-form input, #mailchimp-form button').prop('disabled', false);
        },
        success: function(response ){
            $('#mailchimp-form .loader-container').hide();
            $('#mailchimp-form input, #mailchimp-form button').prop('disabled', false);
            // Reponse was successful.

            // No operation success indicator. Generic error
            if(!response.hasOwnProperty('success')){
                $('#mailchimp-error').html('An error has occurred.  Please contact <a href="https://support.crypteron.com" title="Crypteron Support" target="_blank">Crypteron Support</a>.  Error details: "No success in AJAX response"').fadeIn();
                return;
            }

            // See if operation was successful or not
            var msg;
            if(response.success){
                // Operation was successful!  Display message returned or default
                if(response.hasOwnProperty('message')){
                    msg = response.message;
                }else {
                    msg = "Thank you!  Please check your email to complete the process.";
                }
                $('#mailchimp-form').hide();
                $('#mailchimp-success').html(msg).fadeIn();
                $('#lead-magnet-result').fadeIn();
                gtag('event', 'page_view', { 'page_path': '/email_list_signup' });

                if(mixpanel){
                    mixpanel.track('emailList.signup', {"Interests": interests});
                    mixpanel.people.set_once({
                        '$email': email,
                        '$phone': phone,
                        'Company': company,
                        'Title': title,
                        '$first_name': fname,
                        '$last_name': lname
                    });

                    mixpanel.people.union('Interests', interests.split(','));
                    mixpanel.people.increment('EngagementScore', 200);

                    mixpanel.identify();

                }
            } else {
                // Operation was not successful.  Display error message or default
                if(response.hasOwnProperty('message')){
                    msg = response.message;
                } else {
                    msg = 'An error has occurred.  Please contact <a href="https://support.crypteron.com" title="Crypteron Support" target="_blank">Crypteron Support</a>.  Error details: "No error message returned"';
                }
                $('#mailchimp-error').html(msg).fadeIn();
            }

        }
    });
});

function is_email(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}