<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeasonSeeder extends Seeder
{
    public function run()
    {
        // 外部キー制約を一時的に無効化
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // テーブルをクリア
        DB::table('seasons')->truncate();

        // 外部キー制約を再有効化
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // データを挿入
        DB::table('seasons')->insert([
            ['season_name' => '春'],
            ['season_name' => '夏'],
            ['season_name' => '秋'],
            ['season_name' => '冬'],
        ]);
    }
}