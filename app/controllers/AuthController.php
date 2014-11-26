<?php

class AuthController extends BaseController {

    public function authenticate()
    {
        if (Input::server('REQUEST_METHOD') == "POST") {
            $userdata = [
                'email' => Input::get('email'),
                'password' => Input::get('password')
            ];

            $rules = [
                'email' => 'required|email',
                'password' => 'required'
            ];

            $validator = Validator::make($userdata, $rules);

            if ($validator->fails()) {
                return Redirect::back()->withInput()->withErrors($validator);
            } else {
                Event::fire('user.loginAttempt', $userdata);
                $attempt = Auth::attempt($userdata);
                if($attempt) {
                    if(Auth::user()->type == 'editor') {
                        return Redirect::to('/');
                    }
                    else {
                        return Redirect::to('admin');
                    }
                } else {
                    return Redirect::back()->with('message','Il y a une erreur...Réessayez.');
                }
            }
        }
    }

}