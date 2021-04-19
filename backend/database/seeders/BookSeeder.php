<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        $books = [];
        $i = 0;
        while ($i<15) {
            $book = new Book(["title" => sprintf("Книга %d", ++$i)]);
            $book->save();
//            $books[] = ["title" => sprintf("Книга %d", $i++)];
        }

//        DB::table("clients")->insert($books);
    }
}
