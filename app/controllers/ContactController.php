<?php  
class ContactController extends Controller {

	public function sendContactMail() 
	{
		$inputs = Input::All();
		
		// envoi au webmaster
		Mail::send('email', $data, function($m)
		{
		    $m->from($inputs['mail'], $inputs['nom']." ".$inputs['prenom']);

		    $m->to('dossantos.adrien18@gmail.com');

		    $m->subject($inputs['objet']);

		    $m->body($inputs['message']);
		});

		// envoi à la personne ayant rempli le formulaire
		Mail::send('email', $data, function($m)
		{
		    $m->from('dossantos.adrien18@gmail.com');

		    $m->to($inputs['mail']);

		    $m->subject($inputs['objet']);

		    $m->body($inputs['message']);
		});


		// si le mail ne s'est pas envoyé
		/*if(!$sent) {
	        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
	        exit;
	    }else{
	    	$data = array('success' => true, 'message' => 'Thanks! We have received your message.');
	    }*/

		return Response::json($data);
	}
}
