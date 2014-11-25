<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('questions', function($table) {
			$table->increments('id')->unsigned(); // clef primaire
			$table->string('title', 200);
			$table->text('content');
			$table->enum('class_level',['first_class','final_class'])->default('first_class');
			$table->enum('status',['published','unpublished'])->default('published');
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
		Schema::drop('questions');
	}

}
