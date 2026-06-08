// app/confession/page.tsx
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, BookHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'react-qr-code';

const STORY_LINES = [
  "Từ những câu chào hỏi đầu tiên, anh đã thấy có điều gì đó rất đặc biệt... ✨",
  "Anh nhận ra mình bắt đầu để ý đến những câu chuyện và thói quen nhỏ của em. Anh thích nghe em kể về ngày của mình, dù chỉ là những chuyện nhỏ nhặt nhất. 😊",
  "Trên thế giới rộng lớn này, có rất nhiều thứ ngôn ngữ khác nhau. Mỗi người đều sở hữu một thứ ngôn ngữ riêng thể hiện tình cảm. Và anh duy nhất muốn biết, muốn hiểu và giữ lấy em và cả thứ ngôn ngữ đó của em cho riêng mình 💖",
  "Mỗi ngày được trò chuyện cùng em là một ngày vui của anh. 😊",
  "Anh không giỏi ăn nói, hay vụng về, cũng không biết làm ảo thuật, đôi lúc anh còn chọc em cáu... 🎩",
  "Nhưng anh vẫn luôn ở đây, lắng nghe và bên cạnh em mỗi khi em buồn hay vui. Ai cũng có những câu chuyện, nhưng em hãy tin tưởng anh hơn mỗi ngày nhé! 🥰",
  "Chuyến xe bus cuộc đời anh đang thiếu một hành khách VIP... Anh muốn mời em lên cùng anh, để chúng ta cùng nhau trải nghiệm những cung đường mới. Anh sẽ luôn bên cạnh em dù trời nắng hay mưa, đi cùng em trên mọi nẻo đường. 🚍",
  "Em làm người yêu anh nhé? 💖"
];

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.04 }, // Tốc độ viết chữ
  },
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }, // Bỏ y: 5 đi để chữ không bị lệch khỏi dòng kẻ khi xuất hiện
};

