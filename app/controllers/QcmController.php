<?php

class QcmController extends \BaseController {

	/**
	 * Extend show
	 * 
	 * @return json element
	 */
	public function show($id)
	{	
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );

		$qcm = $model::findOrFail($id);
		$questions = $qcm->questions;

		foreach($questions as $key => $question) {
			$tmpId = $question->id;
			$questions[$key]['answers'] = Question::findOrFail($tmpId)->answers;
		}

		$qcm['questions'] = $questions;

		return Response::json($qcm);
	}

	/**
	 * Extend store only
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
    }

}
