<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class QcmTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			Qcm::create([
				'title' => $faker->sentence(),
				'description' => implode(' ', $faker->sentences(6)),
				'created_at'    => $faker->unixTime(),
				'updated_at'    => \Carbon\Carbon::createFromDate(2014,10,10)->toDateTimeString(),
			]);
		}
	}

}