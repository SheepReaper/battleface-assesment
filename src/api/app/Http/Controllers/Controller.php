<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="Battleface Assessment API",
 *     version="1.0.0",
 * )
 */
/**
 * @OA\Schema(
 *     schema="User",
 *     @OA\Property(property="id", type="number"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string"),
 *     @OA\Property(property="email_verified_at", type="date"),
 *     @OA\Property(property="created_at", type="date"),
 *     @OA\Property(property="updated_at", type="date"),
 * )
 */
/**
 * @OA\Schema(
 *     schema="TokenResponse",
 *     @OA\Property(property="access_token", type="string"),
 *     @OA\Property(property="token_type", type="string", example="bearer"),
 *     @OA\Property(property="expires_in", type="number"),
 *     @OA\Property(
 *         property="user",
 *         ref="#/components/schemas/User",
 *     )
 * )
 */
/**
 * @OA\Schema(
 *     schema="Quote",
 *     @OA\Property(property="created_at", type="date"),
 *     @OA\Property(property="start_date", type="date"),
 *     @OA\Property(property="end_date", type="date"),
 *     @OA\Property(property="ages", type="string"),
 *     @OA\Property(property="total", type="number"),
 *     @OA\Property(property="currency_id", type="number"),
 *     @OA\Property(property="quotation_id", type="number"),
 * )
 */
/**
 * @OA\Schema(
 *     schema="QuoteRequestResponse",
 *     @OA\Property(property="total", type="number"),
 *     @OA\Property(property="currency_id", type="number"),
 *     @OA\Property(property="quotation_id", type="number"),
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
