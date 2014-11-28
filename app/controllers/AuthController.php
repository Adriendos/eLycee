<?php

class AuthController extends \BaseController {

	public function login() 
	{	
		if( Auth::attempt(Input::only('username','password')) )
		{
			return Auth::user();
		}
		else
		{
			// return Response::json([
			// 		'error'     => 'Invalid credentials',
			// 	]
			// );
			return false;
		}
	}

	public function logout() 
	{
		Auth::logout();
		return 'logged out';	
	}

	public function token()
	{
		return csrf_token();
	}
}
