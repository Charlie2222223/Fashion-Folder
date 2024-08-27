<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\WelcomeMail;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Utilities\Sanitizer;

class RegisterController extends Controller
{
    /**
     * Handle user registration or password reset request: Generates a temporary password and sends it via email.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleRegistration(Request $request)
    {
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));
        $this->processRegistration($sanitizedEmail);

        return response()->json(['message' => 'Temporary password sent, please verify']);
    }

    /**
     * Complete the user registration process by verifying the temporary password and saving user information.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function pushUserInfo(Request $request)
    {
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));
        $sanitizedName = $this->sanitizeInput($request->input('name'));
        $sanitizedTemporaryPassword = $this->sanitizeInput($request->input('temporary_password'));

        $userVerification = $this->verifyTemporaryPassword($sanitizedEmail, $sanitizedTemporaryPassword);

        if (!$userVerification) {
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        $user = $this->registerUser($sanitizedName, $sanitizedEmail, $request->password);
        $this->deleteTemporaryPassword($userVerification);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User registration successful',
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Verify the temporary password provided by the user.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkVerification(Request $request)
    {
        $sanitizedEmail = $this->sanitizeInput($request->input('email'));
        $sanitizedTemporaryPassword = $this->sanitizeInput($request->input('temporary_password'));

        $userVerification = $this->verifyTemporaryPassword($sanitizedEmail, $sanitizedTemporaryPassword);

        if (!$userVerification) {
            return response()->json(['message' => 'Invalid temporary password'], 400);
        }

        return response()->json(['message' => 'Password verification successful']);
    }

    /**
     * User registration: Handles the initial step by sending a temporary password via email.
     * 
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        return $this->handleRegistration($request);
    }

    /**
     * Handles the request for changing the password by sending a temporary password via email.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerPassword(Request $request)
    {
        return $this->handleRegistration($request);
    }

    /**
     * Sanitize input data.
     * 
     * @param string $input
     * @return string
     */
    protected function sanitizeInput($input)
    {
        return Sanitizer::sanitizeString($input);
    }

    /**
     * Process registration by generating, storing, and emailing a temporary password.
     * 
     * @param string $sanitizedEmail
     * @return void
     */
    protected function processRegistration($sanitizedEmail)
    {
        $temporaryPassword = $this->generateTemporaryPassword();
        $this->storeTemporaryPassword($sanitizedEmail, $temporaryPassword);
        $this->sendVerificationEmail($sanitizedEmail, $temporaryPassword);
    }

    /**
     * Verify the temporary password.
     * 
     * @param string $email
     * @param string $temporaryPassword
     * @return \App\Models\UserVerification|null
     */
    protected function verifyTemporaryPassword($email, $temporaryPassword)
    {
        return UserVerification::where('email', $email)
            ->where('temporary_password', $temporaryPassword)
            ->first();
    }

    /**
     * Register a new user.
     * 
     * @param string $name
     * @param string $email
     * @param string $password
     * @return \App\Models\User
     */
    protected function registerUser($name, $email, $password)
    {
        return User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'provider' => 'google',
        ]);
    }

    /**
     * Generate a 6-digit random temporary password.
     * 
     * @return string
     */
    protected function generateTemporaryPassword()
    {
        return Str::random(6);
    }

    /**
     * Store the temporary password in the database.
     * 
     * @param string $email
     * @param string $temporaryPassword
     * @return void
     */
    protected function storeTemporaryPassword($email, $temporaryPassword)
    {
        UserVerification::create([
            'email' => $email,
            'temporary_password' => $temporaryPassword,
            'created_at' => now(),
        ]);
    }

    /**
     * Send a verification email with the temporary password.
     * 
     * @param string $email
     * @param string $temporaryPassword
     * @return void
     */
    protected function sendVerificationEmail($email, $temporaryPassword)
    {
        Mail::to($email)->send(new WelcomeMail($temporaryPassword));
    }

    /**
     * Delete the temporary password from the database.
     * 
     * @param \App\Models\UserVerification $userVerification
     * @return void
     */
    protected function deleteTemporaryPassword($userVerification)
    {
        $userVerification->delete();
    }
}