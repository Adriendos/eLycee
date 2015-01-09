<?php

class Qcm extends \Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'qcms';

	public function questions() 
	{
		return $this->hasMany('Question');
	}
	
	public function users() 
	{
     return $this->belongsTo('User', 'user_id', 'id');
   }
}