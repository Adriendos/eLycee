<?php


class Score extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'scores';

	protected $fillable = ['score', 'user_id', 'qcm_id'];

	public function users() 
	{
    	return $this->belongsTo('User', 'user_id', 'id');
   	}

   	public function qcms() 
	{
    	return $this->belongsTo('Qcm', 'qcm_id', 'id');
   	}
}
