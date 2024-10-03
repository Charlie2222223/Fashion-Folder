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

        // 'clothes_setups' テーブルに外部キーとして季節を追加
        Schema::table('clothes_setups', function (Blueprint $table) {
            $table->unsignedBigInteger('season_id')->nullable()->after('setup_name');
            $table->foreign('season_id')->references('id')->on('seasons')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // 'clothes_setups' テーブルから外部キーとカラムを削除
        Schema::table('clothes_setups', function (Blueprint $table) {
            $table->dropForeign(['season_id']);
            $table->dropColumn('season_id');
        });

        // 'seasons' テーブルを削除
        Schema::dropIfExists('seasons');
    }
};