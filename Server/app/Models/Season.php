<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    protected $table = 'seasons';

    use HasFactory;

    // clothes_setupsテーブルとの多対多の関係を定義
    public function clothesSetups()
    {
        return $this->belongsToMany(clothes_setups::class, 'clothes_setup_season', 'season_id', 'clothes_setup_id');
    }
}