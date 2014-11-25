<?php
class ChoiceTableSeeder extends Seeder {
	public function run() {
		DB::table('choices')->delete();
		DB::unprepared('ALTER TABLE choices AUTO_INCREMENT=1'); 
		DB::table('choices')->insert(
		[
			[
				'content' => 'test',
				'status' => 'no',
				'question_id' => 1,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'content' => 'test',
				'status' => 'yes',
				'question_id' => 2,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'content' => 'test',
				'status' => 'no',
				'question_id' => 3,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'content' => 'test',
				'status' => 'no',
				'question_id' => 4,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'content' => 'test',
				'status' => 'yes',
				'question_id' => 4,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'content' => 'test',
				'status' => 'no',
				'question_id' => 5,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'content' => 'test',
				'status' => 'no',
				'question_id' => 6,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			]
		]);
	}
} ?>