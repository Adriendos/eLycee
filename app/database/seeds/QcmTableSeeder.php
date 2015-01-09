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
				'created_at'  => $faker->unixTime(),
				'updated_at'  => \Carbon\Carbon::createFromDate(2014,10,10)->toDateTimeString(),
			]);
		}
	}

}