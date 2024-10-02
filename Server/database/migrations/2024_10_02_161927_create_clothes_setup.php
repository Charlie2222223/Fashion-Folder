<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // セットアップのメイン情報を保存するテーブル
        Schema::create('clothes_setups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); 
            $table->string('setup_name');
            $table->timestamps();

            // 外部キー制約（ユーザーが削除された場合に対応するセットアップも削除される）
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // 各セットアップに含まれる服を保存するテーブル
        Schema::create('clothes_setup_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('setup_id');  // セットアップのID
            $table->unsignedBigInteger('clothes_id');  // 服のID
            $table->timestamps();

            // 外部キー制約（セットアップが削除された場合に対応するアイテムも削除される）
            $table->foreign('setup_id')->references('id')->on('clothes_setups')->onDelete('cascade');
            $table->foreign('clothes_id')->references('id')->on('user_closets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clothes_setup_items');
        Schema::dropIfExists('clothes_setups');
    }
};