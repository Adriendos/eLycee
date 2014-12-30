<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class CommentPostsTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 320) as $index)
		{
			CommentPost::create([
				'comment_id' => $faker->numberBetween(1, 10),
				'post_id'    => $faker->numberBetween(1, 10),
			]);
		}
	}

}