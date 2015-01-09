<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class ScoreTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			Score::create([
				'score' => $faker->numberBetween(25, 100),
				'user_id' => $faker->numberBetween(1, 18),
				'qcm_id' => $faker->numberBetween(1, 80),
			]);
		}
	}

}