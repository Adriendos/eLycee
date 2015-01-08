<?php

class QcmController extends \BaseController {

	// /**
	//  * filter auth token 
	//  * @todo remove that 
	//  */
	// public function __construct()
 //    {
 //    	$this->beforeFilter('auth.token', 
 //    		['except' => ['index', 'getToken', 'show', 'store'] 
 //    	]);
 //    }

	// extend le store
	/**
	 * Store a newly created resource in storage.
	 *
	 * @return json element created
	 */
	public function store()
	{	
		$inputs = Input::All();

		$tempQuestions = $inputs['questions'];
		unset($inputs['questions']);

		$qcm = new Qcm();

		foreach ($inputs as $inputName => $inputVal) {
			$qcm->$inputName = $inputVal;
		}

		$qcm->save();
		$qcmId = $qcm->id;

		foreach ($tempQuestions as $key => $tempQuestion) {
			$question = new Question();
			$tempAnswers = $tempQuestion['answers'];
			unset($tempQuestion['answers']);
			$tempQuestion['qcm_id'] = $qcmId;

			foreach ($tempQuestion as $inputName => $inputVal) {
				$question->$inputName = $inputVal;
			}
			$question->save();
			$questionId = $question->id;

			foreach ($tempAnswers as $key => $tempAnswer) {
				$answer = new Answer();
				$tempAnswer['question_id'] = $questionId;
				foreach ($tempAnswer as $inputName => $inputVal) {
					$answer->$inputName = $inputVal;
				}
				$answer->save();
			}
		}

		return Response::json($qcm);

		// extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		// $elem = new $model();

		// foreach ($inputs as $inputName => $inputVal) {
		// 	if($inputName == 'image' || $inputName == 'auth_token') { continue; }
		// 	$elem->$inputName = $inputVal;
		// }

		// $imgPath = $this->processImage($inputs, $model);
		// if($imgPath) {
		// 	$elem->url_thumbnail = $imgPath;
		// }
		// $elem->save();
		 
		// return Response::json($elem);
    }

}
