<?php

class Sanitizer {
    /**
     * 入力データをサニタイジングする静的メソッド
     *
     * @param string $data サニタイジング対象の文字列
     * @param array $allowedTags 許可するHTMLタグの配列（例: ['<b>', '<i>']）
     * @return string サニタイジングされた文字列
     */
    public static function sanitizeString($data, $allowedTags = []) {
        // 余分なスペースをトリム（前後の空白を削除）
        $data = trim($data);

        // 特殊文字をHTMLエンティティに変換（XSS対策）
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');

        // 許可されたHTMLタグのみを残す
        if (!empty($allowedTags)) {
            $data = strip_tags($data, implode('', $allowedTags));
        } else {
            $data = strip_tags($data);
        }

        return $data;
    }

    /**
     * SQLインジェクション対策を行うメソッド
     *
     * @param string $data SQLクエリに使用される入力データ
     * @param PDO $pdo PDOインスタンス
     * @return string SQLインジェクション対策が施された文字列
     */
    public static function sanitizeForSQL($data, $pdo) {
        // SQLインジェクション対策として、PDOのquoteメソッドを使用
        return $pdo->quote($data);
    }

    /**
     * 複数の入力データをサニタイジングする静的メソッド
     *
     * @param array $dataArray サニタイジング対象の配列
     * @param array $allowedTags 許可するHTMLタグの配列
     * @return array サニタイジングされた配列
     */
    public static function sanitizeArray(array $dataArray, $allowedTags = []) {
        return array_map(function($item) use ($allowedTags) {
            return self::sanitizeString($item, $allowedTags);
        }, $dataArray);
    }
}