<?php

class AuthController extends \BaseController {

	public function login() 
	{	
		// extract($_POST);

		var_dump($_POST);
		die();

		if(Auth::attempt(['username' => $username, 'password' => $password])
		{

		}
		else 
		{
			
		}

		// return 'end login method';
	}

	public function logout() 
	{
		
	}
}
