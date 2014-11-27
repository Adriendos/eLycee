//Shrinking nav :)
$(window).on("scroll", function () {
	if($(document).scrollTop() > 30) {
		$('#navbar').addClass('sticked');
	} else {
		$('#navbar').removeClass('sticked');
	}
$(function() {
	//Shrinking nav :)
	$(window).on("scroll", function () {
		if($(document).scrollTop() > 30) {
			$('#navbar').addClass('sticked');
		} else {
			$('#navbar').removeClass('sticked');
		}
	});
});

// sidebar admin : 
$('.left.vertical.sidebar').first().sidebar('attach events', '.launch.button', 'show');

