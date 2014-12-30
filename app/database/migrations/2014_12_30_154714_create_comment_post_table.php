<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommentPostTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('comment_post', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('comment_id')->unsigned()->index();
			$table->foreign('comment_id')->references('id')->on('comments')->onDelete('cascade');
			$table->integer('post_id')->unsigned()->index();
			$table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('comment_post');
	}

}
