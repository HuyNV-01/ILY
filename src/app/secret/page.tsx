// app/secret/page.tsx
'use client';

import { useState, useRef, } from 'react';
import { motion, } from 'framer-motion';
import { Heart,LockKeyhole } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SecretMessage() {
  const [isOpened, setIsOpened] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Tọa độ của vầng sáng (Spotlight)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleOpen = () => {
    if (!isOpened) {
      setIsOpened(true);
      
      setTimeout(() => {
        // Pháo hoa kết hợp trái tim rơi
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.4 },
          colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff'],
        });
        
        // Bắn thêm dải kim tuyến vàng
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#fbbf24', '#f59e0b']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#fbbf24', '#f59e0b']
        });
      }, 400); 
    }
  };

  // Hàm tính toán vị trí ngón tay/chuột để di chuyển vầng sáng
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cardRef.current || !isOpened) return;
    const rect = cardRef.current.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center p-4 relative overflow-hidden font-sans">
    
      <div 
        className="relative w-full max-w-md h-[550px] sm:h-[600px] z-10" 
        style={{ perspective: '1200px' }}
      >
        {/* ================= MẶT TRƯỚC (BÌA THƯ BÍ MẬT) ================= */}
        <motion.div
          className={`absolute inset-0 w-full h-full bg-gradient-to-br from-pink-500 via-red-400 to-pink-500 rounded-[2rem] flex flex-col items-center justify-center p-8 border-4 border-white/30 overflow-hidden outline-none ${!isOpened ? 'cursor-pointer hover:drop-shadow-2xl' : 'pointer-events-none'}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', backgroundSize: '200% 200%' }}
          initial={{ rotateY: 0 }}
          animate={{ 
            rotateY: isOpened ? 180 : 0,
            zIndex: isOpened ? 0 : 10,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] // Hiệu ứng dải màu trôi dạt
          }}
          transition={{ 
            rotateY: { duration: 1.4, type: 'spring', bounce: 0.3 },
            backgroundPosition: { duration: 5, repeat: Infinity, ease: 'linear' }
          }}
          onClick={handleOpen}
        >
          {/* Vòng tròn lan tỏa (Ripple Effect) đằng sau ổ khóa */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div 
               animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
               className="w-32 h-32 rounded-full border-2 border-white/50 absolute"
             />
             <motion.div 
               animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
               className="w-32 h-32 rounded-full border-2 border-white/30 absolute"
             />
          </div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="bg-white/20 p-8 rounded-full backdrop-blur-md mb-8 shadow-2xl border border-white/50 relative z-10"
          >
            <LockKeyhole className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-white text-3xl font-bold font-serif tracking-widest text-center drop-shadow-lg relative z-10 uppercase">
            Top Secret
          </h2>
          <p className="text-pink-100 mt-3 text-sm uppercase tracking-[0.4em] font-bold relative z-10">
            Dành riêng cho em
          </p>

          <div className="absolute bottom-10 flex flex-col items-center text-white">
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm font-semibold tracking-wider bg-white/20 px-6 py-2 rounded-full backdrop-blur-md border border-white/30 shadow-lg"
            >
              Chạm để giải mã 🔓
            </motion.span>
          </div>
        </motion.div>

        {/* ================= MẶT SAU (BỨC TÂM THƯ KỸ XẢO) ================= */}
        <motion.div
          ref={cardRef}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          className="absolute inset-0 w-full h-full bg-[#1a1a1a] rounded-[2rem] shadow-2xl p-6 sm:p-8 flex flex-col border border-pink-900/50 overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            // Tạo vầng sáng đi theo ngón tay
            background: `radial-gradient(circle 250px at ${mousePosition.x}% ${mousePosition.y}%, rgba(253, 224, 71, 0.15), #fffefc 40%)`
          }}
          initial={{ rotateY: -180 }}
          animate={{ 
            rotateY: isOpened ? 0 : -180,
            zIndex: isOpened ? 10 : 0
          }}
          transition={{ duration: 1.4, type: 'spring', bounce: 0.3 }}
        >
          {/* Overlay Vàng hồng óng ánh (Gold Foil) lướt qua thẻ */}
          <motion.div 
            className="absolute inset-0 opacity-30 pointer-events-none mix-blend-color-dodge bg-gradient-to-tr from-transparent via-pink-200 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header: Trái tim được vẽ bằng nét SVG (Draw Line Animation) */}
            <div className="flex justify-center mb-4 mt-2">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                  stroke="url(#gold-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, fill: "rgba(251, 113, 133, 0)" }}
                  animate={isOpened ? { pathLength: 1, fill: "rgba(251, 113, 133, 0.1)" } : {}}
                  transition={{ 
                    pathLength: { delay: 1, duration: 2, ease: "easeInOut" },
                    fill: { delay: 2.5, duration: 1 }
                  }}
                />
                <defs>
                  <linearGradient id="gold-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f43f5e" />
                    <stop offset="1" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={isOpened ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 2.2, duration: 1 }}
              className="text-2xl sm:text-3xl font-serif font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 mb-6"
            >
              Gửi em, cô gái nhỏ!
            </motion.h1>

            {/* Nội dung Thư: Hiệu ứng chữ hiện lên từ sương mù */}
            <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar ${isOpened ? 'cursor-auto' : 'pointer-events-none'}`}>
              <motion.p 
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={isOpened ? { opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ delay: 3, duration: 1.5 }}
                className="text-gray-700 font-serif text-[17px] sm:text-[18px] leading-[1.9] text-justify"
              >
                Cảm ơn em vì đã bước vào thế giới nhỏ này của anh và đồng ý trở thành hành khách VIP trên chuyến xe này. Quãng đường phía trước còn dài, nhưng anh sẽ luôn nắm chặt tay em.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={isOpened ? { opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ delay: 4.5, duration: 1.5 }}
                className="text-gray-700 font-serif text-[17px] sm:text-[18px] leading-[1.9] text-justify mt-4"
              >
                Chúc cho em, cô gái nhỏ của anh luôn thật mạnh mẽ và vững tin bản thân cùng với những lựa chọn trên hành trình của mình. Anh sẽ là chỗ dựa khi em yếu đuối và là người cổ vũ lớn nhất khi em thành công.
              </motion.p>
            </div>

            {/* Chữ ký & Lời kết nảy lên */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={isOpened ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ type: "spring", bounce: 0.6, delay: 6 }}
              className="mt-6 pt-5 border-t border-dashed border-pink-300 flex flex-col items-center bg-gradient-to-r from-transparent via-pink-50 to-transparent relative z-10"
            >
              <div className="flex items-center gap-2 text-pink-600 font-bold text-xl font-serif">
                <span>Yêu em nhiều lắm!</span>
                <Heart className="w-6 h-6 fill-pink-500 animate-pulse drop-shadow-md" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 10px; }
      `}</style>
    </main>
  );
}