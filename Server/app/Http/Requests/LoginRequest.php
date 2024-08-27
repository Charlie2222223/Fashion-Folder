<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\MatchOldPassword;

class LoginRequest extends FormRequest
{
    /**
     * 認可の設定を行うメソッド
     * このリクエストが全てのユーザーに許可されているかどうかを判定
     * 
     * @return bool
     */
    public function authorize()
    {
        return true; // 全てのユーザーにリクエストを許可
    }

    /**
     * バリデーションルールを定義するメソッド
     * リクエストで送信されたデータがどのようにバリデートされるかを指定
     * 
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required', 'string', 'email', 'max:255'], // メールアドレスのバリデーションルール
            'password' => ['required', 'string', 'min:8', new MatchOldPassword($this->email)], // パスワードのバリデーションルールとカスタムルール
        ];
    }

    /**
     * カスタムエラーメッセージを定義するメソッド
     * バリデーションに失敗したときに表示されるメッセージを指定
     * 
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'メールアドレスは必須です。', // メールアドレスが必須であることを示すメッセージ
            'email.email' => 'メールアドレスの形式が正しくありません。', // メールアドレスの形式が不正であることを示すメッセージ
            'password.required' => 'パスワードは必須です。', // パスワードが必須であることを示すメッセージ
            'password.min' => 'パスワードは8文字以上で入力してください。', // パスワードが8文字以上でなければならないことを示すメッセージ
            'password.match' => 'パスワードが以前のパスワードと一致しません。', // パスワードが以前のパスワードと一致しないことを示すメッセージ
        ];
    }
}