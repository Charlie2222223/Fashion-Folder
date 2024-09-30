<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClothesSizes;

class ClothesSizesController extends Controller
{
    /**
     * 全てのClothesCategoriesを取得して返す
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // 全てのデータを取得
        $sizes = ClothesSizes::all();

        // 取得したデータをJSON形式で返す
        return response()->json($sizes,200);
    }
}
    