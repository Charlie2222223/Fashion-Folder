<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClothesSizes extends Model
{
    protected $table = 'clothes_sizes';

    protected $fillable = ['size_name'];

    use HasFactory;
}
