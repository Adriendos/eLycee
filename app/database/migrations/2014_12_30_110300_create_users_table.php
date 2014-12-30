<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('username', 120)->unique();
			$table->string('email', 255)->unique();
			$table->string('password', 64);
			$table->string('profile_picture', 255);
			$table->string('remember_token', 100)->nullable();
			$table->enum('role',['teacher','first_class','final_class'])->default('first_class');
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
		Schema::drop('users');
	}

}
