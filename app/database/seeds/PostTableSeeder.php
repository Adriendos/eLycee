<?php

use Faker\Factory as Faker;

class PostTableSeeder extends Seeder {
	public function run() {
		DB::table('posts')->delete();
		DB::unprepared('ALTER TABLE posts AUTO_INCREMENT=1'); 

		$faker = Faker::create();
 
		for ($i = 0; $i < 10000; $i++)
		{
			$post = Post::create( [
				'title'         => $faker->text(180),
				'excerpt'       => $faker->text(255),
				'content'       => $faker->paragraph(8),
				'url_thumbnail' => $faker->imageUrl(),
				'status'        => 'published',
				'user_id'       => $faker->numberBetween(1, 10),
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			]);
		}
	}
} 

