<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Storage;
use App\Utilities\Sanitizer;

class UserController extends Controller
{
    /**
     * 現在認証されているユーザーのデータを取得し、JSONレスポンスとして返すメソッド
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * ユーザーがログインするためのメソッド
     * 
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        // リクエストから認証に必要な資格情報を取得
        $credentials = $request->only('email', 'password');

        // 資格情報が正しければ、ユーザーを認証
        if (Auth::attempt($credentials)) {
            // 認証されたユーザーを取得
            $user = Auth::user();
            // 認証トークンを作成
            $token = $user->createToken('user')->plainTextToken;

            // 認証トークンとユーザー情報をレスポンスとして返す
            return response()->json(['token' => $token, 'user' => $user]);
        }

        // 認証失敗時のレスポンス
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    /**
     * ユーザーのプロフィールを更新するメソッド
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(Request $request)
    {
        // リクエストのバリデーション
        $request->validate([
            'name' => 'sometimes|required|string|max:255', // 名前のバリデーション、'sometimes'でオプションにする
            'avatar' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif|max:2048', // 画像のバリデーション、'sometimes'でオプションにする
        ]);

        // 現在認証されているユーザーを取得
        $user = Auth::user();

        // 名前がリクエストに含まれている場合
        if ($request->has('name')) {
            // 名前のサニタイジング
            $sanitizedName = Sanitizer::sanitizeString($request->name);
            // ユーザーの名前を更新
            $user->name = $sanitizedName;
        }

        // アバター画像がリクエストに含まれている場合
        if ($request->hasFile('avatar')) {
            // 既存のアバター画像を削除
            if ($user->avatar) {
                Storage::delete('public/avatars/' . $user->avatar);
            }

            // 新しい画像を保存
            $avatarName = $user->id . '_avatar.' . $request->avatar->extension();
            $request->avatar->storeAs('public/avatars', $avatarName);

            // アバターURLのサニタイジング
            $sanitizedAvatarPath = Sanitizer::sanitizeString('storage/avatars/' . $avatarName);

            // ユーザーのアバター情報を更新
            $user->avatar = $sanitizedAvatarPath;
        }

        // ユーザー情報を保存
        $user->save();

        // 更新されたユーザー情報をレスポンスとして返す
        return response()->json([
            'message' => 'Profile updated successfully', 
            'name' => $user->name, 
            'avatar' => $user->avatar
        ]);
    }
}