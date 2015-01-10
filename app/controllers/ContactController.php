<?php  
class ContactController extends Controller {

	public function sendContactMail() 
	{
		Mail::send('emails.welcome', $this->inputs, function($m)
        {
        	$m->to(['dossantos.adrien18@gmail.com', 'clementpeyrabere@gmail.com', 'decuyperjeremie@gmail.com'])
        	  ->subject('Nouveau message @ [##eLycée##]');
        });
		// si le mail ne s'est pas envoyé
		if(Mail::failures()) return false;

		return Response::json(['returnMessage' => 'Merci! Nous avons bien reçu votre message.']);
	}
}
