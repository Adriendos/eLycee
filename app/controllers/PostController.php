<?php

class PostController extends \BaseController {

	public function getPostsWithLimit($limit)
	{
		$rows = DB::table('rows')->orderBy('id', 'desc')->take(5)->get();
	}
}
