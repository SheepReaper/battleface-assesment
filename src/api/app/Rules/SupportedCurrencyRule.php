<?php

namespace App\Rules;

use App\Models\Currency;
use Illuminate\Contracts\Validation\Rule;

class SupportedCurrencyRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        Currency::findOrFail($value);

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Unsupported currency.';
    }
}
