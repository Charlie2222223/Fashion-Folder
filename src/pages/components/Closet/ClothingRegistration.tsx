import React, { useState } from "react";

interface ClothingItem {
  name: string;
  category: string;
  size: string;
  color: string;
  price: string;
  image: string | null;
}

const ClothingRegistration: React.FC = () => {
  const [formData, setFormData] = useState<ClothingItem>({
    name: "",
    category: "",
    size: "",
    color: "",
    price: "",
    image: null,
  });

  const [clothingList, setClothingList] = useState<ClothingItem[]>([]); // 登録された服のリスト

  const categories = ["Tシャツ", "パンツ", "ジャケット", "スカート", "ドレス", "スーツ", "アウター", "ジーンズ", "シャツ", "パーカー"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClothingList((prevList) => [...prevList, formData]);
    setFormData({ name: "", category: "", size: "", color: "", price: "", image: null });
  };

  return (
    <div>
      <div className="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
        <h1 className="mb-6 text-2xl font-bold">服を登録する</h1>
        <form onSubmit={handleSubmit} className="flex space-x-6">
          {/* 画像挿入エリア */}
          <div className="w-1/3">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Preview"
                className="object-cover w-full h-64 mb-4 border rounded-md dark:border-gray-600"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-64 mb-4 border rounded-md dark:border-gray-600">
                <span className="text-gray-500 dark:text-gray-300">画像を選択してください</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
          </div>

          {/* フォームエリア */}
          <div className="w-2/3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">服の名前</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">カテゴリ</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                    required
                >
                    <option value="">カテゴリを選択してください</option>
                    {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
                </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">サイズ</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">色</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">価格</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              追加する
            </button>
          </div>
        </form>

        {/* 登録された服のリスト */}
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-semibold dark:text-gray-300">登録された服</h2>
          <ul>
            {clothingList.map((item, index) => (
              <li key={index} className="p-4 mb-4 bg-gray-100 rounded-md shadow dark:bg-gray-700">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || ""}
                    alt={item.name}
                    className="object-cover w-20 h-20 rounded-md"
                  />
                  <div>
                    <p>名前: {item.name}</p>
                    <p>カテゴリ: {item.category}</p>
                    <p>サイズ: {item.size}</p>
                    <p>色: {item.color}</p>
                    <p>価格: {item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClothingRegistration;