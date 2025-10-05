export interface ProsConsItem {
  id: string;
  text: string;
  weight: number; // 1-5 scale
  type: 'pro' | 'con';
}

export interface ProsConsList {
  id: string;
  title: string;
  items: ProsConsItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ComparisonOption {
  id: string;
  name: string;
  score: number; // -5 to +5
}

export interface ComparisonList {
  id: string;
  title: string;
  description?: string;
  options: ComparisonOption[];
  createdAt: Date;
  updatedAt: Date;
}