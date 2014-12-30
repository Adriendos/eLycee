<?php


class Score extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'scores';

	protected $fillable = ['score', 'user_id', 'qcm_id'];
}
