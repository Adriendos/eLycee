<?php
class CommentTableSeeder extends Seeder {
	public function run() {
		DB::table('comments')->delete();
		DB::unprepared('ALTER TABLE comments AUTO_INCREMENT=1'); 
		DB::table('comments')->insert(
		[
			[
				'title' => 'Alexandre',
				'content' => 'test',
				'status' => 'published',
				'post_id' => 6,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Abel',
				'content' => 'test',
				'status' => 'published',
				'post_id' => 1,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Al',
				'content' => 'test',
				'status' => 'published',
				'post_id' => 1,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Alan',
				'content' => 'test',
				'status' => 'unpublished',
				'post_id' => 3,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Arthur',
				'content' => 'test',
				'status' => 'published',
				'post_id' => 2,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Carl',
				'content' => 'test',
				'status' => 'published',
				'post_id' => 1,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Blaise',
				'content' => 'test',
				'status' => 'unpublished',
				'post_id' => 5,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			]
		]);
	}
} ?>