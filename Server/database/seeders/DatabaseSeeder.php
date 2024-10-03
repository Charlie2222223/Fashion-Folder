<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use SeasonSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ClothesColorSeeder::class,
            ClothesCategoriesSeeder::class,
            ClothesSizeSeeder::class,
            SeasonSeeder::class
        ]);
    }
}