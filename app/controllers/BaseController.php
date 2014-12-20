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
	 [TODO]
	 * @return View
	 */
	public function create()
	{
		// $request = Route::getCurrentRoute()->getAction();
		// $ctrl    = str_replace('Controller@create', '', $request['controller']);
		// return View::make('admin.create'.$ctrl,[]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{	
		// [TODO] check if everything ok after refacto + validate value
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$model = new $model();

		foreach ($_POST as $key => $value) 
		{
			if($key == '_method') { continue; }
			$model->$key = $value;
		}

		$model->save(); 

		return Response::json([
				'insert' => 'true',
				200
			]
		);
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

		// return Response::json([
		// 		$vars => $elem,
		// 	]
		// );

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
		// $request = Route::getCurrentRoute()->getAction();
		// $ctrl    = str_replace('Controller@edit', '', $request['controller']);

  //       $elem = $ctrl::findOrFail($id);

  //       $returnName = strtolower($ctrl);

  //       return Response::json([
		// 		'error'     => false,
		// 		$returnName => $elem,
		// 		200
		// 	]
		// );
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

        // [TODO = > send ok or not]
        // return Redirect::to('admin');
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
