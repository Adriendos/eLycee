<?php

class CommentController extends \BaseController {
	/**
	 * filter auth token 
	 */
	public function __construct()
    {
    	$this->beforeFilter('auth.token', 
    		['except' => ['index', 'getToken', 'show', 'store'] 
    	]);
    }
}
