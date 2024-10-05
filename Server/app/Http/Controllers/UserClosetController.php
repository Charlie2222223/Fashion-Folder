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
            // 認証ユーザーのクローゼット内の服を取得し、関連データをロード
            $clothes = UserCloset::with(['category', 'size', 'color'])
                ->where('user_id', $user->id)
                ->get();
    
            return response()->json(['clothes' => $clothes], 200);
        } catch (\Exception $e) {
            Log::error(message: 'Error fetching clothes: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    // 服を登録する
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
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
            'image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 画像処理
        $imagePath = $this->processImage($request->image);

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

            return response()->json(['message' => 'Clothes registered successfully', 'clothes' => $clothes], 201);
        } catch (\Exception $e) {
            Log::error('Error registering clothes: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    // 服の更新
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
            'clothes_category' => 'required|string|max:255',
            'clothes_size' => 'required|string|max:10',
            'clothes_color' => 'required|string|max:50',
            'clothes_detail' => 'nullable|string',
            'price' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 画像処理
        $imagePath = $this->processImage($request->image, $clothes->image);

        $clothes->update([
            'clothes_name' => $request->clothes_name,
            'clothes_category' => $request->clothes_category,
            'clothes_size' => $request->clothes_size,
            'clothes_color' => $request->clothes_color,
            'clothes_detail' => $request->clothes_detail,
            'price' => $request->price,
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'Clothes updated successfully', 'clothes' => $clothes], 200);
    }

    // 服の削除
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

    // 画像処理関数
    private function processImage($image, $existingImage = null)
    {
        if (!$image) {
            return $existingImage;
        }

        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $data = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif

            $data = base64_decode($data);
            if ($data === false) {
                throw new \Exception('Invalid image data');
            }

            $fileName = uniqid() . '.' . $type;
            $directory = public_path('images/clothes/');
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            $path = $directory . $fileName;
            file_put_contents($path, $data);

            return 'images/clothes/' . $fileName;
        }

        if (filter_var($image, FILTER_VALIDATE_URL)) {
            return $image;
        }

        throw new \Exception('Invalid image format');
    }
}