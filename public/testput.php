<!DOCTYPE html>
<html lang="fr" ng-app="eLyceeAdmin">
<head>
	<meta charset="UTF-8">
	<title>eLycee - </title>
	<meta name="description" content="">
	<meta name="mobile-web-app-capable" content="yes">
	<!-- <link rel="stylesheet" href="../bower_components/semantic-ui/dist/semantic.min.css"> -->
	<link rel="stylesheet" href="../dist/assets/css/app.min.css">	
</head>
</head>
<body>
	<!-- BODY -->
	<div class="ui page grid">

    	<form action="api/v1/posts" method="post" id="form">
    		<input type="text" value="test" name="title">
    		<input type="text" value="test" name="excerpt">
    		<input type="text" value="test" name="content">
    		<input type="text" value="test" name="url_thumbnail">
    		<!-- <input type="text" value="test" name="status"> -->
    		<!-- <input type="text" value="1"    name="user_id"> -->
    		<!-- <input type="hidden" name="_method" value="POST"> -->
    		<input type="submit">
    	</form>

	</div>
	
	<!-- SCRIPTS -->
	<!-- PUT NOT MINIFIED SCRIPT WHILE DEVELOPPEMENT FOR DEBUGGING PURPOSE -->
	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script>
		// $(function() {

		// 	// $.ajax({ 
		// 	// 	url: 'api/v1/posts', 
		// 	// 	dataType: 'json', 
		// 	// 	type: 'post', 
		// 	// 	contentType: 'application/json', 
		// 	// 	data: JSON.stringify( { 
		// 	// 		'title': $('[name="title"]').val(),
		// 	// 		'excerpt': $('[name="excerpt"]').val(),
		// 	// 		'content': $('[name="content"]').val(),
		// 	// 		'url_thumbnail': $('[name="url_thumbnail"]').val(),
		// 	// 		'status': $('[name="status"]').val(),
		// 	// 		'user_id': $('[name="user_id"]').val(), 
		// 	// 		'_method': $('[name="_method"]').val() 
		// 	// 	} ), 
		// 	// 	processData: false,
		// 	// 	success: function( data, textStatus, jQxhr ){
		// 	// 		console.log(data); 
		// 	// 	}, 
		// 	// 	error: function( jqXhr, textStatus, errorThrown ){ 
		// 	// 		console.log( errorThrown ); 
		// 	// 	} 
		// 	// });

		// 	var fakePutParams = { 
		// 		'title': $('[name="title"]').val(),
		// 		'excerpt': $('[name="excerpt"]').val(),
		// 		'content': $('[name="content"]').val(),
		// 		'url_thumbnail': $('[name="url_thumbnail"]').val(),
		// 		'status': $('[name="status"]').val(),
		// 		// 'user_id': $('[name="user_id"]').val(), 
		// 		// '_method': $('[name="_method"]').val() 
		// 	};

		// 	$.post( "api/v1/posts", fakePutParams)
		// 		.done(function( data ) {
		// 	    	console.log( "Data Loaded: " + JSON.stringify(data) );
		// 	  	});	
		  	
		// 	// $.get( "api/v1/posts", fakePutParams)
		// 	// .done(function( data ) {
		//  //    	console.log( "Data Loaded: " + data );
		//  //  	});
		// });
	</script>
</body>
</html>