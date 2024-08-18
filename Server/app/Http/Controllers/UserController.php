<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUserData(Request $request)
    {
        // 現在認証されているユーザーを取得
        $user = Auth::user();

        // ユーザー情報をレスポンスとして返す
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at,
            'avatar' => $user->avatar,
            // 必要に応じて他のフィールドを追加
        ]);
    }
}