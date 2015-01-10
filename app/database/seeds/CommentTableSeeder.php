<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class CommentTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 320) as $index)
		{
			Comment::create([
				'content'    => $faker->sentence(),
				'name'       => $faker->name,
				'post_id'    => $faker->numberBetween(1, 10),
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			]);
		}
	}
}