<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::pattern('id','[1-9][0-9]*');

//404 Json response
App::error(function(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
   return Response::json([
			'error'     => true,
			404
		]
	);
});

App::error(function(\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e){
   return Response::json([
			'error'     => true,
			404
		]
	);
});

Route::post('auth/login', 'AuthController@login');

// auth routes
// Route::group(array('prefix' => 'v1', 'before' => 'auth'), function() 
// {
// 	// Route::get('auth/login', 'AuthController@login');
// 	Route::post('auth/login', 'AuthController@login');
// });

// globals routes
Route::group(array('prefix' => 'v1'), function() 
{	
	Route::resource('users', 'UserController');
	Route::resource('posts', 'PostController');
	Route::resource('comments', 'CommentController');
	Route::resource('questions', 'QuestionController');
	Route::resource('choices', 'ChoiceController');
	Route::resource('scores', 'ScoreController');
});



