import React from 'react';
import { MenuCategory } from '../types';
import { MenuItemCard } from './MenuItemCard';

interface MenuColumnProps {
  category: MenuCategory;
  titleFontSize: number;
  scriptFontSize: number;
  searchQuery: string;
  highlightSpeaker?: string | null;
  isLastColumn?: boolean;
}

export const MenuColumn: React.FC<MenuColumnProps> = ({
  category,
  titleFontSize,
  scriptFontSize,
  searchQuery,
  highlightSpeaker,
  isLastColumn = false,
}) => {
  // Filter items by search query
  const filteredItems = category.items.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const inVi = item.nameVi.toLowerCase().includes(q);
    const inJa = item.nameJa.toLowerCase().includes(q);
    const inScript = item.script.some(s => s.text.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q));
    return inVi || inJa || inScript;
  });

  return (
    <div className={`flex-1 flex flex-col min-w-[300px] lg:min-w-0 ${
      !isLastColumn ? 'lg:border-r-2 lg:border-amber-900/20 lg:pr-6' : ''
    }`}>
      
      {/* Column Category Title Header */}
      <div className="bg-amber-900 text-amber-50 rounded-xl p-3 mb-4 shadow-md border border-amber-800 text-center sticky top-20 z-20">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight font-serif flex items-center justify-center gap-2">
          <span>{category.titleJa}</span>
        </h2>
        <div className="flex items-center justify-center gap-2 text-xs text-amber-200/90 font-medium mt-0.5">
          <span>{category.titleVi}</span>
          <span className="bg-amber-800 px-2 py-0.5 rounded-full text-[10px] font-mono border border-amber-700">
            {filteredItems.length} món
          </span>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4 flex-1">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              titleFontSize={titleFontSize}
              scriptFontSize={scriptFontSize}
              highlightSpeaker={highlightSpeaker}
            />
          ))
        ) : (
          <div className="p-6 text-center text-amber-900/60 bg-stone-100/60 rounded-xl border border-dashed border-amber-900/20">
            Không tìm thấy món ăn phù hợp trong mục này.
          </div>
        )}
      </div>

    </div>
  );
};
