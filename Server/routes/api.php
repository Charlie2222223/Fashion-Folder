<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Auth;

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUserData']);    //Login

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {            //Logout
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
});
