<?php

class AuthController extends \BaseController {

	public function login() 
	{	
		// extract($_POST);
		// var_dump($_POST);

		if(Auth::attempt(Input::only('username','password'))){
			return Auth::user();
		}else{
			return 'invalid username/pass combo';
		}

		// if(Auth::attempt(['username' => $username, 'password' => $password])
		// {
		// 	var_dump($_POST);
		// }
		// else 
		// {
		// 	echo 'shit';
		// }

		// echo 'end login method';
	}

	public function logout() 
	{
		
	}
}
