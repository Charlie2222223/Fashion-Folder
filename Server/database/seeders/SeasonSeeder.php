<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('seasons')->insert([
            ['season_name' => '春'],
            ['season_name' => '夏'],
            ['season_name' => '秋'],
            ['season_name' => '冬'],
        ]);
    }
}