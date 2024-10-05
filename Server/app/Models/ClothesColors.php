<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClothesColors extends Model
{
    protected $table = 'clothes_colors';
    
    protected $fillable = ['color_name', 'color_code'];

    use HasFactory;
}
