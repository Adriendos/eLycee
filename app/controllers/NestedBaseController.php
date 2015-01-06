<?php

class NestedBaseController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($id)
	{

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return json element created
	 */
	public function store()
	{	
    }

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return json element to display
	 */
	public function show($firstResourceId, $secondResourceId)
	{

	}

	/**
	 * Update the specified resource from storage
	 * 
	 * @param int $id
	 * @return json element updated
	 */
	public function update($id)
	{

	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return str delete message
	 */
	public function destroy($id)
	{

	}

	/**
	 * get model results with limit
	 * 
	 * @param int limit 
	 * @return json list of results filter by limit
	 */
	public function getWithLimit($limit)
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$results = $model::orderBy('created_at', 'DESC')->take($limit)->get();

		return Response::json($results);
	}
	/**
	 * Get csrf token
	 * 
	 * @return str 
	 */
	public function getToken()
	{
		return csrf_token();
	}

	/**
	 * [HELPER] => get model name and vars return name
	 * 
	 * @param str methodName
	 * @return array modelName and vars 
	 */
	protected function getModelNameAndVarsName($methodName) 
	{
		$request = Route::getCurrentRoute()->getAction();
		$model = str_replace('Controller@' . $methodName, '', $request['controller']);
		return [
			'model' => $model,
			'vars'  => strtolower($model . 's'),
		];
	}
}