<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClothesColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clothes_colors')->truncate();

        DB::table('clothes_colors')->insert([
            ['color_name' => '赤色', 'color_code' => '#FF0000'],
            ['color_name' => '青色', 'color_code' => '#0000FF'],
            ['color_name' => '黄色', 'color_code' => '#FFFF00'],
            ['color_name' => '緑色', 'color_code' => '#008000'],
            ['color_name' => '茶色', 'color_code' => '#A52A2A'],
            ['color_name' => 'グレー', 'color_code' => '#808080'],
            ['color_name' => '紺色', 'color_code' => '#000080'],
            ['color_name' => '紫色', 'color_code' => '#800080'],
            ['color_name' => 'オレンジ色', 'color_code' => '#FFA500'],
            ['color_name' => '黒色', 'color_code' => '#000000'],
            ['color_name' => '白色', 'color_code' => '#FFFFFF'],
        ]);
    }
}