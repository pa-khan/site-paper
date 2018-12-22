$(document).ready(function($) {

	$('.input_phone .input__wrap').mask('+7 (000) 000-00-00');


	$('.slider__list').slick({
		dots: true,
		appendArrows: $('.slider__arrows'),
		appendDots: $('.slider__dots')
	})

	$('.nav-block a[href = \\#]').click(function(event) {
		event.preventDefault();
		var ul = $(this).next('ul'),
				li = $(this).parent('li');
		ul.slideToggle();
		li.toggleClass('toggle');
	});


	$('#popup-callback .btn').click(function(event) {
		$.fancybox.close();
		
		$.fancybox.open({src  : '#popup-thanks',type : 'inline'});
		
	});


	var hum = $('.hum'),
			nav = $('.nav__list');

	hum.click(function(event) {
		hum.toggleClass('hum_toggle');
		nav.slideToggle(300);
	});

	$(window).on('load resize', function() {
		if ($(window).width() > 767) {
			nav.removeAttr('style');
		}
		
	});
});
