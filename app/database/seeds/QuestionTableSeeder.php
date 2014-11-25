<?php
class QuestionTableSeeder extends Seeder {
	public function run() {
		DB::table('questions')->delete();
		DB::unprepared('ALTER TABLE questions AUTO_INCREMENT=1'); 
		DB::table('questions')->insert(
		[
			[
				'title' => 'Alexandre',
				'content' => 'test',
				'status' => 'published',
				'class_level' => 'first_class',
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Abel',
				'content' => 'test',
				'status' => 'published',
				'class_level' => 'final_class',
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Al',
				'content' => 'test',
				'status' => 'published',
				'class_level' => 'first_class',
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Alan',
				'content' => 'test',
				'status' => 'unpublished',
				'class_level' => 'first_class',
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Arthur',
				'content' => 'test',
				'status' => 'published',
				'class_level' => 'final_class',
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Carl',
				'content' => 'test',
				'status' => 'published',
				'class_level' => 'first_class',
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Blaise',
				'content' => 'test',
				'status' => 'unpublished',
				'class_level' => 'final_class',
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			]
		]);
	}
} ?>