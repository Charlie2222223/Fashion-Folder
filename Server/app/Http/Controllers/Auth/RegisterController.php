<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\WelcomeMail;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // バリデーション: 入力データが正しい形式かどうかを確認する
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // 6桁のランダムな一時パスワードを生成
        $temporaryPassword = Str::random(6);

        // UserVerificationテーブルに一時パスワードを保存
        UserVerification::create([
            'email' => $validatedData['email'],
            'temporary_password' => $temporaryPassword,
            'created_at' => now(),
        ]);

        // メール送信
        Mail::to($validatedData['email'])->send(new WelcomeMail($temporaryPassword));

        // 成功メッセージを返す
        return response()->json(['message' => 'Temporary password sent, please verify']);
    }

    public function PushUserInfo(Request $request)
    {
        // UserVerificationテーブルから一時パスワードを確認
        $userVerification = UserVerification::where('email', $request->email)
            ->where('temporary_password', $request->temporary_password)
            ->first();

        if (!$userVerification) {
            // 一時パスワードが一致しない場合、エラーメッセージを返す
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        // パスワードが一致した場合、ユーザーを登録
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'provider' => 'google', // 必要に応じて他のプロバイダを追加
        ]);

        // UserVerificationレコードを削除
        $userVerification->delete();

        // ユーザー登録成功メッセージを返す
        return response()->json(['message' => 'User registration successful']);
    }
}