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
        
        try {
            $response = $client->post('https://api.openai.com/v1/images/generations', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'prompt' => 'A ' . $request->input('category') . ' in ' . $request->input('color') . ' color, size ' . $request->input('size'),
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