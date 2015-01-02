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
				'content' => $faker->sentence(),
				'user_id' => $faker->numberBetween(1, 10),
				'created_at' => $faker->unixTime(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,10,10)->toDateTimeString(),
			]);
		}
	}
}