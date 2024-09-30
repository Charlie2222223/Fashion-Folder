<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCloset extends Model
{
    use HasFactory;

    // テーブル名を指定（デフォルトが `user_closets` ではない場合）
    protected $table = 'user_closets';

    // マスアサインメント可能な属性
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

    /**
     * User モデルとのリレーション (多対1)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * ClothesCategory モデルとのリレーション (多対1)
     */
    public function category()
    {
        return $this->belongsTo(clothes_categories::class, 'clothes_category');
    }

    /**
     * ClothesSize モデルとのリレーション (多対1)
     */
    public function size()
    {
        return $this->belongsTo(clothes_sizes::class, 'clothes_size');
    }

    /**
     * ClothesColor モデルとのリレーション (多対1)
     */
    public function color()
    {
        return $this->belongsTo(clothes_colors::class, 'clothes_color');
    }
}