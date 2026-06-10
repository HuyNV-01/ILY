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

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Bẫy âm thanh toàn cục cho iPhone
    const unlockAudio = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.play().catch(() => {
          // Bỏ qua lỗi âm thầm nếu trình duyệt vẫn cương quyết chặn
        });
      }
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
    };

    document.addEventListener('touchstart', unlockAudio, { once: true });
    document.addEventListener('click', unlockAudio, { once: true });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Xử lý nút bấm: Trực tiếp điều khiển Audio, KHÔNG set State ở đây nữa
  const toggleMusic = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Ngăn sự kiện chạm lan ra ngoài gây kẹt với unlockAudio
    
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((err) => {
        console.error("iOS chặn nút bấm:", err);
        // Fallback ép load lại dữ liệu nếu iOS làm nghẽn
        audio.load();
        audio.play().catch((e) => console.error("Vẫn lỗi:", e));
      });
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
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#fff0f5] to-[#fdfbf7]">
        {glowingOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full ${orb.color} ${orb.size} opacity-20 mix-blend-multiply filter blur-[100px]`}
            style={{ top: orb.top, left: orb.left }}
            animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0], scale: [1, 1.1, 0.9, 1] }}
            transition={{ duration: 15, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
          />
        ))}

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full blur-[1px] shadow-[0_0_10px_#fde047]"
            initial={{ top: '110%', left: `${Math.random() * 100}%` }}
            animate={{ top: '-10%', x: [0, Math.random() * 80 - 40, 0], opacity: [0, 0.8, 1, 0] }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          />
        ))}

        {characters.map((char) => (
          <motion.div
            key={char.id}
            className={`absolute ${char.size} opacity-90 drop-shadow-2xl`}
            style={{ top: char.top, left: char.left }}
            animate={{ y: [0, -30, 0], x: [mousePos.x, mousePos.x + 15, mousePos.x - 15, mousePos.x], rotate: [-10, 10, -10] }}
            transition={{ duration: char.duration, repeat: Infinity, delay: char.delay, ease: "easeInOut" }}
          >
            {char.emoji}
          </motion.div>
        ))}

        {particles.map((el) => (
          <motion.div
            key={el.id}
            className={`absolute ${el.color} ${el.opacity} ${el.blur}`}
            style={{ top: el.top, left: el.left }}
            animate={{ y: [0, -20, 0], x: [-mousePos.x, -mousePos.x + 10, -mousePos.x - 10, -mousePos.x], rotate: [0, 45, -45, 0], scale: [1, 1.1, 0.9, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay: el.delay, ease: "easeInOut" }}
          >
            <el.Icon size={el.size} fill={el.Icon === Heart || el.Icon === Star ? 'currentColor' : 'none'} />
          </motion.div>
        ))}
        
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute w-3 h-4 bg-pink-400/50 rounded-full blur-[1px] rounded-bl-none shadow-md"
            initial={{ top: '-10%', left: `${Math.random() * 100}%`, rotate: 0 }}
            animate={{ top: '110%', left: `${Math.random() * 100}%`, rotate: 360 }}
            transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
          />
        ))}

        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute flex items-center pointer-events-none"
            initial={{ top: `${-10 + Math.random() * 30}%`, left: `${80 + Math.random() * 40}%`, rotate: -35 - Math.random() * 10 }}
            animate={{ top: `${100 + Math.random() * 20}%`, left: `${-20 - Math.random() * 20}%`, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 1.5, repeat: Infinity, repeatDelay: 1 + Math.random() * 5, ease: "linear" }}
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-[0_0_20px_6px_#f472b6] z-10" />
            <div className="h-[2px] sm:h-[3px] w-[200px] sm:w-[300px] bg-gradient-to-l from-transparent via-pink-400 to-white -ml-[2px]" />
          </motion.div>
        ))}
      </div>

      <div className="fixed top-6 right-6 z-[100]">
        <audio 
          ref={audioRef} 
          src="/bgm.mp3" 
          playsInline 
          preload="auto" 
          loop
          // ĐÂY LÀ BÍ QUYẾT: Để Audio tự báo cáo trạng thái cho React
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <motion.button
          onClick={toggleMusic}
          // Thêm onTouchEnd để tương tác trên iPhone nhạy hơn
          onTouchEnd={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg backdrop-blur-md border border-white/40 transition-all cursor-pointer select-none"
          style={isPlaying ? { backgroundColor: 'rgba(252, 231, 243, 0.9)', color: '#db2777', boxShadow: '0 4px 6px -1px rgba(244, 114, 182, 0.5)' } : { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#9ca3af' }}
        >
          {isPlaying ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Music className="w-5 h-5" />
            </motion.div>
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </>
  );
}