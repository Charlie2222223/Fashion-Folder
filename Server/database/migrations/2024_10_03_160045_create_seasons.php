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
        // 季節を管理するテーブルを作成
        Schema::create('seasons', function (Blueprint $table) {
            $table->id();
            $table->string('season_name')->unique()->comment('季節名: 春、夏、秋、冬');
            $table->timestamps();
        });

        // 'clothes_setups' と 'seasons' の中間テーブルを作成
        Schema::create('clothes_setup_season', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('clothes_setup_id');
            $table->unsignedBigInteger('season_id');
            $table->timestamps();

            // 外部キー制約
            $table->foreign('clothes_setup_id')->references('id')->on('clothes_setups')->onDelete('cascade');
            $table->foreign('season_id')->references('id')->on('seasons')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // 'clothes_setup_season' テーブルを削除
        Schema::dropIfExists('clothes_setup_season');

        // 'seasons' テーブルを削除
        Schema::dropIfExists('seasons');
    }
};