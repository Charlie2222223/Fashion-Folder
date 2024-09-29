<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations (削除→再作成処理).
     *
     * @return void
     */
    public function up()
    {
        // user_closets テーブルが存在する場合に削除
        Schema::dropIfExists('user_closets');

        // user_closets テーブルを新しく作成
        Schema::create('user_closets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('clothes_category'); // 外部キー用にunsignedBigIntegerに変更
            $table->unsignedBigInteger('clothes_size');     // 外部キー用にunsignedBigIntegerに変更
            $table->unsignedBigInteger('clothes_color');    // 外部キー用にunsignedBigIntegerに変更
            $table->string('clothes_name');
            $table->text('clothes_detail')->nullable();
            $table->decimal('price', 8, 2);
            $table->string('image');
            $table->timestamps();
        
            // 外部キー制約
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('clothes_category')->references('id')->on('clothes_categories')->onDelete('cascade');
            $table->foreign('clothes_size')->references('id')->on('clothes_sizes')->onDelete('cascade');
            $table->foreign('clothes_color')->references('id')->on('clothes_colors')->onDelete('cascade');
        });
    }

        /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_closets', function (Blueprint $table) {
            // 外部キー制約の削除
            $table->dropForeign(['user_id']);
            $table->dropForeign(['clothes_category']);
            $table->dropForeign(['clothes_size']);
            $table->dropForeign(['clothes_color']);
        });

        Schema::dropIfExists('user_closets');
    }
};