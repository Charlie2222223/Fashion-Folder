<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\WelcomeMail;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Utilities\Sanitizer; // Sanitizerクラスをインポート

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        // サニタイジング処理
        $sanitizedEmail = Sanitizer::sanitizeString($request->input('email'));
        
        // 6桁のランダムな一時パスワードを生成
        $temporaryPassword = $this->generateTemporaryPassword();

        // 一時パスワードを保存
        $this->storeTemporaryPassword($sanitizedEmail, $temporaryPassword);

        // メール送信
        $this->sendVerificationEmail($sanitizedEmail, $temporaryPassword);

        return response()->json(['message' => 'Temporary password sent, please verify']);
    }

    public function PushUserInfo(Request $request)
    {
        // サニタイジング処理
        $sanitizedEmail = Sanitizer::sanitizeString($request->input('email'));
        $sanitizedName = Sanitizer::sanitizeString($request->input('name'));
        $sanitizedTemporaryPassword = Sanitizer::sanitizeString($request->input('temporary_password'));

        // 一時パスワードを確認
        $userVerification = $this->verifyTemporaryPassword($sanitizedEmail, $sanitizedTemporaryPassword);

        if (!$userVerification) {
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        // ユーザーをデータベースに登録
        $user = $this->registerUser($sanitizedName, $sanitizedEmail, $request->password);

        // 一時パスワードを削除
        $this->deleteTemporaryPassword($userVerification);

        // トークンを生成
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User registration successful',
            'token' => $token,
            'user' => $user,
        ]);
    }

    protected function verifyTemporaryPassword($email, $temporaryPassword)
    {
        $verification = UserVerification::where('email', $email)
            ->where('temporary_password', $temporaryPassword)
            ->first();

        return $verification;
    }

    protected function registerUser($name, $email, $password)
    {
        return User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'provider' => 'google',
        ]);
    }

    // 他のメソッドは変わらず
}