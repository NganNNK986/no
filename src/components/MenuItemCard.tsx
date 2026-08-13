import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Volume2, VolumeX, MessageSquare, Play } from 'lucide-react';
import { speakJapanese, stopSpeech } from '../utils/audioSpeech';

interface MenuItemCardProps {
  item: MenuItem;
  titleFontSize: number;
  scriptFontSize: number;
  highlightSpeaker?: string | null;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  titleFontSize,
  scriptFontSize,
  highlightSpeaker,
}) => {
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);

  const handlePlayLine = (lineText: string, index: number) => {
    setActiveLineIndex(index);
    speakJapanese(lineText, () => {
      setActiveLineIndex(null);
    });
  };

  const handlePlayAllItemScript = () => {
    const fullText = item.script.map(s => s.text).join(' ');
    setActiveLineIndex(-1); // -1 indicates full item script playing
    speakJapanese(fullText, () => {
      setActiveLineIndex(null);
    });
  };

  const getSpeakerStyle = (speaker: string) => {
    switch (speaker) {
      case 'てんいん':
        return {
          badge: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700',
          dot: 'bg-amber-500',
          label: '店員 (Staff)'
        };
      case 'FS':
        return {
          badge: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-700',
          dot: 'bg-indigo-500',
          label: 'FS (Chủ trì)'
        };
      case 'A':
        return {
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700',
          dot: 'bg-emerald-500',
          label: 'Aさん (Khách A)'
        };
      case 'B':
        return {
          badge: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-700',
          dot: 'bg-purple-500',
          label: 'Bさん (Khách B)'
        };
      default:
        return {
          badge: 'bg-stone-100 text-stone-900 border-stone-300',
          dot: 'bg-stone-500',
          label: speaker
        };
    }
  };

  return (
    <div className="bg-stone-50/90 border border-amber-900/15 rounded-xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 group">
      
      {/* Dish Header & Title */}
      <div className="flex items-start justify-between gap-2 pb-2 border-b border-amber-900/10">
        <div className="flex-1">
          {/* Dish Number & Vietnamese Name */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300/60 font-mono shrink-0">
              #{item.number}
            </span>
            <span 
              className="font-bold text-stone-900 tracking-tight leading-snug font-serif"
              style={{ fontSize: `${titleFontSize}px` }}
            >
              -{item.nameJa.split(' ')[0]} {/* Japanese menu key like -とり, -キノコ */}
            </span>
            {item.badge && (
              <span className="text-[10px] font-semibold bg-red-100 text-red-700 border border-red-200 px-1.5 py-0.2 rounded-full">
                {item.badge}
              </span>
            )}
          </div>

          {/* Full Name & Japanese Subtitle */}
          <div className="mt-0.5">
            <p className="text-xs font-semibold text-stone-700">
              {item.nameVi}
            </p>
            <p className="text-[11px] text-amber-900/70 font-medium italic">
              {item.nameJa}
            </p>
          </div>
        </div>

        {/* Price & Play Audio Button */}
        <div className="flex flex-col items-end shrink-0 gap-1">
          <span className="text-xs font-bold text-amber-900 bg-amber-200/60 border border-amber-300/80 px-2 py-0.5 rounded-md font-mono">
            {item.price}
          </span>
          <button
            onClick={handlePlayAllItemScript}
            className="p-1 rounded bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors flex items-center gap-1 text-[10px] font-medium"
            title="Đọc đoạn script này"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Phát 3 câu</span>
          </button>
        </div>
      </div>

      {/* Script Section (+ script) */}
      <div className="mt-2.5 pt-1 space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900/80 uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
          <span>+ script (Kịch bản hội thoại)</span>
        </div>

        {/* Speech Dialogue Lines */}
        <div className="space-y-1.5 pl-1.5 border-l-2 border-amber-400/40">
          {item.script.map((line, idx) => {
            const speakerStyle = getSpeakerStyle(line.speaker);
            const isHighlighted = highlightSpeaker && line.speaker === highlightSpeaker;
            const isPlayingThisLine = activeLineIndex === idx;

            return (
              <div
                key={idx}
                className={`p-2 rounded-lg border transition-all ${
                  isHighlighted
                    ? 'ring-2 ring-amber-500 bg-amber-100/80 border-amber-400'
                    : isPlayingThisLine
                    ? 'bg-amber-200/90 border-amber-400 shadow-sm'
                    : 'bg-white/90 border-amber-900/10 hover:border-amber-300'
                }`}
              >
                {/* Speaker Line Header */}
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.2 rounded border ${speakerStyle.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${speakerStyle.dot}`}></span>
                      {line.speaker}:
                    </span>
                    <span className="text-[10px] text-stone-500 hidden sm:inline">
                      ({speakerStyle.label})
                    </span>
                  </div>

                  <button
                    onClick={() => handlePlayLine(line.text, idx)}
                    className="p-1 hover:bg-amber-100 text-stone-500 hover:text-amber-900 rounded transition-colors shrink-0"
                    title="Nghe câu này"
                  >
                    <Play className={`w-3 h-3 ${isPlayingThisLine ? 'text-amber-600 fill-amber-600 animate-pulse' : ''}`} />
                  </button>
                </div>

                {/* Hiragana Speech Content - Strictly adhering to scriptFontSize (14px) */}
                <p 
                  className="text-stone-800 font-jp leading-snug pl-1 font-normal tracking-wide"
                  style={{ fontSize: `${scriptFontSize}px` }}
                >
                  {line.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