// Component trang trí xung quanh màn hình
const CuteDecorations = () => {
  const decors = [
    { id: 1, emoji: "🐻", top: "10%", left: "5%", rotate: -12, delay: 0 },
    { id: 2, emoji: "🐰", top: "70%", left: "8%", rotate: 15, delay: 1 },
    { id: 3, emoji: "🐱", top: "15%", right: "8%", rotate: 10, delay: 0.5 },
    { id: 4, emoji: "💌", top: "65%", right: "5%", rotate: -15, delay: 1.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden sm:block">
      {decors.map((decor) => (
        <motion.div
          key={decor.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: decor.delay, duration: 1, type: "spring" }}
          className="absolute bg-white p-3 rounded-2xl shadow-lg border border-pink-100 flex items-center justify-center text-4xl"
          style={{ top: decor.top, left: decor.left, right: decor.right, rotate: decor.rotate }}
        >
          {decor.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default function Confession() {
  const [step, setStep] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    setQrUrl(`${window.location.origin}/secret`);
  }, []);

  const handleNext = () => {
    if (isTyping) return;
    if (step < STORY_LINES.length - 1) {
      setStep(step + 1);
      setIsTyping(true);
    }
  };

  const handleAccept = async () => {
    setIsAccepted(true);
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff']
    });

    try {
      await fetch('/api/send-email', {
        method: 'POST',
      });
      console.log('Email xác nhận đã được gửi đi!');
    } catch (error) {
      console.error('Có lỗi xảy ra khi gửi email xác nhận:', error);
    }
  };

  const isLastStep = step === STORY_LINES.length - 1;

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center  p-4 relative overflow-hidden font-sans">
      
      <CuteDecorations />

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div 
            key="diary"
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.8, type: "spring" }}
            // Thiết kế cuốn sổ/nhật ký
            className="w-full max-w-2xl bg-[#fffefc] rounded-r-3xl rounded-l-lg shadow-2xl border border-[#e5e0d8] relative z-10 flex flex-col sm:flex-row overflow-hidden"
          >
            {/* Phần gáy sách (Binding) */}
            <div className="w-full sm:w-12 bg-[#f4ece1] sm:border-r border-b sm:border-b-0 border-[#dcd3c6] flex sm:flex-col items-center justify-center gap-4 py-3 sm:py-0 relative">
              {/* Lỗ đóng gáy sách */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-[#eaddce] shadow-inner border border-[#d2c6b6] hidden sm:block"></div>
              ))}
              <div className="text-[#c1b3a0] sm:hidden flex items-center gap-2 font-serif italic text-sm">
                <BookHeart className="w-4 h-4" /> Nhật ký tâm sự
              </div>
            </div>

            {/* Phần giấy viết nội dung */}
            <div className="flex-1 p-6 sm:p-10 relative">
              {/* Tiêu đề trang giấy */}
              <div className="flex justify-between items-end border-b-2 border-pink-200 pb-2 mb-6">
                <h2 className="text-xl sm:text-2xl font-serif italic text-pink-500 font-bold">Gửi em...</h2>
                <span className="text-xs sm:text-sm text-gray-400 font-mono">Trang {step + 1}/{STORY_LINES.length}</span>
              </div>

              {/* Khu vực kẻ dòng và chạy chữ */}
              <div 
                className="min-h-[160px] sm:min-h-[200px] text-lg sm:text-xl text-gray-700 font-serif"
                style={{
                  // Tạo hiệu ứng dòng kẻ ngang giấy vở (36px là khoảng cách 1 dòng)
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 35px, #e2e8f0 35px, #e2e8f0 36px)',
                  lineHeight: '36px', // Quan trọng: Khoảng cách dòng chữ phải khớp bằng khoảng cách line
                  backgroundAttachment: 'local'
                }}
              >
                <motion.p
                  key={step}
                  variants={sentenceVariants}
                  initial="hidden"
                  animate="visible"
                  onAnimationComplete={() => setIsTyping(false)}
                  className="inline" // Dùng inline để text trôi tự nhiên trên dòng kẻ
                >
                  {STORY_LINES[step].split("").map((char, index) => (
                    <motion.span key={`${step}-${index}`} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </div>

              {/* Nút bấm ở góc phải dưới của trang giấy */}
              <div className="flex justify-end mt-8">
                {!isLastStep ? (
                  <motion.button
                    whileHover={!isTyping ? { scale: 1.05, rotate: -2 } : {}}
                    whileTap={!isTyping ? { scale: 0.95 } : {}}
                    onClick={handleNext}
                    disabled={isTyping}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-serif italic font-bold transition-all ${
                      isTyping 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-pink-500 hover:bg-pink-50 border border-pink-200 shadow-sm'
                    }`}
                  >
                    {isTyping ? 'Đang viết...' : 'Lật trang tiếp'} <Send className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    disabled={isTyping}
                    className={`px-8 py-3 rounded-2xl flex items-center justify-center gap-2 font-serif text-xl font-bold transition-all ${
                      isTyping 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-pink-400 to-red-400 text-white shadow-lg shadow-pink-200'
                    }`}
                  >
                    <Heart className="w-6 h-6 fill-white animate-pulse" />
                    Em đồng ý!
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5, rotateY: -90, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 z-10"
          >
            {/* Background trang trí chìm bên trong vé */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50 mix-blend-multiply translate-x-10 -translate-y-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-200 rounded-full blur-3xl opacity-50 mix-blend-multiply -translate-x-10 translate-y-10" />

            {/* Phần Header của Vé (Màu hồng) */}
            <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-6 text-center text-white relative shadow-sm">
              <h2 className="text-3xl font-bold tracking-widest uppercase font-sans">VIP PASS</h2>
              <p className="text-pink-100 text-sm font-medium mt-1 uppercase tracking-wider">Chuyến Xe Hạnh Phúc 🚍</p>
              
              {/* Lỗ khuyết 2 bên vé (cùng màu với background nền #fdfbf7) */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#fdfbf7] rounded-full shadow-inner" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#fdfbf7] rounded-full shadow-inner" />
            </div>

            {/* Phần Body nội dung vé */}
            <div className="p-8 pt-10 pb-6 relative bg-[radial-gradient(#fecdd3_1.5px,transparent_1.5px)] [background-size:20px_20px]">
              
              {/* Hiệu ứng Dấu mộc (Stamp) đóng xuống */}
              <motion.div
                initial={{ opacity: 0, scale: 4, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: -15 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring", bounce: 0.6 }}
                className="absolute top-4 right-4 border-4 border-red-500 text-red-500 text-2xl font-black uppercase py-1 px-3 rounded-lg z-20 shadow-md backdrop-blur-sm transform origin-center"
                style={{ fontFamily: 'Courier New, monospace' }}
              >
                APPROVED ❤️
              </motion.div>

              <div className="space-y-5 relative z-10">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Hành Khách VIP</p>
                  <p className="text-2xl font-serif font-bold text-gray-800">Công Chúa Của Anh</p>
                </div>
                
                <div className="flex justify-between items-center border-y border-pink-100 py-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Khởi Hành</p>
                    <p className="text-lg font-serif font-semibold text-pink-500">Ngay hôm nay</p>
                  </div>
                  <motion.div 
                    animate={{ x: [0, 5, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Heart className="w-6 h-6 text-pink-300 fill-pink-300" />
                  </motion.div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Điểm Đến</p>
                    <p className="text-lg font-serif font-semibold text-pink-500">Mãi mãi về sau</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Vị Trí Ghế Ngồi</p>
                  <p className="text-lg font-serif font-semibold text-gray-800">Ngay bên trái tim anh</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-pink-200 p-6 bg-white flex flex-col items-center relative z-10">
              <div className="flex gap-[3px] h-12 w-full justify-center mb-3">
                {[2, 4, 1, 3, 2, 5, 1, 1, 4, 2, 3, 1, 5, 2, 1, 4, 2, 3, 1, 2, 4, 1].map((width, i) => (
                  <div 
                    key={i} 
                    className="bg-gray-800 rounded-sm" 
                    style={{ width: `${width}px` }} 
                  />
                ))}
              </div>
              <p className="text-sm font-mono text-gray-500 tracking-[0.2em] font-bold">I-LOVE-YOU-3000</p>
            </div>
            <div className="border-t-2 border-dashed border-pink-200 p-5 bg-white flex items-center justify-between relative z-10 rounded-b-3xl">
              <div className="flex flex-col items-start">
                <p className="text-xs text-pink-400 uppercase font-bold tracking-widest mb-1">Quét mã để xem</p>
                <p className="text-sm font-serif font-bold text-gray-700">Lời nhắn bí mật 💌</p>
                <p className="text-xs font-mono text-gray-400 tracking-[0.1em] mt-3 font-bold">I-LOVE-YOU-3000</p>
              </div>
              
              <div className="bg-white p-1.5 rounded-xl border-2 border-pink-100 shadow-sm">
                {qrUrl ? (
                  <QRCode 
                    value={qrUrl} 
                    size={70} 
                    bgColor="transparent" 
                    fgColor="#db2777" // Màu pink-600
                    level="L"
                  />
                ) : (
                  <div className="w-[70px] h-[70px] bg-pink-50 animate-pulse rounded-lg" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}