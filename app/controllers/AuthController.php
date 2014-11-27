<?php

class AuthController extends \BaseController {

	public function login() 
	{	
		extract($_POST);

		if (Auth::attempt(['email' => $email, 'password' => $password)])
		{
		    echo 'yes';
		} 
		else 
		{
			echo 'no';
		}
	}

	public function logout() 
	{
		
	}
}
