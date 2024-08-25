<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function getUserData(Request $request)
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

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('user')->plainTextToken;

            return response()->json(['token' => $token, 'user' => $user]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 画像のバリデーション
        ]);

        $user = Auth::user();
        if ($request->hasFile('avatar')) {
            // 既存のアバター画像を削除
            if ($user->avatar) {
                Storage::delete('public/avatars/' . $user->avatar);
            }

            // 新しい画像を保存
            $avatarName = $user->id . '_avatar.' . $request->avatar->extension();
            $request->avatar->storeAs('public/avatars', $avatarName);

            // ユーザーのアバター情報を更新
            $user->avatar = 'storage/avatars/' . $avatarName;
            $user->save();

            return response()->json(['message' => 'Avatar uploaded successfully', 'avatar' => $avatarName]);
        }

        return response()->json(['message' => 'Failed to upload avatar'], 500);
    }
    
    public function uploadName(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255', // 名前のバリデーション
        ]);

        $user = Auth::user();

            // ユーザーの名前更新
            $user->name = $request->name;
            $user->save();

            return response()->json(['message' => 'Name updated successfully', 'name' => $request->name]);
        }
    
}