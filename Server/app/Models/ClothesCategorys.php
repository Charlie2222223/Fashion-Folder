<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClothesCategorys extends Model
{
    use HasFactory;

    protected $table = 'clothes_categories';  // テーブル名はそのまま
}