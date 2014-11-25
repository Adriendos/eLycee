<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignToScoresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('scores', function($table)
		{
			$table->integer('question_id')->unsigned()->nullable();
			$table->foreign('question_id')->references('id')->on('questions')->onDelete('SET NULL');
			$table->integer('user_id')->unsigned()->nullable();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('scores', function(Blueprint $table)
		{
			$table->dropColumn('question_id');
			$table->dropColumn('user_id');
		});
	}

}
