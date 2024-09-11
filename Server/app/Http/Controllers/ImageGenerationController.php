<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ImageGenerationController extends Controller
{
    public function generateImage(Request $request)
    {
        $client = new Client();
        $apiKey = env('OPENAI_API_KEY');
        
        // フロントエンドから送信されたデータを取得
        $category = $request->input('category');
        $color = $request->input('color');
        $description = $request->input('description', '特にない'); // デフォルトで "特にない" と設定

        // プロンプトをバックエンドで生成
        $prompt = "服の画像を生成して。服の種類は{$category}で、服の色は{$color}、詳細: {$description}";

        try {
            $response = $client->post('https://api.openai.com/v1/images/generations', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'prompt' => $prompt, // 生成したプロンプトを使用
                    'n' => 1,
                    'size' => '512x512',
                ],
            ]);

            $body = json_decode((string)$response->getBody(), true);
            return response()->json(['imageUrl' => $body['data'][0]['url']]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to generate image: ' . $e->getMessage()], 500);
        }
    }
}