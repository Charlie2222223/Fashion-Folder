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


class RegisterController extends Controller
{
    /**
     * ユーザー登録処理を行うメソッド
     * 
     * @param RegisterRequest $request リクエストオブジェクト
     * @return \Illuminate\Http\JsonResponse JSON形式のレスポンスを返す
     */
    public function register(RegisterRequest $request)
    {
        // 6桁のランダムな一時パスワードを生成
        $temporaryPassword = $this->generateTemporaryPassword();

        // 一時パスワードを保存
        $this->storeTemporaryPassword($request->email, $temporaryPassword);

        // メール送信
        $this->sendVerificationEmail($request->email, $temporaryPassword);

        // 成功メッセージを返す
        return response()->json(['message' => 'Temporary password sent, please verify']);
    }

    /**
     * ユーザー情報をデータベースに登録するメソッド
     * 
     * @param Request $request リクエストオブジェクト
     * @return \Illuminate\Http\JsonResponse JSON形式のレスポンスを返す
     */
    public function PushUserInfo(Request $request)
    {
        // 一時パスワードを確認
        $userVerification = $this->verifyTemporaryPassword($request);

        if (!$userVerification) {
            // パスワードが一致しない場合はエラーメッセージを返す
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        // ユーザーをデータベースに登録
        $this->registerUser($request);

        // 一時パスワードを削除
        $this->deleteTemporaryPassword($userVerification);

        // 成功メッセージを返す
        return response()->json(['message' => 'User registration successful']);
    }

    /**
     * 6桁のランダムな一時パスワードを生成するメソッド
     * 
     * @return string 生成された一時パスワード
     */
    protected function generateTemporaryPassword()
    {
        return Str::random(6);
    }

    /**
     * 一時パスワードをデータベースに保存するメソッド
     * 
     * @param string $email ユーザーのメールアドレス
     * @param string $temporaryPassword 生成された一時パスワード
     * @return void
     */
    protected function storeTemporaryPassword($email, $temporaryPassword)
    {
        UserVerification::create([
            'email' => $email,
            'temporary_password' => $temporaryPassword,
            'created_at' => now(),
        ]);
    }

    /**
     * 一時パスワード確認用のメールを送信するメソッド
     * 
     * @param string $email ユーザーのメールアドレス
     * @param string $temporaryPassword 生成された一時パスワード
     * @return void
     */
    protected function sendVerificationEmail($email, $temporaryPassword)
    {
        Mail::to($email)->send(new WelcomeMail($temporaryPassword));
    }

    /**
     * ユーザーから送信された一時パスワードを確認するメソッド
     * 
     * @param Request $request リクエストオブジェクト
     * @return \App\Models\UserVerification|null 検証結果のモデルオブジェクト
     */
    protected function verifyTemporaryPassword(Request $request)
    {
        $verification = UserVerification::where('email', $request->email)
        ->where('temporary_password', $request->temporary_password)
        ->first();

        \Log::info('Request Data: ', ['email' => $request->email, 'temporary_password' => $request->temporary_password]);

    if (!$verification) {
        \Log::error('Verification failed for email: ' . $request->email);
    } else {
        \Log::info('Verification succeeded for email: ' . $request->email);
    }

    return $verification;
    }

    /**
     * ユーザーをデータベースに登録するメソッド
     * 
     * @param Request $request リクエストオブジェクト
     * @return \App\Models\User 登録されたユーザーモデルオブジェクト
     */
    protected function registerUser(Request $request)
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'provider' => 'google', // 必要に応じて他のプロバイダを追加
        ]);
    }

    /**
     * 一時パスワードをデータベースから削除するメソッド
     * 
     * @param \App\Models\UserVerification $userVerification 削除対象のモデルオブジェクト
     * @return void
     */
    protected function deleteTemporaryPassword($userVerification)
    {
        $userVerification->delete();
    }
}