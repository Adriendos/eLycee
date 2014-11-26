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

	/**
	 * Show the form for creating a new resource.
	 *
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

		$elem = new $ctrl();

        

        $exp->save();
        return Redirect::to('admin');
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
		
		return Response::json(array(
			'error'     => false,
			$returnName => $elem,
			200
		));;
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return View
	 */
	public function edit($id)
	{
		$request = Route::getCurrentRoute()->getAction();
		$ctrl    = str_replace('Controller@show', '', $request['controller']);

        $elem = $ctrl::findOrFail($id);

        $returnName = strtolower($ctrl);

        return View::make('admin.edit'.$ctrl,[
                'returnName' => $eleme]);
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

}
