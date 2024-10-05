<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClothesCategories extends Model
{
    protected $table = 'clothes_categories';

    protected $fillable = ['category_name'];
    
    use HasFactory;
}
