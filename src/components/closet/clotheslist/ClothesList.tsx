import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ModeToggle from './ModeToggle';
import FilterButton from './FilterButton';
import FilterModal from './FilterModal';
import ClothesGrid from './ClothesGrid';
import SetupsGrid from './SetupsGrid';
import TrashIcon from './TrashIcon';
import TrashModal from './TrashModal';
import { Category, Size, Color, Season, ClothingItem, Setup } from '../../../types/closet/clotheslist'; // 正しいパスに変更

const ClothesList: React.FC = () => {
  const [clothingList, setClothingList] = useState<ClothingItem[]>([]);
  const [setupList, setSetupList] = useState<Setup[]>([]);
  const [trashItems, setTrashItems] = useState<ClothingItem[]>([]);
  const [setupTrashItems, setSetupTrashItems] = useState<Setup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [draggedSetupId, setDraggedSetupId] = useState<number | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [isDragOverTrash, setIsDragOverTrash] = useState<boolean>(false);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedClothingItems, setSelectedClothingItems] = useState<number[]>([]);
  const [selectedSetupItems, setSelectedSetupItems] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  
  // フィルターの選択状態
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  
  // フィルターの適用状態
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeSize, setActiveSize] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [activeSeason, setActiveSeason] = useState<number | null>(null);
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'clothes' | 'setups'>('clothes');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    fetchClothingList();
    fetchSetupList();
    fetchCategories();
    fetchSizes();
    fetchColors();
    fetchSeasons();
  }, []);

  const fetchClothingList = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-closet`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setClothingList(response.data.clothes);
      setLoading(false);
    } catch (error) {
      console.error('服のリストの取得に失敗しました', error);
      setLoading(false);
    }
  };

  const fetchSetupList = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/setups`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSetupList(response.data.setups || []);
    } catch (error) {
      console.error('セットアップの取得に失敗しました', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("カテゴリの取得に失敗しました", error);
    }
  };

  const fetchSizes = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sizes`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setSizes(response.data);
    } catch (error) {
      console.error("サイズの取得に失敗しました", error);
    }
  };

  const fetchColors = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/colors`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setColors(response.data);
    } catch (error) {
      console.error("色の取得に失敗しました", error);
    }
  };

  const fetchSeasons = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seasons`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setSeasons(response.data);
    } catch (error) {
      console.error("季節の取得に失敗しました", error);
    }
  };

  const handleSelectClothingItem = (itemId: number) => {
    setSelectedClothingItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSelectSetupItem = (setupId: number) => {
    setSelectedSetupItems((prev) =>
      prev.includes(setupId) ? prev.filter((id) => id !== setupId) : [...prev, setupId]
    );
  };

  const handleDeleteSelectedItems = async () => {
    if (viewMode === 'clothes' && selectedClothingItems.length > 0) {
      for (const itemId of selectedClothingItems) {
        await handleDeletePermanently(itemId);
      }
      setSelectedClothingItems([]);
    }

    if (viewMode === 'setups' && selectedSetupItems.length > 0) {
      for (const setupId of selectedSetupItems) {
        await handleDeleteSetupPermanently(setupId);
      }
      setSelectedSetupItems([]);
    }

    // モバイル画面であればリロード
    if (isMobile) {
      window.location.reload();
    }
  };

  // ドラッグ操作（セットアップ用）
  const handleDragStartSetup = (e: React.DragEvent<HTMLDivElement>, setupId: number) => {
    setDraggedSetupId(setupId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // ドラッグ操作（服のアイテム用）
  const handleDragStartItem = (e: React.DragEvent<HTMLDivElement>, itemId: number) => {
    setDraggedItemId(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedSetupId(null);
    setDraggedItemId(null);
  };

  const handleDragOverTrash = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverTrash(true);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeaveTrash = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragOverTrash(false);
  };

  const handleDropOnTrash = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverTrash(false);

    // セットアップをゴミ箱に移動
    if (draggedSetupId !== null) {
      const setupToTrash = setupList.find((setup) => setup.id === draggedSetupId);
      if (setupToTrash) {
        setSetupTrashItems((prevTrash) => [...prevTrash, setupToTrash]);
        setSetupList((prevList) => prevList.filter((setup) => setup.id !== draggedSetupId));
        // バックエンドへの更新が必要な場合はここで行います
      }
      setDraggedSetupId(null);
    }

    // 服のアイテムをゴミ箱に移動
    if (draggedItemId !== null) {
      const itemToTrash = clothingList.find((item) => item.id === draggedItemId);
      if (itemToTrash) {
        setTrashItems((prevTrash) => [...prevTrash, itemToTrash]);
        setClothingList((prevList) => prevList.filter((item) => item.id !== draggedItemId));
        // バックエンドへの更新が必要な場合はここで行います
      }
      setDraggedItemId(null);
    }
  };

  const handleTrashIconClick = () => {
    setIsTrashModalOpen(true);
  };

  // セットアップを完全に削除
  const handleDeleteSetupPermanently = async (setupId: number) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/setups/${setupId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setSetupTrashItems((prevTrash) => prevTrash.filter((setup) => setup.id !== setupId));
      
    } catch (error) {
      console.error('セットアップの削除に失敗しました', error);
    }
  };

  // セットアップをゴミ箱から復元
  const handleRestoreSetup = (setupId: number) => {
    const setupToRestore = setupTrashItems.find((setup) => setup.id === setupId);
    if (setupToRestore) {
      setSetupList((prevList) => [...prevList, setupToRestore]);
      setSetupTrashItems((prevTrash) => prevTrash.filter((setup) => setup.id !== setupId));
    }
  };

  // 服のアイテムを完全に削除
  const handleDeletePermanently = async (itemId: number) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-closet/${itemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setTrashItems((prevTrash) => prevTrash.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('アイテムの削除に失敗しました', error);
    }
  };

  // 服のアイテムをゴミ箱から復元
  const handleRestoreItem = (itemId: number) => {
    const itemToRestore = trashItems.find((item) => item.id === itemId);
    if (itemToRestore) {
      setClothingList((prevList) => [...prevList, itemToRestore]);
      setTrashItems((prevTrash) => prevTrash.filter((item) => item.id !== itemId));
    }
  };

  // フィルターの適用
  const handleApplyFilter = () => {
    setActiveCategory(selectedCategory);
    setActiveSize(selectedSize);
    setActiveColor(selectedColor);
    setActiveSeason(selectedSeason);
    setIsFilterModalOpen(false);
  };

  // フィルターのクリア
  const handleClearFilters = () => {
    if (viewMode === 'clothes') {
      setSelectedCategory(null);
      setSelectedSize(null);
      setSelectedColor(null);
      setActiveCategory(null);
      setActiveSize(null);
      setActiveColor(null);
    } else if (viewMode === 'setups') {
      setSelectedSeason(null);
      setActiveSeason(null);
    }
  };

  // フィルタリングされた服のリストを useMemo で計算
  const filteredClothingList = useMemo(() => {
    return clothingList.filter((item) => {
      return (
        (activeCategory === null || item.category.id === activeCategory) &&
        (activeSize === null || item.size.id === activeSize) &&
        (activeColor === null || item.color.id === activeColor)
      );
    });
  }, [clothingList, activeCategory, activeSize, activeColor]);

  // フィルタリングされたセットアップのリストを useMemo で計算
  const filteredSetupList = useMemo(() => {
    return setupList.filter((setup) => {
      return (
        (activeSeason === null || setup.seasons.some(season => season.id === activeSeason))
      );
    });
  }, [setupList, activeSeason]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="relative">
      {/* ゴミ箱アイコン */}
      {!isMobile && (
        <TrashIcon
          isDragOverTrash={isDragOverTrash}
          handleDragOverTrash={handleDragOverTrash}
          handleDragLeaveTrash={handleDragLeaveTrash}
          handleDropOnTrash={handleDropOnTrash}
          openTrashModal={handleTrashIconClick}
        />
      )}

      <h1 className="mb-6 text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
        クローゼットの服一覧
      </h1>

      {/* 表示モード切り替えボタン */}
      <ModeToggle viewMode={viewMode} setViewMode={setViewMode} />

      {/* フィルターボタン */}
      <FilterButton viewMode={viewMode} openFilterModal={() => setIsFilterModalOpen(true)} />

      {/* フィルターモーダル */}
      {isFilterModalOpen && (
        <FilterModal
          viewMode={viewMode}
          categories={categories}
          sizes={sizes}
          colors={colors}
          seasons={seasons}
          selectedCategory={selectedCategory}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          selectedSeason={selectedSeason}
          setSelectedCategory={setSelectedCategory}
          setSelectedSize={setSelectedSize}
          setSelectedColor={setSelectedColor}
          setSelectedSeason={setSelectedSeason}
          applyFilter={handleApplyFilter}
          clearFilter={handleClearFilters}
          closeModal={() => setIsFilterModalOpen(false)}
        />
      )}

      {/* 服一覧ビュー */}
      {viewMode === 'clothes' && (
        <>
          {filteredClothingList.length === 0 ? (
            <div className="flex items-center justify-center min-h-screen pb-40">
              <p className="text-2xl text-center text-gray-800 dark:text-white">
                クローゼットに服がありません。
              </p>
            </div>
          ) : (
            <ClothesGrid
              clothingList={filteredClothingList}
              isMobile={isMobile}
              selectedClothingItems={selectedClothingItems}
              handleSelectClothingItem={handleSelectClothingItem}
              draggedItemId={draggedItemId}
              handleDragStartItem={handleDragStartItem}
              handleDragEnd={handleDragEnd}
            />
          )}

          {/* 服の削除ボタン（モバイルのみ表示） */}
          {isMobile && selectedClothingItems.length > 0 && (
            <button
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
              onClick={handleDeleteSelectedItems}
            >
              選択した服を削除
            </button>
          )}
        </>
      )}

      {/* セットアップ一覧ビュー */}
      {viewMode === 'setups' && (
        <>
          {filteredSetupList.length === 0 ? (
            <div className="flex items-center justify-center min-h-screen pb-40">
              <p className="text-2xl text-center text-gray-800 dark:text-white">
                セットアップがありません。
              </p>
            </div>
          ) : (
            <SetupsGrid
              setupList={filteredSetupList}
              isMobile={isMobile}
              selectedSetupItems={selectedSetupItems}
              handleSelectSetupItem={handleSelectSetupItem}
              draggedSetupId={draggedSetupId}
              handleDragStartSetup={handleDragStartSetup}
              handleDragEnd={handleDragEnd}
            />
          )}

          {/* セットアップの削除ボタン（モバイルのみ表示） */}
          {isMobile && selectedSetupItems.length > 0 && (
            <button
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
              onClick={handleDeleteSelectedItems}
            >
              選択したセットアップを削除
            </button>
          )}
        </>
      )}

      {/* ゴミ箱モーダル */}
      <TrashModal
        isOpen={isTrashModalOpen}
        closeModal={() => setIsTrashModalOpen(false)}
        trashItems={trashItems}
        setupTrashItems={setupTrashItems}
        handleRestoreItem={handleRestoreItem}
        handleDeletePermanently={handleDeletePermanently}
        handleRestoreSetup={handleRestoreSetup}
        handleDeleteSetupPermanently={handleDeleteSetupPermanently}
      />
    </div>
  );
};

export default ClothesList;