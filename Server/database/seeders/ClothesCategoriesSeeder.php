<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClothesCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clothes_categories')->insert([
            ['clothes_name' => 'Tシャツ'],
            ['clothes_name' => 'パンツ'],
            ['clothes_name' => 'ジャケット'],
            ['clothes_name' => 'スカート'],
            ['clothes_name' => 'アウター'],
            ['clothes_name' => 'ジーンズ'],
            ['clothes_name' => 'シャツ'],
            ['clothes_name' => 'パーカー'],
            ['clothes_name' => 'カーディガン'],
        ]);
    }
}