<?php  
class ContactController extends Controller {

	public function sendContactMail() 
	{
		$inputs = Input::All();
		extract($inputs); 

		Mail::send('emails.welcome', array('test' => 'test'), function($message)
        {
            $message->to('clementpeyrabere@gmail.com')->subject('Welcome!');
            $m->from($mail, $nom." ".$prenom);
		    $m->to(['dossantos.adrien18@gmail.com', 'clementpeyrabere@gmail.com', 'decuyperjeremie@gmail.com']);
		    $m->subject('zizi');
		    $m->body('coucou');
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
