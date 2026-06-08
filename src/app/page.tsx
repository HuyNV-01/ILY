// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, LockKeyhole } from 'lucide-react';
import FloatingBackground from '@/components/FloatingBackground';

export default function Home() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    if (password === '22062005') {
      setIsLaunching(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center  p-4 sm:p-8 relative overflow-hidden">
      

      {/* LỚP 1: HIỆU ỨNG TÊN LỬA ĐIỆN ẢNH */}
      <AnimatePresence>
        {isLaunching && (
          <>
            {/* Chiếc tên lửa */}
            <motion.div
              initial={{ y: '100vh', x: '-50%', scale: 0.5, rotate: -45 }}
              animate={{
                // 1. Bay lên giữa - 2. Nhún xuống lấy đà - 3. Phóng vút đi
                y: ['100vh', '15vh', '25vh', '-150vh'],
                // To lên khi ra giữa, nén lại khi lấy đà, và kéo dài ra khi phóng
                scale: [0.5, 4, 3.5, 6],
                // Rung lắc nhẹ khi lấy đà
                rotate: [-45, -50, -40, -45],
              }}
              transition={{
                duration: 2, // Kéo dài thời gian để xem cho "đã"
                times: [0, 0.4, 0.6, 1], // Căn chỉnh thời gian cho từng giai đoạn (keyframes)
                ease: "easeInOut",
              }}
              className="fixed left-1/2 bottom-1/2 z-[100] drop-shadow-2xl pointer-events-none flex flex-col items-center"
              style={{ translateX: '-50%' }}
            >
              <span className="text-8xl">🚀</span>

              {/* Đuôi tên lửa phun ra trái tim thay vì lửa */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 0], y: [0, 100, 200] }}
                transition={{ 
                  delay: 0.8, // Bắt đầu phun trái tim khi tên lửa đang lấy đà
                  duration: 0.5, 
                  repeat: 2 // Lặp lại vài lần trước khi bay mất
                }}
                className="absolute top-full mt-[-20px] left-1/2 -translate-x-1/2 text-4xl flex gap-2"
              >
                💖💖💖
              </motion.div>
            </motion.div>

            {/* LỚP 2: MÀN HÌNH CHỚP HỒNG (FLASH TRANSITION) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }} // Chớp sáng khi tên lửa vừa phóng đi
              onAnimationComplete={() => {
                // Chuyển trang khi màn hình đã phủ kín màu hồng
                router.push('/confession');
              }}
              className="fixed inset-0 bg-pink-100 z-[200] pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* LỚP 3: KHUNG NHẬP MẬT KHẨU */}
      <motion.div 
        // Khi isLaunching = true, khung này sẽ thu nhỏ và chìm vào background
        animate={isLaunching ? { scale: 0.8, opacity: 0, filter: 'blur(10px)' } : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-white/50 z-10"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <Heart className="text-pink-500 w-14 h-14 sm:w-16 sm:h-16 fill-pink-500 drop-shadow-md" />
        </motion.div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Chào em nhé! 👋
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 px-2">
          Để mở khóa bí mật này, em cần nhập đúng "mật mã" nhé. <br className="hidden sm:block"/> (Gợi ý: Ngày em đến với thế giới này 🎂)
        </p>

        <div className="space-y-4">
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
            <input
              type="tel"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder="Nhập mật mã..."
              disabled={isLaunching}
              className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl border-2 outline-none transition-all text-start text-lg tracking-widest ${
                error ? 'border-red-400 bg-red-50 text-red-600' : 'border-pink-200 bg-white/50 focus:border-pink-400 focus:bg-white text-pink-600'
              }`}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-red-500 text-xs sm:text-sm font-medium"
            >
              Sai rồi kìa đồ ngốc, thử lại xem nào! 😝
            </motion.p>
          )}

          <motion.button
            whileHover={!isLaunching ? { scale: 1.03 } : {}}
            whileTap={!isLaunching ? { scale: 0.97 } : {}}
            onClick={handleStart}
            disabled={isLaunching}
            className={`w-full cursor-pointer bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-3 sm:py-4 rounded-2xl shadow-lg shadow-pink-200 transition-all text-base sm:text-lg flex items-center justify-center gap-2`}
          >
            {isLaunching ? 'Khoá mục tiêu...' : 'Bắt đầu thôi 🚀'}
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}