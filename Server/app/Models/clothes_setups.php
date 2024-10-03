<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class clothes_setups extends Model
{
    protected $table = 'clothes_setups';

    use HasFactory;
    
    // seasonsテーブルとの多対多の関係を定義
    public function seasons()
    {
        return $this->belongsToMany(Season::class, 'clothes_setup_season', 'clothes_setup_id', 'season_id');
    }

}

