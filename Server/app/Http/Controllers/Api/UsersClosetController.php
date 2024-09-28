<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserCloset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersClosetController extends Controller
{
    // ユーザーのクローゼット内の服を取得する
    public function index()
    {
        $user = Auth::user();

        // 認証ユーザーのクローゼットアイテムを取得
        $clothes = UserCloset::where('user_id', $user->id)->with(['category', 'size', 'color'])->get();

        return response()->json($clothes, 200);
    }

    // ユーザーのクローゼットに服を追加する
    public function store(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'clothes_name' => 'required|string|max:255',
            'clothes_category_id' => 'required|exists:clothes_categories,id',
            'clothes_size_id' => 'required|exists:clothes_size,id',
            'clothes_color_id' => 'required|exists:clothes_color,id',
            'clothes_detail' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string',
        ]);

        // クローゼットにアイテムを追加
        $closetItem = UserCloset::create([
            'user_id' => $user->id,
            'clothes_name' => $validatedData['clothes_name'],
            'clothes_category_id' => $validatedData['clothes_category_id'],
            'clothes_size_id' => $validatedData['clothes_size_id'],
            'clothes_color_id' => $validatedData['clothes_color_id'],
            'clothes_detail' => $validatedData['clothes_detail'],
            'price' => $validatedData['price'],
            'image' => $validatedData['image'],
        ]);

        return response()->json(['message' => 'Item added successfully', 'clothes' => $closetItem], 201);
    }
}