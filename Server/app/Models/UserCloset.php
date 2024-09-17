<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCloset extends Model
{
    use HasFactory;

    protected $table = 'user_closets';

    protected $fillable = [
        'user_id',
        'clothes_name',
        'clothes_category',
        'clothes_size',
        'clothes_color',
        'clothes_detail',
        'price',
        'image',
    ];

    // ユーザーとのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}