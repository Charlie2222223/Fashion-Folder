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
        Schema::table('user_closets', function (Blueprint $table) {
            // 新しい外部キーを追加
            $table->unsignedBigInteger('clothes_color_id')->after('clothes_color');
            $table->unsignedBigInteger('clothes_category_id')->after('clothes_category');
            $table->unsignedBigInteger('clothes_size_id')->after('clothes_size');

            // 外部キー制約の追加
            $table->foreign('clothes_color_id')->references('id')->on('clothes_color')->onDelete('cascade');
            $table->foreign('clothes_category_id')->references('id')->on('clothes_categories')->onDelete('cascade');
            $table->foreign('clothes_size_id')->references('id')->on('clothes_size')->onDelete('cascade');

            // 既存のカラムを削除
            $table->dropColumn('clothes_color');
            $table->dropColumn('clothes_category');
            $table->dropColumn('clothes_size');
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
            // 外部キーの削除
            $table->dropForeign(['clothes_color_id']);
            $table->dropForeign(['clothes_category_id']);
            $table->dropForeign(['clothes_size_id']);

            // カラムの削除
            $table->dropColumn('clothes_color_id');
            $table->dropColumn('clothes_category_id');
            $table->dropColumn('clothes_size_id');

            // 元のカラムを復元
            $table->string('clothes_color');
            $table->string('clothes_category');
            $table->string('clothes_size');
        });
    }
};