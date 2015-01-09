<?php  
class ContactController extends Controller {

	public function sendContactMail() 
	{
		$inputs = Input::All();
		var_dump($inputs['mail']);
		
		Mail::send('email', $data, function($m)
		{
		    $m->from($inputs['mail'], $inputs['nom']." ".$inputs['prenom']);

		    $m->to('dossantos.adrien18@gmail.com');

		    $m->subject($inputs['objet']);

		    $m->message($inputs['message']);
		});

		//return Response::json($inputs);
	}
}
