<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class clothes_setup_items extends Model
{
    protected $table = 'clothes_setup_items';

    use HasFactory;


    public function clothes()
    {
        return $this->belongsTo(UserCloset::class, 'clothes_id');
    }
}
