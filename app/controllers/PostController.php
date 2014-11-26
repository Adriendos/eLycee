<?php

class PostController extends \BaseController {

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{

		// $request = Route::getCurrentRoute()->getAction();
		// $ctrl    = str_replace('Controller@store', '', $request['controller']);

		// $elem = new $ctrl();

		// return 'testStore';

		// $url = new Url;
		// $url->url = Request::get('url');
		// $url->description = Request::get('description');
		// $url->user_id = Auth::user()->id;

		// // La validation et le filtrage sont indispensables !!!
		// // Vraiment, je suis impardonnable de laisser ça comme ça...

		// $url->save();
		var_dump($_POST);
		die();

		// return Response::json(array(
		//   'error' => false,
		//   'urls' => '$urls->toArray())',
		//   200
		// ));

        // $exp->save();
        // return Redirect::to('admin');
    }
}
