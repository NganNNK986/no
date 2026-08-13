import React, { useState } from 'react';
import { MENU_CATEGORIES } from './data/menuData';
import { Printer } from 'lucide-react';

const ScreenMenuItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shortJaName = item.nameJa.split(' (')[0];

  return (
    <div className="mb-8">
      <div className="font-bold text-lg text-stone-900">
        🇻🇳 {shortJaName}
      </div>
      <div className="text-stone-600 text-[15px] mb-2">
        {item.nameVi}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-stone-500 font-bold text-sm hover:text-stone-800 transition-colors flex items-center gap-1"
      >
        {isOpen ? '− Script' : '＋ Script'}
      </button>

      {isOpen && (
        <div className="mt-3 pl-4 border-l-2 border-stone-300 space-y-3">
          {item.script.map((line: any, idx: number) => (
            <div key={idx} className="text-[14px] text-stone-800 leading-relaxed">
              <span className="font-bold text-stone-900">{line.speaker}:</span> {line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PrintMenuItem = ({ item }: { item: any }) => {
  const shortJaName = item.nameJa.split(' (')[0];

  return (
    <div className="print-menu-item">
      <div className="print-dish-title">
        🇻🇳 {shortJaName}
      </div>
      <div className="print-dish-subtitle">
        {item.nameVi}
      </div>

      <div className="print-script-container">
        {item.script.map((line: any, idx: number) => (
          <div key={idx} className="print-script-line">
            <span className="print-script-speaker">{line.speaker}:</span> {line.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [printError, setPrintError] = useState(false);

  const handlePrint = () => {
    try {
      // Check if we are running in an iframe
      if (window.self !== window.top) {
        setPrintError(true);
      } else {
        window.print();
      }
    } catch (e) {
      setPrintError(true);
    }
  };

  return (
    <>
      {/* --- SCREEN LAYOUT --- */}
      <div className="screen-layout min-h-screen bg-[#FDFBF7] text-stone-900 font-sans p-6 sm:p-10 md:p-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16 lg:mb-24 relative">
            
            {/* Print Button */}
            <div className="absolute top-0 right-0 flex flex-col items-end">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg shadow-sm font-semibold transition-colors"
              >
                <Printer className="w-5 h-5" />
                <span>🖨️ 印刷 / Print</span>
              </button>
              
              {printError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-lg max-w-xs text-right shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="font-bold mb-1">⚠️ Không thể in từ cửa sổ xem trước (Preview)</p>
                  <p>Trình duyệt chặn tính năng in bên trong iframe. Vui lòng bấm vào nút <strong>"Open in new tab"</strong> (biểu tượng mũi tên mở rộng ở góc phải trên cùng của màn hình này) để mở tab mới và in bình thường.</p>
                </div>
              )}
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-3 tracking-wide">
              Quán Quê
            </h1>
            <h2 className="text-2xl md:text-3xl text-stone-800 mb-4 tracking-widest font-medium">
              クアン・クエ
            </h2>
            <p className="text-stone-600 italic text-lg">
              ベトナム伝統料理 & 日本語会話
            </p>
          </header>

          {/* 3 Column Menu Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16 divide-y-2 md:divide-y-0 md:divide-x-2 divide-stone-200">
            {MENU_CATEGORIES.map((category, index) => (
              <div key={category.id} className={index > 0 ? "pt-10 md:pt-0 md:pl-8 lg:pl-16" : ""}>
                <div className="mb-10 text-center md:text-left">
                  <h2 className="text-xl lg:text-2xl font-bold text-stone-900 inline-block border-b-2 border-stone-800 pb-2">
                    {category.titleJa}
                  </h2>
                </div>
                <div className="flex flex-col">
                  {category.items.map(item => (
                    <ScreenMenuItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PRINT LAYOUT --- */}
      <div className="print-layout">
        <header style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 2px 0', fontFamily: 'serif' }}>Quán Quê</h1>
          <h2 style={{ fontSize: '10px', fontWeight: '500', margin: '0 0 2px 0', letterSpacing: '1px' }}>クアン・クエ</h2>
          <p style={{ fontSize: '8px', fontStyle: 'italic', color: '#57534e', margin: 0 }}>ベトナム伝統料理 & 日本語会話</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {MENU_CATEGORIES.map((category, index) => (
            <div key={category.id} style={index > 0 ? { borderLeft: '1px solid #e5e7eb', paddingLeft: '8px' } : {}}>
              <div style={{ marginBottom: '6px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid #1c1917', paddingBottom: '2px', display: 'inline-block', margin: 0 }}>
                  {category.titleJa}
                </h2>
              </div>
              <div>
                {category.items.map(item => (
                  <PrintMenuItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
