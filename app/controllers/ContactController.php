<?php  
class ContactController extends Controller {

	public function sendContactMail() 
	{
		$inputs = Input::All();

		Mail::send('emails.welcome', $inputs, function($m)
        {
        	$m->to(['dossantos.adrien18@gmail.com', 'clementpeyrabere@gmail.com', 'decuyperjeremie@gmail.com'])
        	  ->subject('Nouveau message @ [##eLycée##]');
        });

		// si le mail ne s'est pas envoyé
		if(Mail::failures()) {
			return Response::json(Mail::failures());
    		$data = array('success' => false, 'message' => 'Le message n\'a pas pu être envoyé.');
	    }else{
	    	$data = array('success' => true, 'message' => 'Merci! Nous avons bien reçu votre message.');
	    }

		return Response::json($data);
	}
}
