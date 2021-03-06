<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();
		$this->call('UserTableSeeder');
		$this->call('PostTableSeeder');
		
		// $this->call('CommentTableSeeder');
		// $this->call('QcmTableSeeder');
		// $this->call('QuestionTableSeeder');
		// $this->call('AnswerTableSeeder');
		// $this->call('ScoreTableSeeder');
	}
}
