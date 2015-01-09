<?php  
class ContactController extends Controller {

	public function sendContactMail() 
	{
		$inputs = Input::All();
		var_dump($inputs);

		if (isset($_POST['prenom']) && isset($_POST['nom']) && isset($_POST['email']) && isset($_POST['objet']) && isset($_POST['message'])) {

		    //check if any of the inputs are empty
		    if (empty($_POST['prenom']) || empty($_POST['nom']) || empty($_POST['email']) || empty($_POST['objet']) || empty($_POST['message'])) {
		        $data = array('success' => false, 'message' => 'Le formulaire n\'est pas rempli complètement.');
		        echo json_encode($data);
		        exit;
		    }else{
		    	$data="done";
		    	echo json_encode($data);
		    }

		    //create an instance of SwiftMailer
		   /* $mail = new PHPMailer();

		    $mail->From = $_POST['email'];
		    $mail->FromName = $_POST['nom']." ".$_POST['prenom'];
		    $mail->AddAddress($_POST['email']); 
		    $mail->Subject = $_POST['objet'];
		    $mail->Body = "Name: " . $_POST['name']." ".$_POST['prenom'] . "\r\n\r\nMessage: " . stripslashes($_POST['message']);
			*/
		   
		   /* Mail::send($_POST['objet'], $data, function($message)
			{
			    $message->from($_POST['email'], $_POST['nom']." ".$_POST['prenom']);

			    $message->to('dossantos.adrien18@gmail.com')->cc('bar@example.com','bar@example.com');

			});*/


		    /*if(!$mail->send()) {
		        $data = array('success' => false, 'message' => 'Le message n\'a pu être envoyé. Erreur: ' . $mail->ErrorInfo);
		        echo json_encode($data);
		        exit;
		    }

		    $data = array('success' => true, 'message' => 'Merci! Votre message a été envoyé.');
		    echo json_encode($data);*/

		}

		//return Response::json($inputs);
	}
}
