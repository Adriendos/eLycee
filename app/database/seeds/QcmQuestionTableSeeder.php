<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class QcmQuestionTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			QcmQuestion::create([
				'qcm_id' => $faker->numberBetween(1, 7),
				'question_id' => $faker->numberBetween(1, 7),
			]);
		}
	}

}