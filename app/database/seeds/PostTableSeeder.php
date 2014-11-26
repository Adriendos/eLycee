<?php
class PostTableSeeder extends Seeder {
	public function run() {
		DB::table('posts')->delete();
		DB::unprepared('ALTER TABLE posts AUTO_INCREMENT=1'); 
		DB::table('posts')->insert(
		[
			[
				'title' => 'Alexandre',
				'excerpt' => 'test',
				'content' => 'test',
				'url_thumbnail' => 'test',
				'status' => 'published',
				'user_id' => 6,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Abel',
				'excerpt' => 'test',
				'content' => 'test',
				'url_thumbnail' => 'test',
				'status' => 'published',
				'user_id' => 1,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Al',
				'excerpt' => 'test',
				'content' => 'test',
				'url_thumbnail' => 'test',
				'status' => 'published',
				'user_id' => 1,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Alan',
				'excerpt' => 'test',
				'content' => 'test',
				'url_thumbnail' => 'test',
				'status' => 'unpublished',
				'user_id' => 3,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Arthur',
				'excerpt' => 'test',
				'content' => 'test',
				'url_thumbnail' => 'test',
				'status' => 'published',
				'user_id' => 2,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Carl',
				'excerpt' => 'test',
				'content' => 'test',
				'url_thumbnail' => 'test',
				'status' => 'published',
				'user_id' => 1,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'title' => 'Blaise',
				'excerpt' => 'test',
				'content' => 'test',
				'url_thumbnail' => 'test',
				'status' => 'unpublished',
				'user_id' => 5,
				'created_at' => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			]
		]);
	}
} ?>