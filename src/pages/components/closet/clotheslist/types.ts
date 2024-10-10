// types.ts または interfaces.ts ファイルを作成
export interface Category {
    id: number;
    category_name: string;
  }
  
  export interface Size {
    id: number;
    size_name: string;
  }
  
  export interface Color {
    id: number;
    color_name: string;
    color_code: string;
  }
  
  export interface Season {
    id: number;
    season_name: string;
  }
  
  export interface ClothingItem {
    id: number;
    clothes_name: string;
    category: Category;
    size: Size;
    color: Color;
    clothes_detail: string | null;
    price: string;
    image: string | null;
  }
  
  export interface Setup {
    id: number;
    setup_name: string;
    seasons: Season[]; // 複数の季節を保持
    items: {
      id: number;
      clothes: ClothingItem;
    }[];
  }