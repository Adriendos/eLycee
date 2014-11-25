<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChoicesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('choices', function($table) {
			$table->increments('id')->unsigned(); // clef primaire
			$table->text('content');
			$table->enum('status',['yes','no'])->default('yes');
			// ajouter question_id
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
		Schema::drop('choices');
	}

}
