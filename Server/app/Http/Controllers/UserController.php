<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // Logのインポート

class UserController extends Controller
{
    public function getGoogleUserData(Request $request)
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

    public function getUserData(Request $request)
{
    // ユーザーの検索
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        // ユーザーが見つからない場合のエラーメッセージ
        Log::warning('No account found with this email: ' . $request->email);
        return response()->json(['message' => 'No account found with this email.'], 400);
    }

    // パスワードの確認
    if (!Hash::check($request->password, $user->password)) {
        // パスワードが一致しない場合のエラーメッセージ
        Log::warning('Invalid password for user: ' . $request->email);
        return response()->json(['message' => 'Invalid password.'], 400);
    }

    // ユーザーのログイン
    Auth::login($user);

    // トークンを生成
    $token = $user->createToken('user')->plainTextToken;

    // トークンをデバッグ
    Log::info('Generated token: ' . $token);

    // トークンが正しく生成されたか確認
    if (!$token) {
        Log::error('Token generation failed for user: ' . $user->email);
        return response()->json(['message' => 'Token generation failed.'], 500);
    }

    // 認証されたユーザー情報を返す
    return response()->json([
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
        ]
    ]);
}

public function logout(Request $request)
{
    // ユーザーの現在のトークンを削除
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
}

    /**
     * ユーザーから送信されたパスワードを確認するメソッド
     * 
     * @param Request $request リクエストオブジェクト
     * @return bool パスワードが一致すればtrue、一致しなければfalse
     */
    protected function UserPassword(Request $request, $user)
    {
        return Hash::check($request->password, $user->password);
    }
}