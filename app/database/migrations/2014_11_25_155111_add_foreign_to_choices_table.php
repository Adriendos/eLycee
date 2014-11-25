<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignToChoicesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('choices', function($table)
		{
			$table->integer('question_id')->unsigned()->nullable();
			$table->foreign('question_id')->references('id')->on('questions')->onDelete('SET NULL');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('choices', function(Blueprint $table)
		{
		$table->dropColumn('question_id');
		});
	}

}
