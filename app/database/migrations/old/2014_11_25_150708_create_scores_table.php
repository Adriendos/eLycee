<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScoresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('scores', function($table) {
			$table->increments('id')->unsigned(); // clef primaire
			$table->enum('status_question',['done','todo'])->default('todo');
			$table->integer('note');
			// ajouter user_id + question_id
			$table->timestamps(); // pour Laravel
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('scores');
	}

}
