"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JoyJuncturePremium = () => {
  interface FloatingPoint {
    id: number;
    x: number;
    y: number;
    amount: number;
  }
  const [points, setPoints] = useState(1240);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);

  const handleEarn = (amount: number, e: React.MouseEvent) => {
    // Create a floating text effect at click position
    const newFloat = { id: Date.now(), x: e.clientX, y: e.clientY, amount };
    setFloatingPoints([...floatingPoints, newFloat]);

    // Update total points
    setTimeout(() => setPoints(prev => prev + amount), 500);

    // Remove float element after animation
    setTimeout(() => {
      setFloatingPoints(prev => prev.filter(f => f.id !== newFloat.id));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FFF4D6] flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background Sparkles (Decorative) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-white rounded-full blur-sm animate-pulse" />
        <div className="absolute bottom-40 right-1/3 w-6 h-6 bg-yellow-200 rounded-full blur-md animate-bounce" />
      </div>

      <header className="text-center mb-12">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-black text-[#5C4D42] tracking-tight mb-2"
        >
          Play. Earn. Redeem.
        </motion.h1>
        <p className="text-[#8B7361] font-medium italic">Your Joy becomes JJ Points.</p>
      </header>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl">

        {/* LEFT: EARN ACTIONS */}
        <div className="flex flex-col gap-6 w-full lg:w-72">
          <ActionItem
            icon="🛍️" label="Purchases" pts="+120" color="bg-orange-100"
            onClick={(e) => handleEarn(120, e)}
          />
          <ActionItem
            icon="🗓️" label="Events" pts="+300" color="bg-blue-100"
            onClick={(e) => handleEarn(300, e)}
          />
          <ActionItem
            icon="🎮" label="Play Games" pts="+50" color="bg-green-100"
            onClick={(e) => handleEarn(50, e)}
          />
        </div>

        {/* CENTER: THE 3D WALLET */}
        <motion.div
          whileHover={{ rotateY: 5, rotateX: 5 }}
          className="relative group cursor-default"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-[50px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border-8 border-white rounded-[50px] p-12 shadow-2xl flex flex-col items-center w-[400px]">
            <span className="bg-[#5C4D42] text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
              JJ Points Wallet
            </span>

            <motion.div
              key={points}
              initial={{ scale: 0.8, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              className="text-9xl font-black text-[#5C4D42] drop-shadow-sm"
            >
              {points}
            </motion.div>

            {/* Premium Progress Bar */}
            <div className="w-full h-10 bg-gray-100/50 rounded-3xl mt-8 p-1.5 inner-shadow">
              <motion.div
                className="h-full rounded-2xl bg-gradient-to-r from-[#A5D8FF] via-[#B2F2BB] to-[#FFD8A8] shadow-[0_0_15px_rgba(165,216,255,0.6)]"
                initial={{ width: "20%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT: REWARDS */}
        <div className="flex flex-col gap-6 w-full lg:w-72">
          <RewardItem title="Free Games" icon="✨" color="from-blue-100 to-blue-200" />
          <RewardItem title="Event Passes" icon="🎟️" color="from-green-100 to-green-200" />
          <RewardItem title="Exclusive Merch" icon="🎁" color="from-yellow-100 to-yellow-200" />
        </div>
      </div>

      {/* Floating Points Animation Layer */}
      <AnimatePresence>
        {floatingPoints.map(f => (
          <motion.div
            key={f.id}
            initial={{ opacity: 1, y: f.y, x: f.x }}
            animate={{ opacity: 0, y: f.y - 200, x: window.innerWidth / 2 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none text-2xl font-bold text-orange-500 z-50"
          >
            +{f.amount} JJ
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ActionItemProps {
  icon: string;
  label: string;
  pts: string;
  color: string;
  onClick: (e: React.MouseEvent) => void;
}

const ActionItem = ({ icon, label, pts, color, onClick }: ActionItemProps) => (
  <motion.button
    whileHover={{ scale: 1.05, x: 10 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`${color} w-full p-4 rounded-3xl flex items-center gap-4 shadow-sm border-2 border-white/50 hover:shadow-md transition-all`}
  >
    <span className="text-3xl filter drop-shadow-md">{icon}</span>
    <div className="text-left">
      <div className="text-sm font-bold text-[#5C4D42]">{label}</div>
      <div className="text-xs font-black text-orange-600">{pts} Points</div>
    </div>
  </motion.button>
);

interface RewardItemProps {
  title: string;
  icon: string;
  color: string;
}

const RewardItem = ({ title, icon, color }: RewardItemProps) => (
  <motion.div
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className={`bg-gradient-to-br ${color} p-5 rounded-[2rem] border-4 border-white shadow-lg flex items-center gap-4 cursor-pointer`}
  >
    <span className="text-2xl">{icon}</span>
    <span className="font-extrabold text-[#5C4D42] text-sm uppercase tracking-tighter">{title}</span>
  </motion.div>
);

export default JoyJuncturePremium;