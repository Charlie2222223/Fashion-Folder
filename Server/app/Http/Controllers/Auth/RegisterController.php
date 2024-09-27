<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\WelcomeMail;
use Illuminate\Http\Request;
// use App\Utilities\Sanitizer; // Sanitizerが存在しない場合はコメントアウト

class RegisterController extends Controller
{
    /**
     * ユーザー登録またはパスワードリセットリクエストを処理する。
     * 一時パスワードを生成し、メールで送信します。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleRegistration(Request $request)
    {
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));
        $this->processRegistration($sanitizedEmail);

        return response()->json(['message' => 'Temporary password sent, please verify']);
    }

    /**
     * ユーザー登録プロセスを完了する。
     * 一時パスワードを検証し、ユーザー情報を保存します。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function pushUserInfo(Request $request)
    {
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));
        $sanitizedName = $this->sanitizeInput($request->input('name'));
        $sanitizedTemporaryPassword = $this->sanitizeInput($request->input('temporary_password'));

        $userVerification = $this->verifyTemporaryPassword($sanitizedEmail, $sanitizedTemporaryPassword);

        if (!$userVerification) {
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        $user = $this->registerUser($sanitizedName, $sanitizedEmail, $request->password);
        $this->deleteTemporaryPassword($userVerification);

        // ユーザーにAPIトークンがない場合は生成
        if (!$user->api_token) {
            $user->api_token = bin2hex(random_bytes(30));
            $user->save();
        }

        return response()->json([
            'message'      => 'User registration successful',
            'access_token' => $user->api_token,
            'token_type'   => 'Bearer',
            'user'         => $user,
        ]);
    }

    /**
     * 一時パスワードを検証する。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkVerification(Request $request)
    {
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));
        $sanitizedTemporaryPassword = $this->sanitizeInput($request->input('temporary_password'));

        $userVerification = $this->verifyTemporaryPassword($sanitizedEmail, $sanitizedTemporaryPassword);

        if (!$userVerification) {
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        return response()->json(['message' => 'Password verification successful']);
    }

    /**
     * ユーザー登録：一時パスワードをメールで送信する初期ステップを処理します。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        return $this->handleRegistration($request);
    }

    /**
     * パスワード変更のリクエストを処理し、一時パスワードをメールで送信します。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerPassword(Request $request)
    {
        return $this->handleRegistration($request);
    }

    /**
     * 入力データをサニタイズする。
     *
     * @param string $input
     * @return string
     */
    protected function sanitizeInput($input)
    {
        // Sanitizerクラスが存在しない場合は、簡易的なサニタイズを行う
        return filter_var($input, FILTER_SANITIZE_STRING);
    }

    /**
     * 登録処理を行う：一時パスワードを生成し、保存し、メールで送信します。
     *
     * @param string $sanitizedEmail
     * @return void
     */
    protected function processRegistration($sanitizedEmail)
    {
        $temporaryPassword = $this->generateTemporaryPassword();
        $this->storeTemporaryPassword($sanitizedEmail, $temporaryPassword);
        $this->sendVerificationEmail($sanitizedEmail, $temporaryPassword);
    }

    /**
     * 一時パスワードを検証する。
     *
     * @param string $email
     * @param string $temporaryPassword
     * @return \App\Models\UserVerification|null
     */
    protected function verifyTemporaryPassword($email, $temporaryPassword)
    {
        return UserVerification::where('email', $email)
            ->where('temporary_password', $temporaryPassword)
            ->first();
    }

    /**
     * 新しいユーザーを登録する。
     *
     * @param string $name
     * @param string $email
     * @param string $password
     * @return \App\Models\User
     */
    protected function registerUser($name, $email, $password)
    {
        return User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => Hash::make($password),
            'provider' => 'email',
        ]);
    }

    /**
     * 6桁のランダムな一時パスワードを生成する。
     *
     * @return string
     */
    protected function generateTemporaryPassword()
    {
        return Str::random(6);
    }

    /**
     * 一時パスワードをデータベースに保存する。
     *
     * @param string $email
     * @param string $temporaryPassword
     * @return void
     */
    protected function storeTemporaryPassword($email, $temporaryPassword)
    {
        UserVerification::create([
            'email'             => $email,
            'temporary_password' => $temporaryPassword,
            'created_at'        => now(),
        ]);
    }

    /**
     * 一時パスワードを含む確認メールを送信する。
     *
     * @param string $email
     * @param string $temporaryPassword
     * @return void
     */
    protected function sendVerificationEmail($email, $temporaryPassword)
    {
        Mail::to($email)->send(new WelcomeMail($temporaryPassword));
    }

    /**
     * データベースから一時パスワードを削除する。
     *
     * @param \App\Models\UserVerification $userVerification
     * @return void
     */
    protected function deleteTemporaryPassword($userVerification)
    {
        $userVerification->delete();
    }
}