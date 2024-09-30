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
            ['category_name' => 'Tシャツ'],
            ['category_name' => 'パンツ'],
            ['category_name' => 'ジャケット'],
            ['category_name' => 'スカート'],
            ['category_name' => 'アウター'],
            ['category_name' => 'ジーンズ'],
            ['category_name' => 'シャツ'],
            ['category_name' => 'パーカー'],
            ['category_name' => 'カーディガン'],
        ]);
    }
}