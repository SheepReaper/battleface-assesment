<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuotationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'created_at' => $this->created_at,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'ages' => $this->ages,
            'total' => $this->total,
            'currency_id' => $this->currency_id,
            'quotation_id' => $this->id,
        ];
    }
}
