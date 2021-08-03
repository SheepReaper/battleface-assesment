<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AgeLoadSeeder::class);

        $this->command->info('Age-Load table seeded!');

        $this->call(CurrencySeeder::class);

        $this->command->info('Supported currencies seeded!');

        $this->call(UserSeeder::class);

        $this->command->info('Default Users seeded!');
    }
}
