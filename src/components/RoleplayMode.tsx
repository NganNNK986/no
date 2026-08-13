import React, { useState } from 'react';
import { ALL_DIALOGUE_LINES } from '../data/menuData';
import { Volume2, ChevronRight, ChevronLeft, RotateCcw, User, CheckCircle2 } from 'lucide-react';
import { speakJapanese } from '../utils/audioSpeech';

export const RoleplayMode: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'てんいん' | 'FS' | 'A' | 'B'>('てんいん');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLine = ALL_DIALOGUE_LINES[currentIndex];
  const isMyTurn = currentLine.speaker === selectedRole;

  const handleNext = () => {
    if (currentIndex < ALL_DIALOGUE_LINES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const handleSpeakCurrent = () => {
    speakJapanese(currentLine.text);
  };

  return (
    <div className="bg-stone-50 border border-amber-900/15 rounded-2xl p-4 sm:p-6 shadow-lg max-w-4xl mx-auto my-6 space-y-6">
      
      {/* Title */}
      <div className="text-center space-y-2 border-b border-amber-900/10 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-serif">
          Chế Độ Luyện Nói Phân Vai (Japanese Roleplay)
        </h2>
        <p className="text-xs sm:text-sm text-stone-600">
          Chọn vai nhân vật của bạn và thực hành hội thoại nhà hàng từng câu một
        </p>
      </div>

      {/* Role Picker */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-amber-100/60 p-3 rounded-xl border border-amber-300/50">
        <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
          <User className="w-4 h-4 text-amber-700" /> Chọn vai của bạn:
        </span>
        <div className="flex flex-wrap gap-2">
          {(['てんいん', 'FS', 'A', 'B'] as const).map(role => {
            const roleLabels = {
              'てんいん': '店員 (Nhân viên)',
              'FS': 'FS (Chủ trì)',
              'A': 'Aさん (Khách A)',
              'B': 'Bさん (Khách B)'
            };
            return (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === role
                    ? 'bg-amber-900 text-amber-50 shadow-md scale-105'
                    : 'bg-white text-stone-700 border border-amber-300 hover:bg-amber-200/50'
                }`}
              >
                {roleLabels[role]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-stone-600 font-medium">
          <span>Câu {currentIndex + 1} / {ALL_DIALOGUE_LINES.length}</span>
          <span>{Math.round(((currentIndex + 1) / ALL_DIALOGUE_LINES.length) * 100)}% Hoàn thành</span>
        </div>
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-amber-600 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / ALL_DIALOGUE_LINES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Dialogue Card */}
      <div className={`p-6 rounded-2xl border-2 transition-all shadow-md ${
        isMyTurn
          ? 'bg-amber-50/90 border-amber-500 ring-4 ring-amber-400/20'
          : 'bg-white border-stone-200'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
            isMyTurn
              ? 'bg-amber-500 text-amber-950 font-mono shadow-sm'
              : 'bg-stone-200 text-stone-800'
          }`}>
            <User className="w-3.5 h-3.5" />
            Người nói: {currentLine.speaker} {isMyTurn ? '👉 (LƯỢT BẠN NÓI)' : ''}
          </span>

          <button
            onClick={handleSpeakCurrent}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold transition-colors"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Nghe mẫu</span>
          </button>
        </div>

        {/* Hiragana Dialogue Sentence */}
        <p className="text-xl sm:text-2xl font-bold font-jp text-stone-900 leading-relaxed my-4 p-4 bg-stone-50/80 rounded-xl border border-stone-200/80">
          {currentLine.text}
        </p>

        {isMyTurn && (
          <div className="mt-3 p-3 bg-amber-100/80 rounded-lg border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Hãy đọc to câu trên theo lượt vai nhân vật của bạn!</span>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 bg-stone-200 hover:bg-stone-300 disabled:opacity-40 text-stone-800 font-bold rounded-xl text-xs transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Câu trước
        </button>

        <button
          onClick={handleReset}
          className="p-2 text-stone-500 hover:text-stone-800 rounded-lg transition-colors"
          title="Bắt đầu lại"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === ALL_DIALOGUE_LINES.length - 1}
          className="flex items-center gap-1 px-5 py-2 bg-amber-900 hover:bg-amber-950 disabled:opacity-40 text-amber-50 font-bold rounded-xl text-xs shadow-md transition-colors"
        >
          Câu tiếp <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
