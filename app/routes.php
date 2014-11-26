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

Route::group(array('prefix' => 'v1', 'before' => 'auth.basic'), function() 
{
    Route::resource('url', 'UrlController');
});

Route::group(array('prefix' => 'v1'), function() 
{
	Route::resource('users', 'UserController');
	Route::resource('posts', 'PostController');
	Route::resource('comments', 'CommentController');
	Route::resource('questions', 'QuestionController');
	Route::resource('choices', 'ChoiceController');
	Route::resource('scores', 'ScoreController');
});






// Route::get('/', function()
// {
// 	return View::make('hello');
// });



