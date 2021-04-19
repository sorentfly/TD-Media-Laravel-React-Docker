<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $clients = [
            ["fullname" => "Павлова Мелисса Андреевна"],
            ["fullname" => "Иванова Василиса Александровна"],
            ["fullname" => "Ермаков Георгий Степанович"],
            ["fullname" => "Крылов Тимур Степанович"],
            ["fullname" => "Харитонов Дмитрий Евгеньевич"],
            ["fullname" => "Лобанова Мария Ильинична"],
            ["fullname" => "Алешина Алиса Данииловна"],
            ["fullname" => "Трофимова София Алиевна"],
            ["fullname" => "Захаров Михаил Львович"],
            ["fullname" => "Герасимова Дарина Мироновна"],
        ];

        foreach ($clients as $client_data) {
            $client = new Client($client_data);
            $client->save();
        }

//        DB::table("clients")->insert($clients);
    }
}
