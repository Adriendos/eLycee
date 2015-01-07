<?php
use Faker\Factory as Faker;

class UserTableSeeder extends Seeder {
	public function run() {

		$faker = Faker::create();

		DB::table('users')->delete();
		DB::unprepared('ALTER TABLE users AUTO_INCREMENT=1'); 
		DB::table('users')->insert(
		[
			[
				'username'        => 'Alexandre',
				'email'           => $faker->email,
				'password'        => Hash::make('Alexandre'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => 'teacher',
				'created_at'      => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at'      => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'username'        => 'admin',
				'email'           => $faker->email,
				'password'        => Hash::make('password'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => 'teacher',
				'created_at'      => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at'      => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'username'        => 'student1',
				'email'           => $faker->email,
				'password'        => Hash::make('password'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => 'first_class',
				'created_at'      => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at'      => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'username'        => 'student2',
				'email'           => $faker->email,
				'password'        => Hash::make('password'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => 'final_class',
				'created_at'      => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at'      => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'username'        => 'Abel',
				'email'           => $faker->email,
				'password'        => Hash::make('Abel'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => $faker->randomElement(['first_class', 'final_class']),
				'created_at'      => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at'      => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			],
			[
				'username'        => 'Al',
				'email'           => $faker->email,
				'password'        => Hash::make('Al'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => $faker->randomElement(['first_class', 'final_class']),
				'created_at'      => \Carbon\Carbon::createFromDate(2014,02,03)->toDateTimeString(),
				'updated_at'      => \Carbon\Carbon::createFromDate(2014,03,03)->toDateTimeString(),
			]
		]);
		
		foreach(range(1, 10) as $index)
		{
			User::create([
				'username'        => $faker->firstName,
				'email'           => $faker->email,
				'password'        => Hash::make('password'),
				'profile_picture' => $faker->imageUrl(640, 480),
				'role'            => $faker->randomElement(['first_class', 'final_class']),
				'created_at'      => $faker->unixTime(),
				'updated_at'      => \Carbon\Carbon::createFromDate(2014,10,10)->toDateTimeString(),
			]);
		}
	}
} ?>