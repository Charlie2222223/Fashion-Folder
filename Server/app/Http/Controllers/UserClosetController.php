<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserCloset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UserClosetController extends Controller
{
    // 服の一覧取得
    public function index(Request $request)
    {
        $user = Auth::guard('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $clothes = UserCloset::with(['category', 'color', 'size'])
                ->where('user_id', $user->id)
                ->get();

            return response()->json(['clothes' => $clothes], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching clothes: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

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
            'clothes_category_id' => 'required|exists:clothes_categories,id',
            'clothes_size_id' => 'required|exists:clothes_size,id',
            'clothes_color_id' => 'required|exists:clothes_color,id',
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
                'clothes_category_id' => $request->clothes_category_id,
                'clothes_size_id' => $request->clothes_size_id,
                'clothes_color_id' => $request->clothes_color_id,
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

    public function update(Request $request, $id)
    {
        $user = Auth::guard('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $clothes = UserCloset::where('user_id', $user->id)->where('id', $id)->first();

        if (!$clothes) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'clothes_name' => 'required|string|max:255',
            'clothes_category_id' => 'required|exists:clothes_categories,id',
            'clothes_size_id' => 'required|exists:clothes_size,id',
            'clothes_color_id' => 'required|exists:clothes_color,id',
            'clothes_detail' => 'nullable|string',
            'price' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clothes->update($request->all());

        return response()->json(['message' => 'Clothes updated successfully', 'clothes' => $clothes], 200);
    }

    public function destroy($id)
    {
        $user = Auth::guard('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $clothes = UserCloset::where('user_id', $user->id)->where('id', $id)->first();

        if (!$clothes) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $clothes->delete();

        return response()->json(['message' => 'Clothes deleted successfully'], 200);
    }
}