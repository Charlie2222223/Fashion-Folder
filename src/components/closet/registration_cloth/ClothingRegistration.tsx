import React, { useState, useEffect } from "react";
import axios from "axios";

interface ClothingItem {
  name: string;
  category: string;
  size: string;
  color: string; // id of the color
  price: string;
  description: string | null;
  image: string | null;
}

interface Category {
  id: number;
  category_name: string;
}

interface Size {
  id: number;
  size_name: string;
}

interface Color {
  id: number;
  color_name: string;
  color_code: string;
}

const ClothingRegistration: React.FC = () => {
  const [formData, setFormData] = useState<ClothingItem>({
    name: "",
    category: "",
    size: "",
    color: "", // Will hold the selected color id
    price: "",
    description: null,
    image: null,
  });

  const [clothingList, setClothingList] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageResults, setImageResults] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const [activeTab, setActiveTab] = useState<"upload" | "generate">("upload"); 
  const [aiGenerating, setAiGenerating] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 成功メッセージ用ステート
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 一般的なエラーメッセージ用ステート

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchSizes();
      fetchColors();
    }
  }, [token]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("カテゴリの取得に失敗しました", error);
    }
  };

  const fetchSizes = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sizes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSizes(response.data);
    } catch (error) {
      console.error("サイズの取得に失敗しました", error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/colors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setColors(response.data);
    } catch (error) {
      console.error("色の取得に失敗しました", error);
    }
  };

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

  const handleImageGeneration = async () => {
    if (!token) {
      console.error("認証トークンがありません。ログインしてください。");
      return;
    }

    setAiGenerating(true);
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generate-image`,
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
      setErrorMessage("AI画像生成に失敗しました。もう一度お試しください。");
    } finally {
      setAiGenerating(false);
      setLoading(false);
    }
  };

  const searchSampleImages = async () => {
    if (!token) {
      console.error("認証トークンがありません。ログインしてください。");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search-image`,
        {
          keyword: searchKeyword || "clothing",
        },
        {
          headers: {
            Authorization: `Bearer ${token}` },
      });
      setImageResults(response.data.images);
    } catch (error) {
      console.error("画像検索に失敗しました", error);
      setErrorMessage("画像検索に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.error("認証トークンがありません。ログインしてください。");
      setErrorMessage("認証トークンがありません。ログインしてください。");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-closet`,
        {
          clothes_name: formData.name,
          clothes_category: formData.category,
          clothes_size: formData.size,
          clothes_color: formData.color, // color_id will be sent here
          clothes_detail: formData.description || "特になし",
          price: parseInt(formData.price, 10),
          image: formData.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClothingList((prevList) => [...prevList, response.data.clothes]);
      setFormData({ name: "", category: "", size: "", color: "", price: "", description: null, image: null });
      setSuccessMessage("服の登録が完了しました！"); // 成功メッセージを設定

      // 成功メッセージを5秒後に自動で非表示にする
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error("服の登録に失敗しました", error);
      setErrorMessage("服の登録に失敗しました。もう一度お試しください。");
    }
  };

  if (token === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* 成功メッセージの表示 */}
      {successMessage && (
        <div className="fixed p-4 text-white bg-green-500 rounded shadow-lg top-4 right-4">
          {successMessage}
        </div>
      )}

      {/* 一般的なエラーメッセージの表示 */}
      {errorMessage && (
        <div className="fixed p-4 text-white bg-red-500 rounded shadow-lg top-4 right-4">
          {errorMessage}
        </div>
      )}

      <div className="max-w-4xl p-4 mx-auto mt-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white sm:p-6">
        <h1 className="mb-4 text-xl font-bold sm:text-2xl">服を登録する</h1>

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

            {aiGenerating && (
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
              </div>
            )}

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

            {loading && (
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
              </div>
            )}
          </div>

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
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
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
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.size_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">色</label>
              <div className="flex items-center">
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                  required
                >
                  <option value="">色を選択してください</option>
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}> {/* Use color.id here */}
                      {color.color_name}
                    </option>
                  ))}
                </select>

                <div
                  className="w-8 h-8 ml-4 border border-gray-300 rounded-full"
                  style={{ backgroundColor: colors.find(c => c.id === parseInt(formData.color))?.color_code || "transparent" }} // Show selected color's code
                />
              </div>
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
                type="number"
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
              disabled={loading} // ローディング中は無効化
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-3 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  登録中...
                </div>
              ) : (
                "登録する"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClothingRegistration;