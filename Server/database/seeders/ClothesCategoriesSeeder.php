<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClothesCategoriesSeeder extends Seeder
{
    public function run()
    {
        // 外部キー制約を一時的に無効化
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // テーブルを空にする
        DB::table('clothes_categories')->truncate();

        // 外部キー制約を再有効化
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // データを挿入
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