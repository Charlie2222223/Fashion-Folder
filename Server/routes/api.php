<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ImageGenerationController;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserClosetController; // 追加

use App\Models\User;

Route::post('/register', [RegisterController::class, 'register']);                          //メールの送信

Route::post('/register/vertification', [RegisterController::class, 'PushUserInfo']);        //ユーザー登録

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUserData']);    //SignIn

Route::post('/login', [UserController::class, 'login']);                                    //Login

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {            //Logout
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
});

Route::middleware('auth:sanctum')->post('/upload/profile', [UserController::class, 'updateProfile']);   //アカウントの設定変更

Route::middleware('auth:sanctum')->post('/register/password', [RegisterController::class, 'registerPassword']);   //アカウントのパスワード変更のメールを送信

Route::middleware('auth:sanctum')->post('change/password/vertification', [RegisterController::class, 'checkVertification']);  //パスワードを変更

Route::middleware('auth:sanctum')->post('change/password/input', [UserController::class, 'passwordVertification']);  //パスワードを変更 

Route::get('/categories', [CategoryController::class, 'index']);  //服のカテゴリーをデータベースに追加

Route::post('/generate-image', [ImageGenerationController::class, 'generateImage']);

Route::post('/search-image', [ImageGenerationController::class, 'searchImage']);

Route::middleware('auth:sanctum')->post('/user-closet', [UserClosetController::class, 'store']);

Route::get('/user-closet', [UserClosetController::class, 'index']); // 追加

Route::put('/user-closet/{id}', [UserClosetController::class, 'update']);

Route::delete('/user-closet/{id}', [UserClosetController::class, 'destroy']);




