<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class ImageGenerationController extends Controller
{
    protected $client;
    protected $pexelsApiKey;
    protected $openAiApiKey;
    protected $googleApiKey;

    public function __construct()
    {
        // Guzzleクライアントのインスタンス作成
        $this->client = new Client();
        // APIキーの取得
        $this->pexelsApiKey = env('PEXELS_API_KEY');
        $this->openAiApiKey = env('OPENAI_API_KEY');
        $this->googleApiKey = env('GOOGLE_API_KEY');
    }

    /**
     * AI画像生成処理
     */
    public function generateImage(Request $request)
    {
        $category = $request->input('category');
        $color = $request->input('color');
        $description = $request->input('description', '特にない');

        $prompt = "服だけの画像を作って　{$color}色の{$category}　この服の詳細は{$description}";

        try {
            $response = $this->client->post('https://api.openai.com/v1/images/generations', [
                'headers' => $this->getHeaders($this->openAiApiKey),
                'json' => [
                    'prompt' => $prompt,
                    'n' => 1,
                    'size' => '512x512',
                ],
            ]);

            $body = json_decode((string)$response->getBody(), true);
            return response()->json(['imageUrl' => $body['data'][0]['url']]);
        } catch (\Exception $e) {
            return $this->handleApiError('Failed to generate image', $e);
        }
    }

    /**
     * Pexels APIを使用した画像検索処理
     */
    public function searchImage(Request $request)
    {
        $keyword = $request->input('keyword', 'clothing');

        try {
            $translatedKeyword = $this->translateKeyword($keyword);

            $response = $this->client->get('https://api.pexels.com/v1/search', [
                'headers' => [
                    'Authorization' => $this->pexelsApiKey, // Bearer を外す
                ],
                'query' => [
                    'query' => $translatedKeyword,
                    'per_page' => 9,
                ]
            ]);

            $body = json_decode($response->getBody(), true);
            $images = array_map(fn($photo) => $photo['src']['medium'], $body['photos']);

            return response()->json([
                'success' => true,
                'images' => $images
            ]);
        } catch (\Exception $e) {

            return $this->handleApiError('画像検索に失敗しました', $e);
        }
    }

    /**
     * キーワードの翻訳処理
     */
    private function translateKeyword($keyword)
    {
        try {
            $response = $this->client->post('https://translation.googleapis.com/language/translate/v2', [
                'form_params' => [
                    'q' => $keyword,
                    'target' => 'en',
                    'key' => $this->googleApiKey,
                ]
            ]);

            $body = json_decode($response->getBody(), true);
            return $body['data']['translations'][0]['translatedText'];
        } catch (\Exception $e) {
            return $keyword; // 翻訳に失敗した場合は元のキーワードを返す
        }
    }

    /**
     * 共通のヘッダー情報を返す
     */
    private function getHeaders($apiKey)
    {
        return [
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ];
    }

    /**
     * APIエラーを処理する共通メソッド
     */
    private function handleApiError($message, \Exception $e)
    {
        return response()->json([
            'success' => false,
            'message' => $message . ': ' . $e->getMessage(),
        ], 500);
    }
}