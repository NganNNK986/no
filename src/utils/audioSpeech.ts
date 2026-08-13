export const speakJapanese = (text: string, onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Clean raw speech text (remove character prefix if present)
  const cleanText = text.replace(/^(てんいん|FS|A|B):\s*/, '');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.9; // Slightly slower for clear learning pronunciation

  // Try to find a Japanese voice
  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang.includes('ja') || v.lang.includes('JP'));
  if (jaVoice) {
    utterance.voice = jaVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
