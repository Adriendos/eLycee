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

App::error(function(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
   return Response::json( [ 'error'=>'404', 404 ] );
});
App::error(function(\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e){
   return Response::json( [ 'error'=>'404', 404 ] );
});

// globals routes
Route::group(['prefix' => 'v1/auth'], function() 
{ 
	Route::post('login', ['before' => 'csrf.json', 'uses' => 'AuthController@login']);
	Route::get('csrfToken', 'AuthController@getToken');
	Route::get('logout', 'AuthController@logout');

	Route::get('token', 'Tappleby\AuthToken\AuthTokenController@index');

	Route::post('token', [
		'before' => 'csrf.json', 
		'uses' => 'Tappleby\AuthToken\AuthTokenController@store'
	]);

	Route::delete('token', 'Tappleby\AuthToken\AuthTokenController@destroy');
});
Route::group(['prefix' => 'admin', 'before' => 'auth.json'], function() 
{

});

Route::group(
	['prefix' => 'v1', 'after' =>'json.protect'], 
	function() {	
		Route::resource('users', 'UserController');
		Route::resource('posts', 'PostController');
		Route::resource('comments', 'CommentController');
		Route::resource('questions', 'QuestionController');
		Route::resource('choices', 'ChoiceController');
		Route::resource('scores', 'ScoreController');
	});



