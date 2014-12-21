<?php

class BaseController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$ressources = $model::all();
 
		return Response::json(array(
			$ressources	
		));
	}

	/**
	 * Show the form for creating a new resource.
	 * 
	 * @return View
	 */
	// public function create()
	// {
		
	// }

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{	
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$elem = new $model();
		$inputs = Input::All();
		foreach ($inputs as $inputName => $inputVal) {
			if($inputName == '_method') { continue; }
			$elem->$inputName = $inputVal;
		}
		$elem->save(); 

		return Response::json($elem);
    }

	 /**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{	
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$elem = $model::findOrFail($id)->toArray();

		return Response::json([$elem]);
	}

	/**
	 * Show the form for editing the specified resource.
	 * [TODO]
	 * @param  int  $id
	 * @return View
	 */
	public function edit($id)
	{

	}

	/**
	 * Update the specified resource from storage
	 * 
	 * @param int $id
	 * @return response
	 */
	public function update($id)
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$elem = $model::findOrFail($id);
		$inputs = Input::All();

		foreach ($inputs as $inputName => $inputVal) {
			if($inputName == '_method') { continue; }
			$elem->$inputName = $inputVal;
		}
		$elem->save();
		return Response::json($elem);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
        $elem = $model::findOrFail($id);
        $elem->delete();

        return Response::json('Element deleted');
	}

	/**
	 * get model results with limit
	 * 
	 * @param int limit 
	 * @return json
	 */
	public function getWithLimit($limit)
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );

		$query = $model::orderBy('created_at', 'DESC')->take($limit)->get();
		return Response::json($query);
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
	 * @return array modelNameand vars 
	 */
	private function getModelNameAndVarsName($methodName) 
	{
		$request   = Route::getCurrentRoute()->getAction();
		$model = str_replace('Controller@' . $methodName, '', $request['controller']);
		return [
			'model' => $model,
			'vars'  => strtolower($model . 's'),
		];
	}

}
