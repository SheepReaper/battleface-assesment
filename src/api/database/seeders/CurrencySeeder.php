<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // TODO: Should really import these from the actual ISO 4217 Publication
        foreach (array('EUR', 'GBP', 'USD') as $value) {
            Currency::factory()->create(['id' => $value]);
        }
    }
}
