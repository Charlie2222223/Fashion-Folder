<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Utilities\Sanitizer; // Sanitizerクラスをインポート

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

            // サニタイジング処理を追加
            $sanitizedEmail = Sanitizer::sanitizeString($googleUser->getEmail());
            $sanitizedName = Sanitizer::sanitizeString($googleUser->getName());
            $sanitizedAvatar = Sanitizer::sanitizeString($googleUser->getAvatar());

            // ユーザーをデータベースで検索または新規作成
            $user = User::firstOrCreate(
                ['email' => $sanitizedEmail],
                [
                    'name' => $sanitizedName,
                    'provider_id' => $googleUser->getId(),
                    'avatar' => $sanitizedAvatar,
                    'provider' => 'google',
                    'password' => bcrypt(Str::random(16)), // ダミーパスワードを設定
                ]
            );

            // ユーザーをログインさせる
            Auth::login($user);

            // トークンを生成
            $token = $user->createToken('user')->plainTextToken;

            // フロントエンドURLを取得
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');

            // フロントエンドにリダイレクト
            return redirect()->to($frontendUrl . '/auth/callback?token=' . $token);

        } catch (\Throwable $e) {
            Log::error('Google login error: ' . $e->getMessage());
            Log::info('Google user data: ', ['user' => $googleUser ?? null]);
            Log::error('Stack trace: ' . $e->getTraceAsString());

            // エラー時のリダイレクト
            return redirect('/login')->withErrors(['error' => 'Unable to login using Google. Please try again.']);
        }
    }
}