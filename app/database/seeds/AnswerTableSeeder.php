<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class AnswerTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			Answer::create([
				'content' => implode(' ', $faker->sentences),
				'status' => true,
				'question_id' => $faker->numberBetween(1, 10),
				'created_at'    => $faker->unixTime(),
				'updated_at'    => \Carbon\Carbon::createFromDate(2014,10,10)->toDateTimeString(),
			]);
		}
	}

}