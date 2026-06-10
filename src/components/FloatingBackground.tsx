/** biome-ignore-all lint/a11y/useMediaCaption: <explanation> */
'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Music, VolumeX } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isUnlockedRef = useRef(false); // Ref để theo dõi xem âm thanh đã được cấp quyền chưa

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ========================================================
    // BỘ MỞ KHÓA ÂM THANH TOÀN CẦU (GLOBAL AUDIO UNLOCKER)
    // ========================================================
    const audio = audioRef.current;
    
    if (audio) {
      audio.volume = 0.1;

      // Desktop: Cố gắng phát nhạc tự động nếu trình duyệt cho phép
      audio.play().catch(() => {
        // Mobile/iOS sẽ nhảy vào đây vì bị chặn Autoplay
      });

      const unlockAudio = (e: Event) => {
        if (isUnlockedRef.current) return;

        // Tránh xung đột: Nếu người dùng bấm thẳng vào nút Nhạc, để nút Nhạc tự lo
        const target = e.target as HTMLElement;
        if (target.closest('.music-toggle-btn')) return;

        isUnlockedRef.current = true; // Đánh dấu đã mở khóa thành công

        if (audio.paused) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => console.log("Silent unlock failed:", err));
          }
        }

        // Dọn dẹp sự kiện để không làm nặng web
        document.removeEventListener('touchstart', unlockAudio, { capture: true });
        document.removeEventListener('click', unlockAudio, { capture: true });
      };

      // Bẫy sự kiện ở lớp cao nhất (capture: true)
      document.addEventListener('touchstart', unlockAudio, { capture: true, passive: true });
      document.addEventListener('click', unlockAudio, { capture: true, passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchstart', unlockAudio, { capture: true });
        document.removeEventListener('click', unlockAudio, { capture: true });
      };
    }
  }, []);

  // ========================================================
  // XỬ LÝ NÚT BẤM VẬT LÝ TRỰC TIẾP (KHÔNG QUA STATE TRUNG GIAN)
  // ========================================================
  const toggleMusic = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn chặn các hành vi mặc định của trình duyệt
    
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // Thực thi play() trực tiếp ngay trong Event Listener
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Nút bấm bị iOS chặn:", err);
          // Phương án cứu cánh cuối cùng cho iOS
          audio.load();
          audio.play().catch(e => console.error("Lỗi hoàn toàn:", e));
        });
      }
    } else {
      audio.pause();
    }
  };

  const glowingOrbs = [
    { id: 'orb1', color: 'bg-pink-400', size: 'w-72 h-72', top: '-5%', left: '-5%', delay: 0 },
    { id: 'orb2', color: 'bg-rose-300', size: 'w-[500px] h-[500px]', top: '30%', left: '60%', delay: 2 },
    { id: 'orb3', color: 'bg-sky-200', size: 'w-80 h-80', top: '70%', left: '5%', delay: 4 },
  ];

  const characters = [
    { id: 'char1', emoji: '🧸', size: 'text-5xl', top: '15%', left: '8%', delay: 0, duration: 15 },
    { id: 'char2', emoji: '🐰', size: 'text-4xl', top: '75%', left: '85%', delay: 2, duration: 18 },
    { id: 'char3', emoji: '💌', size: 'text-3xl', top: '65%', left: '12%', delay: 5, duration: 12 },
    { id: 'char4', emoji: '🦋', size: 'text-3xl', top: '25%', left: '80%', delay: 1, duration: 10 },
    { id: 'char5', emoji: '🎈', size: 'text-4xl', top: '45%', left: '5%', delay: 7, duration: 20 },
    { id: 'char6', emoji: '🌷', size: 'text-3xl', top: '85%', left: '45%', delay: 3, duration: 14 },
  ];

  const particles = [
    { id: 'p1', Icon: Heart, size: 32, color: 'text-pink-500', top: '20%', left: '20%', delay: 0, blur: 'blur-0', opacity: 'opacity-60' },
    { id: 'p2', Icon: Sparkles, size: 28, color: 'text-yellow-500', top: '15%', left: '75%', delay: 1, blur: 'blur-0', opacity: 'opacity-80' },
    { id: 'p3', Icon: Heart, size: 40, color: 'text-red-400', top: '70%', left: '80%', delay: 2.5, blur: 'blur-0', opacity: 'opacity-50' },
    { id: 'p4', Icon: Star, size: 16, color: 'text-yellow-400', top: '30%', left: '50%', delay: 0.5, blur: 'blur-sm', opacity: 'opacity-40' },
    { id: 'p5', Icon: Heart, size: 20, color: 'text-pink-300', top: '80%', left: '30%', delay: 3, blur: 'blur-[2px]', opacity: 'opacity-50' },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* KHUNG NỀN */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#fff0f5] to-[#fdfbf7]">
        {glowingOrbs.map((orb) => (
          <motion.div key={orb.id} className={`absolute rounded-full ${orb.color} ${orb.size} opacity-20 mix-blend-multiply filter blur-[100px]`} style={{ top: orb.top, left: orb.left }} animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0], scale: [1, 1.1, 0.9, 1] }} transition={{ duration: 15, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }} />
        ))}
        {[...Array(15)].map((_, i) => (
          <motion.div key={`dust-${i}`} className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full blur-[1px] shadow-[0_0_10px_#fde047]" initial={{ top: '110%', left: `${Math.random() * 100}%` }} animate={{ top: '-10%', x: [0, Math.random() * 80 - 40, 0], opacity: [0, 0.8, 1, 0] }} transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }} />
        ))}
        {characters.map((char) => (
          <motion.div key={char.id} className={`absolute ${char.size} opacity-90 drop-shadow-2xl`} style={{ top: char.top, left: char.left }} animate={{ y: [0, -30, 0], x: [mousePos.x, mousePos.x + 15, mousePos.x - 15, mousePos.x], rotate: [-10, 10, -10] }} transition={{ duration: char.duration, repeat: Infinity, delay: char.delay, ease: "easeInOut" }} >{char.emoji}</motion.div>
        ))}
        {particles.map((el) => (
          <motion.div key={el.id} className={`absolute ${el.color} ${el.opacity} ${el.blur}`} style={{ top: el.top, left: el.left }} animate={{ y: [0, -20, 0], x: [-mousePos.x, -mousePos.x + 10, -mousePos.x - 10, -mousePos.x], rotate: [0, 45, -45, 0], scale: [1, 1.1, 0.9, 1] }} transition={{ duration: 8, repeat: Infinity, delay: el.delay, ease: "easeInOut" }} ><el.Icon size={el.size} fill={el.Icon === Heart || el.Icon === Star ? 'currentColor' : 'none'} /></motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div key={`petal-${i}`} className="absolute w-3 h-4 bg-pink-400/50 rounded-full blur-[1px] rounded-bl-none shadow-md" initial={{ top: '-10%', left: `${Math.random() * 100}%`, rotate: 0 }} animate={{ top: '110%', left: `${Math.random() * 100}%`, rotate: 360 }} transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }} />
        ))}
        {[...Array(4)].map((_, i) => (
          <motion.div key={`star-${i}`} className="absolute flex items-center pointer-events-none" initial={{ top: `${-10 + Math.random() * 30}%`, left: `${80 + Math.random() * 40}%`, rotate: -35 - Math.random() * 10 }} animate={{ top: `${100 + Math.random() * 20}%`, left: `${-20 - Math.random() * 20}%`, opacity: [0, 1, 1, 0] }} transition={{ duration: 2 + Math.random() * 1.5, repeat: Infinity, repeatDelay: 1 + Math.random() * 5, ease: "linear" }}>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-[0_0_20px_6px_#f472b6] z-10" />
            <div className="h-[2px] sm:h-[3px] w-[200px] sm:w-[300px] bg-gradient-to-l from-transparent via-pink-400 to-white -ml-[2px]" />
          </motion.div>
        ))}
      </div>

      {/* KHU VỰC ĐIỀU KHIỂN ÂM THANH */}
      <div className="fixed top-6 right-6 z-[100] pointer-events-auto">
        <audio 
          ref={audioRef} 
          src="/bgm.mp3" 
          playsInline // Bắt buộc cho iOS
          preload="auto" 
          loop
          onPlay={() => setIsPlaying(true)} // Đồng bộ State 1 chiều
          onPause={() => setIsPlaying(false)}
        />
        
        <button
          type="button"
          onClick={toggleMusic}
          className={`music-toggle-btn flex items-center justify-center w-12 h-12 rounded-full shadow-lg backdrop-blur-md border border-white/40 transition-all cursor-pointer select-none outline-none ${
            isPlaying 
              ? 'bg-[rgba(252,231,243,0.9)] text-[#db2777] shadow-[0_4px_6px_-1px_rgba(244,114,182,0.5)] scale-100 hover:scale-105' 
              : 'bg-[rgba(255,255,255,0.8)] text-[#9ca3af] scale-95 hover:scale-100'
          }`}
        >
          {isPlaying ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Music className="w-5 h-5" />
            </motion.div>
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>
    </>
  );
}