<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$request = Route::getCurrentRoute()->getAction();
		$ctrl    = str_replace('Controller@index', '', $request['controller']);

		$return = $ctrl::all();

		$returnName = strtolower($ctrl . 's');
 
		return Response::json(array(
			'error'     => false,
			$returnName => $return,
			200
		));
	}
}
