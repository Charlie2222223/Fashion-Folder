<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUserData']);

