
jQuery(document).ready(function($){$('.trigger-hover-main a').hover(function(){$('#play-btn-main a').addClass('hover');},function(){$('#play-btn-main a').removeClass('hover');});$('.trigger-hover-bottom a').hover(function(){$('#play-btn-bottom a').addClass('hover');},function(){$('#play-btn-bottom a').removeClass('hover');});$('a[href="#close-alert"]').click(function(e){e.preventDefault();$('#alert-bar').remove();});});