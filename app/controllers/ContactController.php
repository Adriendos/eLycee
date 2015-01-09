<?php  
class ContactController extends Controller {

	public function sendContactMail() 
	{
		$inputs = Input::All();

		// si tu veux mail = $inputs['mail'];

		//return Response::json($inputs);
	}
}
