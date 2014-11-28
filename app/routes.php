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

// Id param pattern
Route::pattern('id','[1-9][0-9]*');

//404 Json response [TODO] => clear 404
$arrayResp404 = [ 'error' => true, 404 ];
App::error(function(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
   return Response::json( $arrayResp404 );
});
App::error(function(\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e){
   return Response::json( $arrayResp404 );
});


// auth routes
// Route::group(array('prefix' => 'v1', 'before' => 'auth'), function() 
// {
// 	// Route::get('auth/login', 'AuthController@login');
// 	Route::post('auth/login', 'AuthController@login');
// });

// globals routes
Route::group(['prefix' => 'v1/auth'], function() // auth = userConnection
{ 
	Route::post('login', 'AuthController@login');
	//[TODO] logout
});
Route::group(['prefix' => 'admin', 'before' => 'auth']), function() // admin
{

});
Route::group(array('prefix' => 'v1'), function() // rest
{	
	Route::resource('users', 'UserController');
	Route::resource('posts', 'PostController');
	Route::resource('comments', 'CommentController');
	Route::resource('questions', 'QuestionController');
	Route::resource('choices', 'ChoiceController');
	Route::resource('scores', 'ScoreController');
});



