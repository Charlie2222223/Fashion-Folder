<!DOCTYPE html>
<html>
<head>
    <title>仮パスワードのご案内</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 0;
            margin: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
            text-align: center;
        }

        p {
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
        }

        .password-box {
            font-weight: bold;
            font-size: 18px;
            color: #007bff;
            background-color: #e8f0fe;
            padding: 10px;
            text-align: center;
            border-radius: 4px;
            margin: 20px 0;
        }
    </style>
</head>
<body>  
    <div class="email-container">
        <h1>仮メールのご案内</h1>
        <p>以下は仮パスワードです。</p>
        <div class="password-box">
            <?php echo e($temporary_password); ?>

        </div>
    </div>
</body>
</html><?php /**PATH /var/www/resources/views/emails/welcome.blade.php ENDPATH**/ ?>