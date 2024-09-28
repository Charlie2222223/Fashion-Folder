import React, { useEffect, useState } from "react";
import axios from "axios";

interface ClothingItem {
  id: number;
  name: string;
  category: string;
  size: string;
  color: string;
  price: number;
  description: string | null;
  image: string | null;
}

const OutfitSetup: React.FC = () => {
  const [clothingList, setClothingList] = useState<ClothingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]); // 選択された服

  useEffect(() => {
    fetchClothingList();
  }, []);

  const fetchClothingList = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("認証トークンがありません。ログインしてください。");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/user-closet", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setClothingList(response.data.clothes);
    } catch (error) {
      console.error("服のリストの取得に失敗しました", error);
    }
  };

  const handleToggleItem = (item: ClothingItem) => {
    setSelectedItems((prev) => {
      if (prev.some((selectedItem) => selectedItem.id === item.id)) {
        // すでに選択されている場合、削除
        return prev.filter((selectedItem) => selectedItem.id !== item.id);
      } else {
        // 選択されていない場合、追加
        return [...prev, item];
      }
    });
  };

  const handleSubmitOutfit = () => {
    console.log("選択した服:", selectedItems);
    // ここで選択した服をもとにコーディネートを保存または処理するロジックを追加
  };

  return (
    <div className="max-w-4xl p-4 mx-auto mt-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <h1 className="mb-4 text-xl font-bold">コーディネートをセットアップする</h1>

      {clothingList.length === 0 ? (
        <p>登録された服がありません。</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {clothingList.map((item) => (
            <div
              key={item.id}
              className={`p-4 bg-gray-100 rounded-md shadow cursor-pointer dark:bg-gray-700 ${
                selectedItems.some((selectedItem) => selectedItem.id === item.id) ? "bg-blue-100" : ""
              }`}
              onClick={() => handleToggleItem(item)}
            >
              <img src={item.image || ""} alt={item.name} className="object-cover w-32 h-32 rounded-md" />
              <div className="mt-2 text-center">
                <p className="font-bold">{item.name}</p>
                <p>カテゴリ: {item.category}</p>
                <p>サイズ: {item.size}</p>
                <p>色: {item.color}</p>
                <p>価格: ¥{item.price}</p>
                <p>詳細: {item.description || "特になし"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmitOutfit}
        className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        コーディネートを保存
      </button>
    </div>
  );
};

export default OutfitSetup;