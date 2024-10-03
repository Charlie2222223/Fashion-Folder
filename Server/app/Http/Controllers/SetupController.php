<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clothes_setups;
use App\Models\Clothes_setup_items;

class SetupController extends Controller
{
    /**
     * コーディネートを保存するメソッド
     */
    public function store(Request $request)
    {
        // バリデーション
        $request->validate([
            'setup_name' => 'required|string|max:255',
            'selectedItems' => 'required|array',
            'selectedItems.*' => 'exists:user_closets,id', // 服のIDが存在するか確認
        ]);

        // 現在のユーザーを取得
        $user = $request->user();

        // セットアップ情報を保存
        $setup = new Clothes_setups();
        $setup->user_id = $user->id;
        $setup->setup_name = $request->input('setup_name');
        $setup->save();

        // セットアップアイテムを保存
        foreach ($request->input('selectedItems') as $clothesId) {
            $setupItem = new Clothes_setup_items();
            $setupItem->setup_id = $setup->id;
            $setupItem->clothes_id = $clothesId;
            $setupItem->save();
        }

        return response()->json(['message' => 'コーディネートが保存されました！'], 201);
    }
}
