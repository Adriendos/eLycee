<?php

class PostController extends \BaseController {

	public function getUser($id)
	{
		$post = Post::findOrFail($id)->user;

		return Response::json($post);
	}
}
