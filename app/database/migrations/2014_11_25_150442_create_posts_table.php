<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('posts', function($table) {
			$table->increments('id')->unsigned(); // clef primaire
			$table->string('title', 200);
			$table->string('excerpt', 255);
			$table->text('content');
			$table->string('url_thumbnail', 150);
			$table->enum('status',['published','unpublished'])->default('published');
			// ajouter user_id
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
		Schema::drop('posts');
	}

}
