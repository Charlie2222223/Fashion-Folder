<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\clothes_setups; // モデル名を適切に修正
use App\Models\Season;

class Clothes_SetupsController extends Controller
{
    /**
     * 全てのセットアップと関連する服のアイテムを取得して返す
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // 全てのセットアップとその関連するアイテム、カラー、サイズ、カテゴリを取得
        $setups = clothes_setups::with(['items.clothes.color', 'items.clothes.size', 'items.clothes.category'])->get();

        // 取得したデータをJSON形式で返す
        return response()->json(['setups' => $setups], 200);
    }

    /**
     * 季節ごとにランダムでセットアップを取得する
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSeasonalSetup(Request $request)
    {

    
        $seasonName = $request->input('season');
        $season = Season::where('season_name', $seasonName)->first();
    
        if (!$season) {
            return response()->json(['message' => '指定された季節が見つかりません'], 404);
        }
    
        $setup = clothes_setups::whereHas('seasons', function ($query) use ($season) {
            $query->where('season_id', $season->id);
        })->with(['items.clothes.color', 'items.clothes.size', 'items.clothes.category'])
          ->inRandomOrder()
          ->first();
    
        if (!$setup) {
            return response()->json(['message' => '指定された季節のセットアップが見つかりませんでした'], 404);
        }
    
        return response()->json(['setup' => $setup], 200);
    }

    /**
     * 指定されたセットアップを削除
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // 指定されたIDのセットアップを取得
        $setup = clothes_setups::find($id);

        // セットアップが存在しない場合のエラーハンドリング
        if (!$setup) {
            return response()->json(['message' => 'セットアップが見つかりませんでした。'], 404);
        }

        // セットアップを削除
        $setup->delete();

        // 削除成功のレスポンスを返す
        return response()->json(['message' => 'セットアップが削除されました。'], 200);
    }
}