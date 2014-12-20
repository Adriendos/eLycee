<?php

class AuthController extends \BaseController {

	public function login() 
	{	
		if( Auth::attempt(Input::only('username','password')) )
		{
			return Response::json([
					'auth'     => Auth::user(),
					'session'  => Session::all()
				]
			);
		}
		else
		{
			return Response::json([
					'error'     => 'Invalid credentials',
				]
			);
			// return false;
		}
	}

	public function logout() 
	{
		Auth::logout();
		return 'logged out';	
	}

	public function getToken()
	{
		return csrf_token();
	}
}
