<?php

class AuthController extends \BaseController {

	public function login() 
	{	
		if(Auth::attempt(Input::only('username','password')))
		{
			var_dump(Auth::user());
			die();
			return Auth::user();
		}
		else
		{
			return Response::json([
					'error'     => 'Invalid credentials',
				]
			);
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
