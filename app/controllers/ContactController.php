<?php  

class ContactController extends Controller {

	public function sendContactMail() 
	{
		$inputs = Input::All();
		var_dump($inputs);

		//return Response::json($inputs);
	}
}
