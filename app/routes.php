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
	Route::get('csrfToken', [
		'uses'   => 'BaseController@getToken',
		'as'     => 'auth.csrftoken'
	]);

	Route::get('checkSession', [
		'uses'   => 'Tappleby\AuthToken\AuthTokenController@index',
		'as'     => 'auth.check'
	]);

	Route::post('login', [
		'before' => 'csrf.json', 
		'uses'   => 'Tappleby\AuthToken\AuthTokenController@store',
		'as'     => 'auth.login'
	]);

	Route::delete('logout', [
		'uses'   => 'Tappleby\AuthToken\AuthTokenController@destroy',
		'as'     => 'auth.logout'
	]);
});

Route::group(['prefix' => 'admin', 'before' => 'auth.json'], function() 
{

});

Route::group(
	['prefix' => 'v1', 'after' =>'json.protect'], 
	function() {
		// __ users	
		Route::resource('users', 'UserController', 
			['except' => ['create', 'edit'] 
		]);

		// __ posts
		Route::get('posts/limit/{limit}', 'PostController@getWithLimit');
		Route::get('posts/{id}/user', 'PostController@getUser');

		Route::resource('posts', 'PostController', 
			['except' => ['create', 'edit'] 
		]);

		Route::resource('qcms', 'QcmController',
			['except' => ['create', 'edit']
		]);

		Route::resource('comments', 'CommentController', 
			['except' => ['create', 'edit'] 
		]);

		Route::resource('questions', 'QuestionController', 
			['except' => ['create', 'edit'] 
		]);
		Route::resource('choices', 'ChoiceController', 
			['except' => ['create', 'edit'] 
		]);
		Route::resource('scores', 'ScoreController', 
			['except' => ['create', 'edit'] 
		]);
		Route::resource('qcms.questions', 'QcmQuestionController',
			['except' => ['create', 'edit'] 
		]);
		Route::resource('questions.answers', 'QuestionAnswerController',
			['except' => ['create', 'edit'] 
		]);
		Route::resource('posts.comments', 'PostCommentController',
			['except' => ['create', 'edit'] 
		]);
		Route::get('search/{query}', 'SearchController@search');
	}
);



