<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class UserVerification extends Model
{
    use HasFactory;

    protected $fillable = ['email', 'temporary_password', 'created_at'];

    public static function deleteExpired()
    {
        // 2分以上経過したレコードを削除
        self::where('created_at', '<', Carbon::now()->subMinutes(2))->delete();
    }
}
