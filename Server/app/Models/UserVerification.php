<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVerification extends Model
{
    use HasFactory;

    /**
     * 一括割り当てを許可する属性
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'temporary_password',
    ];
}
