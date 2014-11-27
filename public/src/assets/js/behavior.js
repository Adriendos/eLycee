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
<<<<<<< HEAD
}); 
=======
});

>>>>>>> 9e8dc765e946f6268a4ecc39e6111d621e4b3ac6
