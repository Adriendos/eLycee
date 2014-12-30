<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignToPostsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('posts', function($table)
		{
			$table->integer('user_id')->unsigned()->nullable();
			$table->foreign('user_id')->references('id')->on('users'); // ->onDelete('SET NULL') rm probleme seeding
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('posts', function($table)
		{
			$table->dropColumn('user_id');
		});
	}

}
