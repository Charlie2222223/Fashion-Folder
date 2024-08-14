<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SetupWizardController;

Route::post('/generate-config', [SetupWizardController::class, 'generateConfig']);