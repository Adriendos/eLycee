<?php

class Qcm extends \Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'qcms';

	/**
	 * Mass assignment fillable fields
	 * 
	 * @var array
	 */
	protected $fillable = ['title', 'description'];

}