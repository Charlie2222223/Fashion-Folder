<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserCloset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UserClosetController extends Controller
{
    /**
     * 服を登録する
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // 認証ユーザーを取得
        $user = Auth::user();
        Log::info('Authenticated User:', ['user' => $user]);

        if (!$user) {
            Log::warning('Unauthorized access attempt');
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // バリデーションルールの定義
        $validator = Validator::make($request->all(), [
            'clothes_name' => 'required|string|max:255',
            'clothes_category' => 'required|string|max:255',
            'clothes_size' => 'required|string|max:10',
            'clothes_color' => 'required|string|max:50',
            'clothes_detail' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'image' => 'nullable|string', // Base64画像またはURLを受け取る場合
        ]);

        if ($validator->fails()) {
            Log::error('Validation Errors:', ['errors' => $validator->errors()]);
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 画像の処理（Base64から保存する場合）
        $imagePath = null;
        if ($request->image) {
            if (preg_match('/^data:image\/(\w+);base64,/', $request->image, $type)) {
                $data = substr($request->image, strpos($request->image, ',') + 1);
                $type = strtolower($type[1]); // jpg, png, gif

                if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                    Log::error('Invalid image type');
                    return response()->json(['message' => 'Invalid image type'], 400);
                }

                $data = base64_decode($data);
                if ($data === false) {
                    Log::error('Base64 decode failed');
                    return response()->json(['message' => 'Invalid image data'], 400);
                }

                $fileName = uniqid() . '.' . $type;
                $directory = public_path('images/clothes/');
                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                    Log::info('Created directory: ' . $directory);
                }

                $path = $directory . $fileName;
                if (file_put_contents($path, $data) === false) {
                    Log::error('Failed to save image to: ' . $path);
                    return response()->json(['message' => 'Failed to save image'], 500);
                }

                // 公開URLを生成
                $imagePath = 'images/clothes/' . $fileName;
                Log::info('Image saved to: ' . $imagePath);
            } elseif (filter_var($request->image, FILTER_VALIDATE_URL)) {
                // 画像がURLの場合、そのまま保存
                $imagePath = $request->image;
                Log::info('Image URL saved: ' . $imagePath);
            } else {
                Log::error('Invalid image format');
                return response()->json(['message' => 'Invalid image format'], 400);
            }
        }

        // データベースに保存
        try {
            $clothes = UserCloset::create([
                'user_id' => $user->id,
                'clothes_name' => $request->clothes_name,
                'clothes_category' => $request->clothes_category,
                'clothes_size' => $request->clothes_size,
                'clothes_color' => $request->clothes_color,
                'clothes_detail' => $request->clothes_detail,
                'price' => $request->price,
                'image' => $imagePath,
            ]);

            Log::info('Clothes registered successfully:', ['clothes' => $clothes]);

            return response()->json(['message' => 'Clothes registered successfully', 'clothes' => $clothes], 201);
        } catch (\Exception $e) {
            // エラーログに記録
            Log::error('Error registering clothes: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
}