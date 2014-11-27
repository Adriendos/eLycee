<?php

class BaseController extends Controller {

	/**
	 * TODO 
	 * facto : 
	 * $request = Route::getCurrentRoute()->getAction();
	 * $ctrl    = str_replace('Controller@index', '', $request['controller']);
	 *
	 * By =>
	   'method' => __FUNCTION__, get method name
	   'rq' => $request,
	   'ctrl-model'=>$ctrl,
	 */	

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
		// $request = Route::getCurrentRoute()->getAction();
		// $ctrl    = str_replace('Controller@index', '', $request['controller']);

		$model = $this->getModelName(__FUNCTION__);
		$return = $model::all();

		$returnName = strtolower($model . 's');
 
		return Response::json(array(
			$returnName => $return,
		));
	}

	/**
	 * Show the form for creating a new resource.
	 * [TODO]
	 * @return View
	 */
	public function create()
	{
		$request = Route::getCurrentRoute()->getAction();
		$ctrl    = str_replace('Controller@create', '', $request['controller']);

		return View::make('admin.create'.$ctrl,[]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$request = Route::getCurrentRoute()->getAction();
		$ctrl    = str_replace('Controller@store', '', $request['controller']);

		$model = new $ctrl();

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
		$request = Route::getCurrentRoute()->getAction();
		$ctrl    = str_replace('Controller@show', '', $request['controller']);
		
		$elem = $ctrl::findOrFail($id);
		
		$returnName = strtolower($ctrl);
		return Response::json([
				$returnName => $elem,
			]
		);
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
		$request = Route::getCurrentRoute()->getAction();
		$ctrl    = str_replace('Controller@destroy', '', $request['controller']);

        $elem = $ctrl::findOrFail($id);
        $elem->delete();

        return Redirect::to('admin');
	}

	/**
	 * get model name
	 * 
	 * @param str methodName
	 * @return str modelName
	 */
	private function getModelName($methodName) 
	{
		$request   = Route::getCurrentRoute()->getAction();
		$modelName = str_replace('Controller@' . $methodName, '', $request['controller']);

		return $modelName;
	}

}
