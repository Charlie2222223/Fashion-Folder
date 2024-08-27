<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class MatchNewPassword implements Rule
{
    protected $email;

    /**
     * コンストラクタ
     * 
     * @param string $email ユーザーのメールアドレス
     */
    public function __construct($email)
    {
        $this->email = $email;
    }

    /**
     * バリデーションが成功するかどうかを判定するメソッド
     * 
     * @param string $attribute バリデーション中の属性名
     * @param mixed $value 入力されたパスワードの値
     * @return bool パスワードが一致すればtrue、そうでなければfalse
     */
    public function passes($attribute, $value)
    {
        // ユーザーのメールアドレスでデータベースからパスワードを取得
        $user = User::where('email', $this->email)->first();

        // ユーザーが存在しない場合、バリデーション失敗
        if (!$user) {
            return false;
        }

        // 入力されたパスワードが現在のパスワードと一致しないことを確認
        return !Hash::check($value, $user->password);
    }

    /**
     * バリデーションに失敗した場合のエラーメッセージを返すメソッド
     * 
     * @return string エラーメッセージ
     */
    public function message()
    {
        return response()->json(['email' => $this->email]);
    }
}