<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quotation;
use App\Models\AgeLoad;
use App\Http\Resources\QuotationResource;
use App\Http\Resources\QuotationResponseResource;
use App\Rules\AdultFirstRule;
use App\Rules\SupportedCurrencyRule;

class QuotationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/quotation",
     *     summary="Returns all quotations in DB",
     *     description="Returns all quotations in DB",
     *     operationId="getQuotes",
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 ref="#/components/schemas/Quote"
     *             )
     *         )
     *     ),
     *     security={{"bearer_token":{}}}
     * )
     */
    public function index()
    {
        return QuotationResource::collection(Quotation::all());
    }

    /**
     * @OA\Post(
     *     path="/api/quotation",
     *     summary="Creates a new Quote",
     *     description="Creates and returns a new quote",
     *     operationId="postQuotes",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              required={"age", "currency_id", "start_date", "end_date"},
     *              @OA\Property(property="age", type="number"),
     *              @OA\Property(property="currency_id", type="number"),
     *              @OA\Property(property="start_date", type="date"),
     *              @OA\Property(property="end_date", type="date"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *          description="Input validation failed.",
     *          @OA\JsonContent(
     *              @OA\Property(property="age", type="string", example="First age must be 18 or older"),
     *              @OA\Property(property="currency_id", type="string", example="Currency code must be supported"),
     *              @OA\Property(property="start_date", type="string", example="Date cannot be before today"),
     *              @OA\Property(property="end_date", type="string", example="Trip must be at least 1 day long"),
     *          )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="successful operation",
     *         @OA\JsonContent(
     *             ref="#/components/schemas/QuoteRequestResponse"
     *         )
     *     ),
     *     security={{"bearer_token":{}}}
     * )
     */
    public function store(Request $request)
    {
        // This prevents attacks that send a parameter too long attack
        // Set it to something reasonable like the biggest number of clients
        // that should be allowed to apply
        $max_applicants = 100;

        $request->validate([
            'age' => ['required', 'string', new AdultFirstRule($max_applicants)],
            'currency_id' => ['required', 'string', 'max:3', new SupportedCurrencyRule],
            'start_date' => 'required|date_format:Y-m-d|after:now',
            'end_date' => 'required|date_format:Y-m-d|after:start_date',
        ]);

        $ages = array_map('intval', explode(',', $request->input('age')));
        $currency_id = $request->input('currency_id');
        $start_date = strtotime($request->input('start_date'));
        $end_date = strtotime($request->input('end_date'));

        $duration = date_diff(date_create($request->input('end_date')), date_create($request->input('start_date')))->days;

        $total_cost = 0;
        $fixed_rate = 3;

        foreach ($ages as $age) {
            // If we don't have a load entry assume the load is 0;
            $load = 0;

            $load_entries = AgeLoad::where('min_age', '<=', $age)->where('max_age', '>=', $age)->get();

            if ($load_entries->count() == 1) {
                $load = $load_entries[0]->load;
            }

            $total_cost += $fixed_rate * $load * ($duration + 1);
        }

        $quote = Quotation::create([
            'start_date' => $start_date,
            'end_date' => $end_date,
            'ages' => $ages,
            'total' => round($total_cost, 2),
            'currency_id' => $currency_id,
        ]);

        return (new QuotationResponseResource($quote))->response()->setStatusCode(201);
    }
}
