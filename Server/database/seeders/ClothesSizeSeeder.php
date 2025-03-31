<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClothesSizeSeeder extends Seeder
{
    public function run()
    {
        // 外部キー制約を一時的に無効化
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // テーブルをクリア
        DB::table('clothes_sizes')->truncate();

        // 外部キー制約を再有効化
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // データを挿入
        DB::table('clothes_sizes')->insert([
            ['size_name' => 'XS'],
            ['size_name' => 'S'],
            ['size_name' => 'M'],
            ['size_name' => 'L'],
            ['size_name' => 'XL'],
            ['size_name' => 'XXL'],
            ['size_name' => 'XXXL'],
        ]);
    }
}