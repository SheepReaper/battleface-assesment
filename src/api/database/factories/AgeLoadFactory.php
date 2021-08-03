<?php

namespace Database\Factories;

use App\Models\AgeLoad;
use Illuminate\Database\Eloquent\Factories\Factory;

class AgeLoadFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AgeLoad::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $num1 = $this->faker->numberBetween(18, 255);
        $num2 = $this->faker->numberBetween(18, 255);

        return [
            'min_age' => min($num1, $num2),
            'max_age' => max($num1, $num2),
            'load' => $this->faker->randomFloat(1, 0.0, 1.0),
        ];
    }
}
