<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SocialController extends Controller
{
    /**
     * Googleへのリダイレクトを処理する
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Googleからのコールバックを処理する
     */
    public function handleGoogleCallback()
    {
        try {
            // Googleユーザー情報の取得
            $googleUser = Socialite::driver('google')->user();

            // Googleユーザー情報が取得できない場合は例外を投げる
            if (!$googleUser || !$googleUser->getEmail()) {
                throw new \Exception('Google user information could not be retrieved.');
            }

            // ユーザーをデータベースで検索または新規作成
            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'provider_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'provider' => 'google',
                ]
            );

            // ユーザーをログインさせる
            Auth::login($user);

            // トークンを生成
            $token = $user->createToken('user')->plainTextToken;

            // フロントエンドのURLにリダイレクト（.envからURLを取得）
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
            return redirect()->to($frontendUrl . '/auth/callback?token=' . $token);

        } catch (\Throwable $e) {
            // エラーログを出力し、ログイン画面にリダイレクト
            Log::error('Google login error: ' . $e->getMessage());
            return redirect('/login')->withErrors(['error' => 'Unable to login using Google. Please try again.']);
        }
    }
}