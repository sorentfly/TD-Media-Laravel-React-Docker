<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create admin user
        $user = new User([
            'name' => 'admin',
            'email' => 'admin@localhost.to',
            'password' => bcrypt('wwHHwMrZYr')
        ]);
        $user->save();
    }
}
