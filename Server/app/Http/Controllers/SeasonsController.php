<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Season;

class SeasonsController extends Controller
{
    /**
     * 全ての季節を取得して返す
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // 全てのデータを取得
        $seasons = Season::all();

        // 取得したデータをJSON形式で返す
        return response()->json($seasons,200);
    }
}
