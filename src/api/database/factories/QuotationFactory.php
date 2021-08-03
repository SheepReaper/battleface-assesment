<?php

namespace Database\Factories;

use App\Models\Quotation;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuotationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quotation::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        function randomAges(QuotationFactory $factory)
        {
            $ages = [$factory->faker->numberBetween(18, 60),];

            for ($i = 1; $i < 6; $i++) {
                $ages[$i] = $factory->faker->unique()->randomDigit;
            }

            return $ages;
        }

        $str_ages = implode(',', array_map('strval', randomAges($this)));

        return [
            'start_date' => $this->faker->dateTimeBetween('now', '+1 years'),
            'end_date' => $this->faker->dateTimeBetween('+1 years', '+30 years'),
            'ages' => "[$str_ages]",
            'total' => $this->faker->randomFloat(2),
            'currency_id' => $this->faker->numberBetween(0, 2),
        ];
    }
}
