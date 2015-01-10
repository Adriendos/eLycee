<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class QcmTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 80) as $index)
		{
			Qcm::create([
				'title'       => $faker->sentence(),
				'description' => implode(' ', $faker->sentences(6)),
				'user_id'     => $faker->numberBetween(1, 10),
				'class_level' => $faker->randomElement(['first_class', 'final_class']),
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			]);
		}
	}

}