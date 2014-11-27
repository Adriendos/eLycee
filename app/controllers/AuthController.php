<?php

class AuthController extends \BaseController {

	public function login() 
	{	
		// extract($_POST);

		if(Auth::attempt(['username' => $username, 'password' => $password])
		{
			var_dump($_POST);
		}
		else 
		{
			echo 'shit';
		}

		echo 'end login method';
	}

	public function logout() 
	{
		
	}
}
