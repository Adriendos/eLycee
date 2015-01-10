<?php

class ScoreController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$ressources = $model::with('users', 'qcms')->orderBy('created_at', 'DESC')->get();

		return Response::json($ressources);
	}

}
