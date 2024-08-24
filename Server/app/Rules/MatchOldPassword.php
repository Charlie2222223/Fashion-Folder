<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class MatchOldPassword implements Rule
{
    protected $email;

    public function __construct($email)
    {
        $this->email = $email;
    }

    public function passes($attribute, $value)
    {
        $user = User::where('email', $this->email)->first();

        if ($user) {
            return Hash::check($value, $user->password);
        }

        return false;
    }

    public function message()
    {
        return '入力されたパスワードは現在のパスワードと一致しません。';
    }
}