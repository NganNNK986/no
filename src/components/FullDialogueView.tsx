import React, { useState } from 'react';
import { RAW_SCRIPT_TEXT, ALL_DIALOGUE_LINES } from '../data/menuData';
import { Copy, Check, Volume2, BookOpen, Layers, Play } from 'lucide-react';
import { speakJapanese } from '../utils/audioSpeech';

export const FullDialogueView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSpeakerFilter, setActiveSpeakerFilter] = useState<string | null>(null);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(RAW_SCRIPT_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayScene = (sceneName: string) => {
    let textToPlay = '';
    if (sceneName === 'all') {
      textToPlay = ALL_DIALOGUE_LINES.map(l => l.text).join(' ');
    } else {
      // Find matching scene text
      textToPlay = RAW_SCRIPT_TEXT;
    }
    speakJapanese(textToPlay);
  };

  return (
    <div className="bg-stone-50 border border-amber-900/15 rounded-2xl p-4 sm:p-6 shadow-lg space-y-6 max-w-5xl mx-auto my-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/15">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-800" />
            <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-serif">
              Kịch Bản Giao Tiếp Tiếng Nhật Đầy Đủ (Chỉ Hiragana)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Nội dung kịch bản chuẩn cho quán Quán Quê bao gồm Scene 4, 5, 8, 9, 10
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handlePlayScene('all')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Đọc Toàn Bộ Audio</span>
          </button>

          <button
            onClick={handleCopyScript}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-semibold rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép Script'}</span>
          </button>
        </div>
      </div>

      {/* Speaker Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-stone-600">Lọc theo nhân vật:</span>
        <button
          onClick={() => setActiveSpeakerFilter(null)}
          className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
            activeSpeakerFilter === null
              ? 'bg-amber-900 text-white font-bold'
              : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
          }`}
        >
          Tất cả (All)
        </button>
        <button
          onClick={() => setActiveSpeakerFilter('てんいん')}
          className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
            activeSpeakerFilter === 'てんいん'
              ? 'bg-amber-500 text-amber-950 font-bold'
              : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
          }`}
        >
          てんいん (Nhân viên)
        </button>
        <button
          onClick={() => setActiveSpeakerFilter('FS')}
          className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
            activeSpeakerFilter === 'FS'
              ? 'bg-indigo-600 text-white font-bold'
              : 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
          }`}
        >
          FS (Chủ trì)
        </button>
        <button
          onClick={() => setActiveSpeakerFilter('A')}
          className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
            activeSpeakerFilter === 'A'
              ? 'bg-emerald-600 text-white font-bold'
              : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
          }`}
        >
          Aさん (Khách A)
        </button>
        <button
          onClick={() => setActiveSpeakerFilter('B')}
          className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
            activeSpeakerFilter === 'B'
              ? 'bg-purple-600 text-white font-bold'
              : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
          }`}
        >
          Bさん (Khách B)
        </button>
      </div>

      {/* Raw Script Text Output Display */}
      <div className="bg-amber-950 text-amber-100 p-4 sm:p-6 rounded-xl font-jp text-sm sm:text-base leading-relaxed overflow-x-auto whitespace-pre-wrap border border-amber-800 shadow-inner font-mono max-h-[600px] overflow-y-auto">
        {RAW_SCRIPT_TEXT}
      </div>

    </div>
  );
};
