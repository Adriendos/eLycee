<?php  
class ContactController extends Controller {

	public function sendContactMail() 
	{
		$inputs = Input::All();
		// envoi au webmaster
		/**
		 * @params 1st -> body class in the mail
		 * 		   2nd -> data to be passed ? 
		 * 		   3rd -> function
		 **/
		Mail::send('email.contact', $data, function($m)
		{
		    $m->from($inputs['mail'], $inputs['nom']." ".$inputs['prenom']);

		    $m->to('dossantos.adrien18@gmail.com');

		    $m->subject($inputs['objet']);

		    $m->body($inputs['message']);
		});

		// envoi à la personne ayant rempli le formulaire
		Mail::send('email.contact', $data, function($m)
		{
		    $m->from('dossantos.adrien18@gmail.com');

		    $m->to($inputs['mail']);

		    $m->subject($inputs['objet']);

		    $m->body($inputs['message']);
		});


		// si le mail ne s'est pas envoyé
		/*if(!$sent) {
	        $data = array('success' => false, 'message' => 'Le message n'a pas pu être envoyé. Erreur: ' . $mail->ErrorInfo);
	        exit;
	    }else{
	    	$data = array('success' => true, 'message' => 'Merci! Nous avons bien reçu votre message.');
	    }*/

		return Response::json($data);
	}
}
