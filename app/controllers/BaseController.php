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
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$request = Route::getCurrentRoute()->getAction();
		$ctrl    = str_replace('Controller@show', '', $request['controller']);
		
		$elem = $ctrl::find($id);
		
		$returnName = strtolower($ctrl);
		
		return Response::json(array(
			'error'     => false,
			$returnName => $elem,
			200
		));;
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
		$ctrl    = str_replace('Controller@index', '', $request['controller']);

        $elem = $ctrl::find($id);
        $elem->delete();

        return Redirect::to('admin');
	}

}
