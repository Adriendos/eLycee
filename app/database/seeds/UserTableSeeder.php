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
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			],
			[
				'username'        => 'admin',
				'email'           => $faker->email,
				'password'        => Hash::make('password'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => 'teacher',
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			],
			[
				'username'        => 'student1',
				'email'           => $faker->email,
				'password'        => Hash::make('password'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => 'first_class',
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			],
			[
				'username'        => 'student2',
				'email'           => $faker->email,
				'password'        => Hash::make('password'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => 'final_class',
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			],
			[
				'username'        => 'Abel',
				'email'           => $faker->email,
				'password'        => Hash::make('Abel'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => $faker->randomElement(['first_class', 'final_class']),
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			],
			[
				'username'        => 'Al',
				'email'           => $faker->email,
				'password'        => Hash::make('Al'),
				'profile_picture' => $faker->imageUrl(640, 480), 
				'role'            => $faker->randomElement(['first_class', 'final_class']),
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			]
		]);
		
		foreach(range(1, 15) as $index)
		{
			User::create([
				'username'        => $faker->firstName,
				'email'           => $faker->email,
				'password'        => Hash::make('password'),
				'profile_picture' => $faker->imageUrl(640, 480),
				'role'            => $faker->randomElement(['first_class', 'final_class']),
				'created_at'      => $faker->dateTimeThisYear('2014-02-27 20:52:14') ,
				'updated_at'      => $faker->dateTimeThisMonth(),
			]);
		}
	}
} ?>