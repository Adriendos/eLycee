<?php

class PostController extends \BaseController {

	public function getUser($id)
	{
		$post = Post::findOrFail($id)->user->get();

		return Response::json($post);
	}
}
