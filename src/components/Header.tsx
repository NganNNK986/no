import React from 'react';
import { BookOpen, Mic, Printer, Search, Sparkles, Volume2, Utensils, Columns, FileText } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeView: 'board' | 'script' | 'practice';
  setActiveView: (view: 'board' | 'script' | 'practice') => void;
  onPrint: () => void;
  titleFontSize: number;
  scriptFontSize: number;
  setTitleFontSize: (s: number) => void;
  playingItemIndex: number | null;
  onPlayFullScript: () => void;
  onStopAudio: () => void;
  isPlayingAudio: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
  onPrint,
  titleFontSize,
  scriptFontSize,
  onPlayFullScript,
  onStopAudio,
  isPlayingAudio,
}) => {
  return (
    <header className="bg-amber-950 text-amber-50 border-b border-amber-800/60 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Restaurant Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400/80 flex items-center justify-center shrink-0 shadow-inner">
              <Utensils className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-amber-100 font-serif drop-shadow-sm">
                  Quán Quê
                </h1>
                <span className="text-xs bg-amber-500/30 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded-full font-medium">
                  メニュー
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-300/90 font-light">
                Thực đơn tiếng Nhật & Kịch bản giao tiếp Hiragana (+ script)
              </p>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/70" />
              <input
                type="text"
                placeholder="Tìm món ăn hoặc kịch bản..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-amber-900/60 border border-amber-700/60 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-amber-100 placeholder-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </div>

            {/* View Modes Switcher */}
            <div className="flex items-center bg-amber-900/80 p-1 rounded-lg border border-amber-700/50">
              <button
                onClick={() => setActiveView('board')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  activeView === 'board'
                    ? 'bg-amber-500 text-amber-950 shadow-sm font-bold'
                    : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800/50'
                }`}
                title="Xem Menu 3 cột như bản vẽ"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Menu 3 Cột</span>
              </button>

              <button
                onClick={() => setActiveView('script')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  activeView === 'script'
                    ? 'bg-amber-500 text-amber-950 shadow-sm font-bold'
                    : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800/50'
                }`}
                title="Xem kịch bản tiếng Nhật đầy đủ"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Toàn Bộ Script</span>
              </button>

              <button
                onClick={() => setActiveView('practice')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  activeView === 'practice'
                    ? 'bg-amber-500 text-amber-950 shadow-sm font-bold'
                    : 'text-amber-200 hover:text-amber-100 hover:bg-amber-800/50'
                }`}
                title="Luyện nói phân vai (Roleplay)"
              >
                <Mic className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Luyện Nói</span>
              </button>
            </div>

            {/* Audio Speech Read All Button */}
            <button
              onClick={isPlayingAudio ? onStopAudio : onPlayFullScript}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                isPlayingAudio
                  ? 'bg-red-600 text-white border-red-400 animate-pulse'
                  : 'bg-amber-800/70 hover:bg-amber-700/80 text-amber-100 border-amber-600/60'
              }`}
              title={isPlayingAudio ? "Dừng đọc" : "Đọc tiếng Nhật tự động"}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Dừng đọc' : 'Đọc Audio'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={onPrint}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700/50 rounded-lg transition-colors"
              title="In menu hoặc lưu PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">In Menu</span>
            </button>
          </div>
        </div>

        {/* Font Size Specifications Bar (Honoring user's 4-size font rule) */}
        <div className="mt-3 pt-2 border-t border-amber-800/40 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-amber-300/80 gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-200">
              <Sparkles className="w-3 h-3 text-amber-400" /> Quy định cỡ chữ:
            </span>
            <span className="bg-amber-900/80 px-2 py-0.5 rounded border border-amber-700/40 text-amber-100 font-mono">
              Tên món: <strong className="text-amber-300">{titleFontSize}px</strong>
            </span>
            <span className="text-amber-400/60">•</span>
            <span className="bg-amber-900/80 px-2 py-0.5 rounded border border-amber-700/40 text-amber-100 font-mono">
              Script (+ script): <strong className="text-amber-300">{scriptFontSize}px</strong> (Nhỏ hơn 4 size)
            </span>
          </div>

          <div className="hidden sm:block text-amber-400/70 font-light italic">
            30 món Việt dịch sang tiếng Nhật • Kịch bản hiragana đầy đủ SCENE 4, 5, 8, 9, 10
          </div>
        </div>
      </div>
    </header>
  );
};
