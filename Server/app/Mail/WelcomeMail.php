<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $temporary_password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($temporary_password)
    {
        $this->temporary_password = $temporary_password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.welcome')
                    ->with([
                        'temporary_password' => $this->temporary_password,
                    ]);
    }
}