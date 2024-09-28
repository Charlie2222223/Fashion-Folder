import React, { useState, useEffect } from "react";
import axios from "axios";

interface ClothingItem {
  name: string;
  category: string;
  size: string;
  color: string;
  price: string;
  description: string | null;
  image: string | null;
}

const ClothingRegistration: React.FC = () => {
  const [formData, setFormData] = useState<ClothingItem>({
    name: "",
    category: "",
    size: "",
    color: "",
    price: "",
    description: null,
    image: null,
  });

  const [clothingList, setClothingList] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageResults, setImageResults] = useState<string[]>([]); // 画像検索結果
  const [searchKeyword, setSearchKeyword] = useState(""); // 画像検索用のキーワード
  const [activeTab, setActiveTab] = useState<"upload" | "generate">("upload"); // タブの状態
  const [aiGenerating, setAiGenerating] = useState(false); // AI生成中の状態

  const categories = ["Tシャツ", "パンツ", "ジャケット", "スカート", "ドレス", "スーツ", "アウター", "ジーンズ", "シャツ", "パーカー"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const colors = ["赤色","青色","黄色","緑色","茶色","グレー","紺色","紫色","オレンジ色","黒色","白色"];

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // クライアントサイドでのみ実行
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // AI画像生成処理 (Laravel APIを使用)
  const handleImageGeneration = async () => {
    if (!token) {
      console.error("認証トークンがありません。ログインしてください。");
      return;
    }

    setAiGenerating(true);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/generate-image",
        {
          category: formData.category,
          color: formData.color,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const imageUrl = response.data.imageUrl;
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("AI画像生成に失敗しました", error);
    } finally {
      setAiGenerating(false);
      setLoading(false);
    }
  };

  // Laravel APIを使用して画像を検索する
  const searchSampleImages = async () => {
    if (!token) {
      console.error("認証トークンがありません。ログインしてください。");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/search-image",
        {
          keyword: searchKeyword || "clothing",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const images = response.data.images;
      setImageResults(images);
    } catch (error) {
      console.error("画像検索に失敗しました", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.error("認証トークンがありません。ログインしてください。");
      return;
    }

    try {
      // バックエンドAPIにフォームデータを送信
      const response = await axios.post(
        "http://localhost:8000/api/user-closet",
        {
          clothes_name: formData.name,
          clothes_category: formData.category,
          clothes_size: formData.size,
          clothes_color: formData.color,
          clothes_detail: formData.description == "" ? "特になし" : formData.description,
          price: parseInt(formData.price, 10),
          image: formData.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // レスポンスから登録されたデータを取得してリストに追加
      const registeredClothes = response.data.clothes;
      setClothingList((prevList) => [...prevList, registeredClothes]);

      // フォームをリセット
      setFormData({ name: "", category: "", size: "", color: "", price: "", description: null, image: null });
    } catch (error) {
      console.error("服の登録に失敗しました", error);
    }
  };

  // トークンが取得されるまで待機
  if (token === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-4xl p-4 mx-auto mt-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white sm:p-6">
        <h1 className="mb-4 text-xl font-bold sm:text-2xl">服を登録する</h1>

        {/* 右上に検索フィールド */}
        <div className="flex flex-col items-center mb-4 space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="検索キーワードを入力"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white sm:w-auto"
          />
          <button
            type="button"
            onClick={searchSampleImages}
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md sm:w-auto"
            disabled={loading}
          >
            画像を検索する
          </button>
        </div>

        {/* タブ切り替えエリア */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("upload")}
            className={`w-1/2 px-4 py-2 text-white ${activeTab === "upload" ? "bg-indigo-600" : "bg-gray-500"}`}
          >
            画像をアップロード
          </button>
          <button
            onClick={() => setActiveTab("generate")}
            className={`w-1/2 px-4 py-2 text-white ${activeTab === "generate" ? "bg-indigo-600" : "bg-gray-500"}`}
          >
            AIで画像を生成
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6">
          {/* アップロードまたは生成エリア */}
          <div className="sm:w-1/3">
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

            {activeTab === "upload" ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              />
            ) : (
              <button
                type="button"
                onClick={handleImageGeneration}
                className="w-full px-4 py-2 mb-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                disabled={aiGenerating}
              >
                AIで画像を生成する
              </button>
            )}

            {/* AI生成中のスピナー */}
            {aiGenerating && (
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
              </div>
            )}

            {/* 検索結果表示 */}
            {!loading && imageResults.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {imageResults.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`サンプル ${index}`}
                    className="object-cover w-full h-24 cursor-pointer"
                    onClick={() => setFormData((prev) => ({ ...prev, image: url }))}
                  />
                ))}
              </div>
            )}

            {/* 画像検索中のスピナー */}
            {loading && (
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* フォームエリア */}
          <div className="sm:w-2/3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">服の名前</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
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
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">サイズを選択してください</option>
                {sizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">色</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">色を選択してください</option>
                {colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">服の詳細説明</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                rows={4}
                placeholder="服のデザインやスタイルの詳細を入力してください"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">価格</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              登録する
            </button>
          </div>
        </form>

        {/* 登録された服のリスト */}
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-semibold dark:text-gray-300">登録された服</h2>
          <ul>
            {clothingList.map((item, index) => (
              <li key={index} className="p-4 mb-4 bg-gray-100 rounded-md shadow dark:bg-gray-700">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <img src={item.image || ""} alt={item.name} className="object-cover w-32 h-32 rounded-md" />
                  <div className="text-center sm:text-left">
                    <p>名前: {item.name}</p>
                    <p>カテゴリ: {item.category}</p>
                    <p>サイズ: {item.size}</p>
                    <p>色: {item.color}</p>
                    <p>価格: {item.price}</p>
                    <p>詳細: {item.description || "特にありません"}</p>
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