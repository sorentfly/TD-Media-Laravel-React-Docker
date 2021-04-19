<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Seed project data
        $this->call([
            UserSeeder::class,
            ClientSeeder::class,
            BookSeeder::class
        ]);
    }
}
