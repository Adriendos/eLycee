<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateQcmsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('qcms', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('title', 255);
			$table->text('description')->nullable();
			$table->enum('class_level',['first_class','final_class'])->default('final_class');
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
		Schema::drop('qcms');
	}

}
