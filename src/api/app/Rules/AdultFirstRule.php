<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class AdultFirstRule implements Rule
{
    private int $max_number_of_elements;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(int $max_number_of_elements)
    {
        $this->max_number_of_elements = $max_number_of_elements;
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
        // Rule: The first element must be an adult (hard-coded 18), thus minimum 1 element always.
        // None of the remaining ages can be 0.
        // It's okay if this validator throws, it just means the input string was badly formatted.
        try {
            // can throw
            $exploded = explode(',', $value, $this->max_number_of_elements);

            if (count($exploded) > 0) {
                // can throw
                $elems = array_map('intval', $exploded);

                if ($elems[0] >= 18) {
                    $valid = true;

                    foreach (array_slice($elems, 1) as $elem) {
                        if ($elem < 1) {
                            $valid = false;
                            break;
                        }
                    }

                    return $valid;
                }
            }

            return false;
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The provided string of ages did not parse, or you sent too many elements.';
    }
}
