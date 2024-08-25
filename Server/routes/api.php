<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Auth\RegisterController;

Route::post('/register', [RegisterController::class, 'register']);

Route::post('/register/vertification', [RegisterController::class, 'PushUserInfo']);

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUserData']);    //SignIn

Route::post('/login', [UserController::class, 'login']);                                    //Login

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {            //Logout
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
});

Route::middleware('auth:sanctum')->post('/upload/avatar', [UserController::class, 'uploadAvatar']);

Route::middleware('auth:sanctum')->post('/upload/name', [UserController::class, 'uploadName']);

