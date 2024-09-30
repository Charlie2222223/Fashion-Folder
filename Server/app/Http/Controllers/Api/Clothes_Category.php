<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClothesCategories;

class Clothes_Category extends Controller
{
    /**
     * 全てのClothesCategoriesを取得して返す
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // 全てのデータを取得
        $categories = ClothesCategories::all();

        // 取得したデータをJSON形式で返す
        return response()->json($categories);
    }
}
