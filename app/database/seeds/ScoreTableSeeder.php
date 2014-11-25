<?php
class ScoreTableSeeder extends Seeder {
	public function run() {
		DB::table('scores')->delete();
		DB::unprepared('ALTER TABLE scores AUTO_INCREMENT=1'); 
		DB::table('scores')->insert(
		[
			[
				'status_question' => 'todo',
				'user_id' =>1,
				'note' => 5,
				'question_id' => 1,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'status_question' => 'todo',
				'user_id' =>2,
				'note' => 5,
				'question_id' => 2,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'status_question' => 'todo',
				'user_id' =>3,
				'note' => 7,
				'question_id' => 3,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'status_question' => 'todo',
				'user_id' =>4,
				'note' => 5,
				'question_id' => 4,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'status_question' => 'todo',
				'user_id' =>5,
				'note' => 5,
				'question_id' => 4,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'status_question' => 'todo',
				'user_id' =>6,
				'note' => 3,
				'question_id' => 5,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'status_question' => 'todo',
				'user_id' =>7,
				'note' => 10,
				'question_id' => 6,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			]
		]);
	}
} ?>