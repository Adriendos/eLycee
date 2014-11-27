//PUT HERE BEHAVIOR OF THE APP (ex: js handler on lcick etc...)
$('#connexion').on('click', function() {
	$('#connexionPopUp')
	.modal('show')
	;
});

//Shrinking nav :)
$(window).on("scroll", function () {
	if($(document).scrollTop() > 30) {
		$('#navbar').addClass('sticked');
	} else {
		$('#navbar').removeClass('sticked');
	}
}); 

