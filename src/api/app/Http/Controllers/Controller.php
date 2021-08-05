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
 * @OA\Server(
 *     description="Local server",
 *     url="http://127.0.0.1:8000/api/"
 * )
 * @OA\ExternalDocumentation(
 *     description="Find out more about Swagger",
 *     url="http://swagger.io"
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
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
