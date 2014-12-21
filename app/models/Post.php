<?php


class Post extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'posts';

	/**
	 * Mass assignment fillable fields
	 * 
	 * @var array
	 */
	protected $fillable = [ 'title', 'excerpt', 'content', 'url_thumbnail', 
							'status', 'user_id', 'created_at', 'updated_at' ];
  
}
