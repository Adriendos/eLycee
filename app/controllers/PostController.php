<?php

class PostController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		extract( $this->getModelNameAndVarsName(__FUNCTION__) );
		$ressources = $model::with('users', 'comments')->orderBy('created_at', 'DESC')->get();

		return Response::json($ressources);
	}

	public function getUser($id)
	{
		$post = Post::findOrFail($id)->user;

		return Response::json($post);
	}
}
