<?php

class BaseController extends Controller {

	/**
	 * Inputs value
	 * 
	 */
	protected $inputs;

	/**
	 * filter auth token 
	 */
	public function __construct()
    {
    	$this->beforeFilter('auth.token', 
    		['except' => ['index', 'getToken', 'show'] 
    	]);

    	$this->inputs = Input::except('_method', 'users', 'comments', 'qcms');
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$ressources = $model::orderBy('updated_at', 'DESC')->get();

		return Response::json($ressources);
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

		foreach ($this->inputs as $inputName => $inputVal) {
			if($inputName == 'image') { continue; }
			$elem->$inputName = $inputVal;
		}

		$imgPath = $this->processImage($this->inputs, $model);
		if($imgPath) {
			$elem->url_thumbnail = $imgPath;
		}
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

		return Response::json($elem);
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

		foreach ($this->inputs as $inputName => $inputVal) {
			if($inputName == 'image') { continue; }
			$elem->$inputName = $inputVal;
		}
		$imgPath = $this->processImage($this->inputs, $model);
		if($imgPath) {
			$elem->url_thumbnail = $imgPath;
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
		$request = Route::getCurrentRoute()->getAction();
		$model = str_replace('Controller@' . $methodName, '', $request['controller']);
		return [
			'model' => $model,
			'vars'  => strtolower($model . 's'),
		];
	}

	/**
	 * [HELPER] => 	Process an image if it has been send
	 * @todo put it somewhere else
	 * @param array the inputs received with the request
	 * @return str path to image to store in the db
	 */
	protected function processImage($inputs, $modelName)
	{
		if( ! isset($inputs['image'])) { return false; }
		// process image
		$dirtyBase64 = $inputs['image']['base64'];
		$base64Str = substr($dirtyBase64, strpos($dirtyBase64, ',')+1);
		$imageFile = base64_decode($base64Str);

		// test if file folder exists
		$filePath = 'img/resources/' . strtolower($modelName) . 's/';
		$folderName = public_path() .'/'. $filePath;
		if ( !file_exists($folderName)) {
		    mkdir($folderName, 0777);
		}
		// Image extension
		$fileData = $inputs['image']['file'];
		$fileExtension = substr( $fileData['type'], strpos( $fileData['type'], '/')+1);
		$fileExtension = '.' . str_replace('jpeg', 'jpg', $fileExtension);

		$imgName = strtolower($modelName) . '-thumb-' . str_random(8) . $fileExtension;
		Image::make($imageFile)->save($folderName . $imgName);

		return $filePath . $imgName;
	}

}
