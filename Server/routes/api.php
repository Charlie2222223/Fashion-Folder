<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Auth\RegisterController;

Route::post('/register', [RegisterController::class, 'register']);

Route::post('/register/vertification', [RegisterController::class, 'PushUserInfo']);

Route::post('/auth/user', [UserController::class, 'getUserData']);

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getGoogleUserData']);    //Google Login

Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);  //Logout