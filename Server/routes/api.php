<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageGenerationController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserClosetController;
use App\Http\Controllers\ClothesCategoriesController;
use App\Http\Controllers\ClothesSizesController;
use App\Http\Controllers\ClothesColorsController;
use App\Http\Controllers\SetupController;

// ユーザー登録関連
Route::post('/register', [RegisterController::class, 'register']); // メールの送信
Route::post('/register/verification', [RegisterController::class, 'PushUserInfo']); // ユーザー登録
Route::middleware('auth:sanctum')->post('/register/password', [RegisterController::class, 'registerPassword']); // パスワード変更メール送信
Route::middleware('auth:sanctum')->post('change/password/verification', [RegisterController::class, 'checkVerification']); // パスワード変更
Route::middleware('auth:sanctum')->post('change/password/input', [UserController::class, 'passwordVerification']); // パスワード変更

// 認証関連
Route::post('/login', [UserController::class, 'login']); // Login
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) { // Logout
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out successfully']);
});
Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUserData']); // SignIn
Route::middleware('auth:sanctum')->post('/upload/profile', [UserController::class, 'updateProfile']); // アカウントの設定変更

// カテゴリー関連
Route::get('/categories', [ClothesCategoriesController::class, 'index']); // 服のカテゴリー一覧

// 画像生成関連
Route::post('/generate-image', [ImageGenerationController::class, 'generateImage']); // AIで画像生成
Route::post('/search-image', [ImageGenerationController::class, 'searchImage']); // 画像検索

// ユーザークローゼット関連
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user-closet', [UserClosetController::class, 'store']);  // クローゼットに追加
    Route::get('/user-closet', [UserClosetController::class, 'index']);   // クローゼット一覧
    Route::put('/user-closet/{id}', [UserClosetController::class, 'update']);  // クローゼット内アイテム更新
    Route::delete('/user-closet/{id}', [UserClosetController::class, 'destroy']);  // クローゼット内アイテム削除

    // カテゴリー、サイズ、色の取得
    Route::get('/sizes', [ClothesSizesController::class, 'index']);  
    Route::get('/colors', [ClothesColorsController::class, 'index']);
});

Route::middleware('auth:sanctum')->post('/outfit/save', [SetupController::class, 'store']);