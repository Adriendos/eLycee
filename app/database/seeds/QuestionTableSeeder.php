<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class QuestionTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 260) as $index)
		{
			Question::create([
				'content'    => $faker->sentence(8) . ' ?',
				'qcm_id'     => $faker->numberBetween(1, 10),
				'created_at' => $faker->unixTime(),
				'updated_at' => \Carbon\Carbon::createFromDate(2014,10,10)->toDateTimeString(),
			]);
		}
	}

}