"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Calendar, Gamepad2, Ticket, Gift, Puzzle } from 'lucide-react';

const GamificationTeaser = () => {
  return (
    <section className="relative w-full bg-[#FFF4D6] py-10 md:py-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-[#4A3B32] mb-3 tracking-wide"
          >
            Play. Earn. Redeem
          </motion.h2>
          <p className="text-[#8B7361] font-medium text-base md:text-lg">Your Joy becomes JJ Points.</p>
        </div>

        {/* Main Content Grid */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 w-full">

          {/* SVG Connecting Lines (Absolute behind) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
              {/* Left Lines (Solid, curved) */}
              <path d="M 250 100 C 350 100, 350 200, 450 200" fill="none" stroke="#FFD700" strokeWidth="4" />
              <path d="M 250 200 C 350 200, 350 200, 450 210" fill="none" stroke="#AEEeee" strokeWidth="4" />
              <path d="M 250 300 C 350 300, 350 220, 450 220" fill="none" stroke="#90EE90" strokeWidth="4" />

              {/* Right Lines (Dotted) */}
              <path d="M 550 180 L 750 80" fill="none" stroke="#FDE68A" strokeWidth="3" strokeDasharray="8 8" />
              <path d="M 550 200 L 750 200" fill="none" stroke="#FDE68A" strokeWidth="3" strokeDasharray="8 8" />
              <path d="M 550 220 L 750 320" fill="none" stroke="#FDE68A" strokeWidth="3" strokeDasharray="8 8" />
            </svg>
          </div>

          {/* LEFT COLUMN: EARN (Circle Icons + Text) */}
          <div className="flex flex-col gap-10 lg:w-1/3 items-start lg:items-end z-10">
            {/* Purchases */}
            <div className="flex items-center gap-4 lg:flex-row-reverse text-right">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-100 border-4 border-orange-200 flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <div className="text-left lg:text-right">
                <h3 className="font-bold text-[#4A3B32] text-lg md:text-xl">Purchases</h3>
                <p className="font-bold text-[#5C4D42] text-sm md:text-base">+120 JJ Points</p>
              </div>
            </div>

            {/* Events */}
            <div className="flex items-center gap-4 lg:flex-row-reverse text-right">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 border-4 border-blue-200 flex items-center justify-center shadow-sm">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <div className="text-left lg:text-right">
                <h3 className="font-bold text-[#4A3B32] text-lg md:text-xl">Events</h3>
                <p className="font-bold text-[#5C4D42] text-sm md:text-base">+300 JJ Points</p>
              </div>
            </div>

            {/* Play Games */}
            <div className="flex items-center gap-4 lg:flex-row-reverse text-right">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center shadow-sm">
                <Puzzle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <div className="text-left lg:text-right">
                <h3 className="font-bold text-[#4A3B32] text-lg md:text-xl">Play Games</h3>
                <p className="font-bold text-[#5C4D42] text-sm md:text-base">+50 JJ Points</p>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: WALLET CARD */}
          <div className="lg:w-1/3 flex justify-center z-20 w-full px-4 md:px-0">
            <Link href="/wallet" className="block transform transition-transform hover:scale-105 active:scale-95 duration-300 w-full max-w-[380px]">
              <div className="relative bg-gradient-to-br from-[#FFF8E7] to-[#FFF0D0] rounded-[40px] md:rounded-[60px] p-2 shadow-2xl border-[4px] md:border-[8px] border-[#A5D8FF]/50 w-full h-[260px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-[30px] md:rounded-[50px] border-4 border-white/60 pointer-events-none"></div>

                <div className="flex flex-col items-center w-full">
                  {/* Badge */}
                  <div className="bg-[#4A3B32] text-[#FFF4D6] px-6 py-2 rounded-full font-bold text-lg mb-2 shadow-md">
                    JJ Points: Wallet
                  </div>

                  {/* Points */}
                  <div className="text-8xl font-black text-[#FFF8E7] drop-shadow-[0_4px_4px_rgba(92,77,66,1)] stroke-text">
                    <span style={{
                      WebkitTextStroke: '3px #5C4D42',
                      color: '#FFF4D6'
                    }}>1240</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-3/4 h-8 bg-[#E0E0E0] rounded-full mt-4 overflow-hidden border-2 border-white/50 shadow-inner">
                    <div className="h-full w-2/3 bg-gradient-to-r from-teal-300 via-yellow-300 to-orange-300"></div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* RIGHT COLUMN: REWARDS (Rounded Cards) */}
          <div className="flex flex-col gap-6 lg:w-1/3 items-start z-10">

            {/* Free Online Games */}
            <div className="bg-[#E0F2FE] border-2 border-[#BAE6FD] rounded-3xl p-4 flex items-center gap-4 w-64 shadow-sm hover:shadow-md transition-shadow -ml-4 lg:ml-0 rotate-2 lg:rotate-3">
              <Gamepad2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div className="leading-tight">
                <h3 className="font-bold text-[#4A3B32] text-lg">Free Online</h3>
                <p className="font-bold text-[#4A3B32] text-lg">Games 🎵</p>
              </div>
            </div>

            {/* Event Discounts */}
            <div className="bg-[#DCFCE7] border-2 border-[#86EFAC] rounded-3xl p-4 flex items-center gap-4 w-60 shadow-sm hover:shadow-md transition-shadow lg:ml-8 -rotate-1 lg:-rotate-2">
              <Ticket className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div className="leading-tight">
                <h3 className="font-bold text-[#4A3B32] text-lg">Event</h3>
                <p className="font-bold text-[#4A3B32] text-lg">Discounts</p>
              </div>
            </div>

            {/* Merch */}
            <div className="bg-[#FEF3C7] border-2 border-[#FDE68A] rounded-3xl p-4 flex items-center gap-4 w-64 shadow-sm hover:shadow-md transition-shadow -ml-2 lg:ml-4 rotate-1 lg:rotate-2">
              <Gift className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div className="leading-tight">
                <h3 className="font-bold text-[#4A3B32] text-lg">Joy Juncture</h3>
                <p className="font-bold text-[#4A3B32] text-lg">Games & Merch</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default GamificationTeaser;