<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\clothes_setups; // モデル名を適切に修正

class Clothes_SetupsController extends Controller
{
    /**
     * 全てのセットアップと関連する服のアイテムを取得して返す
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // 全てのセットアップとその関連するアイテムを取得
        $setups = clothes_setups::with('items.clothes')->get();

        // 取得したデータをJSON形式で返す
        return response()->json(['setups' => $setups], 200);
    }
}