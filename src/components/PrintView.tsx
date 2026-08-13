import React from 'react';
import { MENU_CATEGORIES } from '../data/menuData';

export const PrintView: React.FC = () => {
  return (
    <div className="bg-white text-stone-900 p-8 max-w-6xl mx-auto border border-stone-300 font-serif print:border-none print:p-0">
      
      {/* Restaurant Header matching sketch */}
      <div className="text-center mb-8 border-b-2 border-stone-900 pb-4">
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-stone-900 tracking-wider">
          Quán Quê
        </h1>
        <p className="text-sm text-stone-600 mt-1 italic">
          THỰC ĐƠN BẢN VẼ TỰ NHIÊN — Menu tiếng Nhật & Kịch bản Hiragana (+ script)
        </p>
      </div>

      {/* 3 Columns matching hand-drawn sketch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x-2 divide-stone-900">
        {MENU_CATEGORIES.map((cat, catIdx) => (
          <div key={cat.id} className={`${catIdx > 0 ? 'md:pl-6 pt-6 md:pt-0' : ''}`}>
            {/* Category Header */}
            <div className="text-center mb-6 border-b border-stone-400 pb-2">
              <h2 className="text-xl font-extrabold text-stone-900 font-jp">
                {cat.titleJa}
              </h2>
              <p className="text-xs text-stone-600 font-sans">{cat.titleVi}</p>
            </div>

            {/* 10 Items */}
            <div className="space-y-6">
              {cat.items.map((item) => (
                <div key={item.id} className="border-b border-stone-200 pb-4">
                  {/* Dish Title - 18px */}
                  <div className="flex items-baseline justify-between gap-2">
                    <span 
                      className="font-bold text-stone-900 font-jp"
                      style={{ fontSize: '18px' }}
                    >
                      -{item.nameJa.split(' ')[0]} ({item.nameVi})
                    </span>
                    <span className="font-mono text-xs font-semibold text-stone-700">
                      {item.price}
                    </span>
                  </div>

                  {/* + script section - 14px */}
                  <div className="mt-2 pl-3 border-l-2 border-stone-800 space-y-1">
                    <div className="text-[11px] font-bold text-stone-500 uppercase">
                      + script
                    </div>
                    {item.script.map((line, lIdx) => (
                      <div key={lIdx} className="text-stone-800 font-jp leading-tight" style={{ fontSize: '14px' }}>
                        <strong className="text-stone-900">{line.speaker}:</strong> {line.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-stone-300 text-center text-xs text-stone-500 font-sans">
        Quán Quê Menu • 30 món Việt dịch sang tiếng Nhật • Phân chia 3 câu script/món đầy đủ 100%
      </div>
    </div>
  );
};
