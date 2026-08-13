export interface ScriptLine {
  speaker: 'てんいん' | 'FS' | 'A' | 'B' | string;
  text: string;
  rawText: string;
}

export interface MenuItem {
  id: string;
  number: number;
  nameVi: string;
  nameJa: string;
  nameFurigana?: string;
  price: string;
  description?: string;
  script: ScriptLine[];
  categoryId: 'hotpot' | 'side' | 'drink';
  badge?: string;
}

export interface MenuCategory {
  id: 'hotpot' | 'side' | 'drink';
  titleJa: string;
  titleVi: string;
  emoji: string;
  items: MenuItem[];
}
