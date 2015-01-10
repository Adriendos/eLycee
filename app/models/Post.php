<?php


class Post extends Eloquent {

	use Iverberk\Larasearch\Traits\SearchableTrait;

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

	public function comments() 
	{
		return $this->hasMany('Comment');
	}

	public function users() 
	{
    	return $this->belongsTo('User', 'user_id', 'id');
   	}
}
