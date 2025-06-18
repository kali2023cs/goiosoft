<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheckoutPayment extends Model
{
    protected $table = 'checkout_payments';
    
    protected $fillable = [
        'checkout_id', 'payment_method', 'payment_amount',
        'payment_date', 'transaction_reference', 'payment_notes', 'created_by'
    ];
    
    protected $casts = [
        'payment_date' => 'datetime',
    ];
    
    public function checkout()
    {
        return $this->belongsTo(CheckoutMaster::class, 'checkout_id');
    }
}