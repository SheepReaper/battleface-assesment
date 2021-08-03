<?php

namespace Database\Seeders;

use App\Models\AgeLoad;
use Illuminate\Database\Seeder;

class AgeLoadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AgeLoad::factory()->create([
            'min_age' => 18,
            'max_age' => 30,
            'load' => 0.6,
        ]);

        AgeLoad::factory()->create([
            'min_age' => 31,
            'max_age' => 40,
            'load' => 0.7,
        ]);

        AgeLoad::factory()->create([
            'min_age' => 41,
            'max_age' => 50,
            'load' => 0.8,
        ]);

        AgeLoad::factory()->create([
            'min_age' => 51,
            'max_age' => 60,
            'load' => 0.9,
        ]);

        AgeLoad::factory()->create([
            'min_age' => 61,
            'max_age' => 70,
            'load' => 1.0,
        ]);
    }
}
