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
 
		return Response::json([$ressources]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return json element created
	 */
	public function store()
	{	
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$elem = new $model();
		$inputs = Input::All();

		foreach ($inputs as $inputName => $inputVal) {
			if($inputName == 'image') { continue; }
			$elem->$inputName = $inputVal;
		}
		
		$elem->url_thumbnail = $imgPath;
		$elem->save(); 
		return Response::json($elem);
    }

	 /**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return json element to display
	 */
	public function show($id)
	{	
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$elem = $model::findOrFail($id)->toArray();

		return Response::json([$elem]);
	}

	/**
	 * Update the specified resource from storage
	 * 
	 * @param int $id
	 * @return json element updated
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
	 * @return str delete message
	 */
	public function destroy($id)
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
        $elem = $model::findOrFail($id);
        $elem->delete();

        return Response::json('L\'élément à bien été éffacé');
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
	 * @return array modelNameand vars 
	 */
	protected function getModelNameAndVarsName($methodName) 
	{
		$request   = Route::getCurrentRoute()->getAction();
		$model = str_replace('Controller@' . $methodName, '', $request['controller']);
		return [
			'model' => $model,
			'vars'  => strtolower($model . 's'),
		];
	}

	/**
	 * [HELPER] => 	Process an image if it has been send
	 * 
	 * @param array the inputs received with the request
	 * @return bool imageProcessSatus 
	 */
	protected function processImage($inputs)
	{
		if( ! $inputs['image']) { return; }
		// threat image
		$base64_str = substr($inputs['image'][''], strpos($inputs['image64'], ",")+1);
		// @todo refactor, test extension and make it dynamique ..
		$image = base64_decode($base64_str);
		$imgPath = "/img/".$model."/" . $model."-thumb-".time().".png";
		$path = public_path() . $imgPath;
		Image::make($image)->save($path);
	}
}
