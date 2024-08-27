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
use App\Utilities\Sanitizer;

class RegisterController extends Controller
{
    /**
     * ユーザー登録またはパスワード変更の処理: 一時パスワードを生成してメールで送信する
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleRegistration(Request $request)
    {
        // メールアドレスをサニタイズ
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));

        // 一時パスワードを生成し、メールで送信
        $this->processRegistration($sanitizedEmail);

        return response()->json(['message' => 'Temporary password sent, please verify']);
    }

    /**
     * ユーザー情報を登録し、最終的にユーザー登録を完了する
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function pushUserInfo(Request $request)
    {
        // 入力された情報をサニタイズ
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));
        $sanitizedName = $this->sanitizeInput($request->input('name'));
        $sanitizedTemporaryPassword = $this->sanitizeInput($request->input('temporary_password'));

        // 一時パスワードを検証
        $userVerification = $this->verifyTemporaryPassword($sanitizedEmail, $sanitizedTemporaryPassword);

        // 検証失敗時の処理
        if (!$userVerification) {
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        // ユーザーをデータベースに登録
<<<<<<< Updated upstream
        $user = $this->registerUser($sanitizedName, $sanitizedEmail, $request->password);
=======
        $user = $this->registerUser($request);
>>>>>>> Stashed changes

        // 一時パスワードをデータベースから削除
        $this->deleteTemporaryPassword($userVerification);

<<<<<<< Updated upstream
        // 認証トークンを生成して返却
        $token = $user->createToken('authToken')->plainTextToken;

=======
        // トークンを生成
        $token = $user->createToken('authToken')->plainTextToken;

        // 成功メッセージとトークンを返す
>>>>>>> Stashed changes
        return response()->json([
            'message' => 'User registration successful',
            'token' => $token,
            'user' => $user,
        ]);
<<<<<<< Updated upstream
    }

    public function checkVertification(Request $request){

        // 入力された情報をサニタイズ
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));
        $sanitizedTemporaryPassword = $this->sanitizeInput($request->input('temporary_password'));

        $userVerification = $this->verifyTemporaryPassword($sanitizedEmail, $sanitizedTemporaryPassword);

        // 検証失敗時の処理
        if (!$userVerification) {
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        return response()->json([
            'messege' => 'Complaete password',
        ]);

=======
>>>>>>> Stashed changes
    }

    /**
     * ユーザー登録の最初のステップ: 一時パスワードを生成してメールで送信する
     * 
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        return $this->handleRegistration($request);
    }

    /**
     * ユーザーがパスワードを変更する際の処理: 一時パスワードを生成してメールで送信する
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerPassword(Request $request)
    {
        return $this->handleRegistration($request);
    }

    /**
     * 入力データをサニタイズする
     * 
     * @param string $input
     * @return string
     */
    protected function sanitizeInput($input)
    {
        return Sanitizer::sanitizeString($input);
    }

    /**
     * 一時パスワードを生成し、データベースに保存し、メールで送信する処理を行う
     * 
     * @param string $sanitizedEmail
     * @return void
     */
    protected function processRegistration($sanitizedEmail)
    {
        // 6桁のランダムな一時パスワードを生成
        $temporaryPassword = $this->generateTemporaryPassword();

        // 一時パスワードをデータベースに保存
        $this->storeTemporaryPassword($sanitizedEmail, $temporaryPassword);

        // 一時パスワードを確認用メールで送信
        $this->sendVerificationEmail($sanitizedEmail, $temporaryPassword);
    }

    /**
     * 一時パスワードを検証する
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
     * ユーザーをデータベースに登録する
     * 
     * @param string $name
     * @param string $email
     * @param string $password
     * @return \App\Models\User
     */
    protected function registerUser($name, $email, $password)
    {
        return User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'provider' => 'google',  // プロバイダ情報を設定
        ]);
    }

    /**
     * 6桁のランダムな一時パスワードを生成する
     * 
     * @return string
     */
    protected function generateTemporaryPassword()
    {
        return Str::random(6);
    }

    /**
     * 一時パスワードをデータベースに保存する
     * 
     * @param string $email
     * @param string $temporaryPassword
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
     * 一時パスワード確認用のメールを送信する
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
     * 一時パスワードをデータベースから削除する
     * 
     * @param \App\Models\UserVerification $userVerification
     * @return void
     */
    protected function deleteTemporaryPassword($userVerification)
    {
        $userVerification->delete();
    }
}