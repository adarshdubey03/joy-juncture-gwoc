"use client";

import Image from "next/image";

import {
  Sparkles,
  Trophy,
  Gamepad2,
  Gift,
} from "lucide-react";

export default function WalletPage() {
  const totalPoints = 1240;

  const earningHistory = [
    { title: "Sudoku Challenge", points: "+50 JJ", date: "Oct 12", icon: Gamepad2, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Game Night Participation", points: "+120 JJ", date: "Oct 10", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
    { title: "Game Night Participation", points: "+200 JJ", date: "Oct 08", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
    { title: "Workshop: Level Up", points: "+200 JJ", date: "Oct 08", icon: Sparkles, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  const redemptionOptions = [
    {
      title: "Game Discounts",
      subtitle: "(15% Off)",
      cost: "Early Event Access",
      points: "1,000 Points",
      btnText: "Redeem",
      btnColor: "bg-[#7E6E85]", // Muted purple from image
    },
    {
      title: "Exclusive",
      subtitle: "Avatar Skin",
      cost: "",
      points: "300 Points",
      btnText: "Redeem",
      btnColor: "bg-[#D4A351]", // Gold from image
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF4D6] pt-28 pb-16 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        {/* Not using 'header' tag to avoid conflict with main site header if any, sticking to div structure */}
        {/* Breadcrumb-like nav is in image but user said typography same as now, assuming generic header or just this page content */}

        {/* MAIN WALLET CARD */}
        <div className="bg-[#FAEED6] rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
          {/* Decorative stars */}
          <Sparkles className="absolute top-8 right-1/3 text-gray-400 opacity-50 w-6 h-6" />
          <Sparkles className="absolute top-16 right-1/4 text-gray-400 opacity-50 w-4 h-4" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">JJ Wallet</h1>
              <h2 className="text-5xl md:text-6xl font-bold text-[#3D3431] mb-2">
                1,240 <span className="text-3xl font-normal">JJ Points</span>
              </h2>
              <p className="text-[#5A4F48] text-lg">Earn. Play. Redeem.</p>
            </div>
            <button className="hidden md:block text-[#3D3431] font-medium hover:underline mt-4 md:mt-0">
              Details
            </button>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <button className="bg-[#FFFDF5] hover:bg-white transition-all hover:scale-[1.02] p-4 rounded-[2rem] flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 h-24">
            <div className="w-12 h-12 bg-[#D4A351] bg-opacity-20 rounded-full flex items-center justify-center text-[#D4A351]">
              <Image
                src="/svg/game-controller-joystick-svgrepo-com.svg"
                alt="Play Games"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <span className="text-left font-semibold text-[#3D3431] leading-tight">
              Play games &<br />challenges
            </span>
          </button>

          <button className="bg-[#D4A351] hover:bg-[#c49240] transition-all hover:scale-[1.02] p-4 rounded-[2rem] flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(212,163,81,0.5)] h-24 text-white">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Image
                src="/svg/trophy-cup-svgrepo-com.svg"
                alt="Earn Points"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <span className="text-left font-semibold leading-tight">
              Earn JJ Points
            </span>
          </button>

          <button className="bg-[#7E6E85] hover:bg-[#6b5d72] transition-all hover:scale-[1.02] p-4 rounded-[2rem] flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(126,110,133,0.5)] h-24 text-white">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Image
                src="/svg/gift-svgrepo-com.svg"
                alt="Redeem Rewards"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <span className="text-left font-semibold leading-tight">
              Redem rewards<br />& experiences
            </span>
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="py-4">
          <div className="relative h-3 bg-[#EAE5D5] rounded-full w-full">
            <div className="absolute top-0 left-0 h-full w-[60%] bg-[#7E6E85] rounded-full">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#6b5d72] border-2 border-white rounded-full"></div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4">
              <div className="bg-[#FFF8E6] p-2 rounded-full shadow-sm">
                <Trophy className="text-[#D4A351] fill-current" size={20} />
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 font-medium">800 points away from Gold Tier</p>
        </div>

        {/* BOTTOM SECTION: HISTORY & REWARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* EARNING HISTORY */}
          <div>
            <h3 className="text-xl font-bold text-[#3D3431] mb-6">Earning History</h3>
            <div className="space-y-4">
              {earningHistory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-transparent border-b border-gray-100 last:border-0 hover:bg-white hover:rounded-xl hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="font-medium text-[#3D3431]">{item.title}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#3D3431] text-sm">{item.points}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REDEEM REWARDS */}
          <div>
            <h3 className="text-xl font-bold text-[#3D3431] mb-6">Redeem Rewards</h3>
            <div className="grid grid-cols-2 gap-4">
              {redemptionOptions.map((option, idx) => (
                <div key={idx} className="bg-[#FFFDF5] p-5 rounded-[1.5rem] flex flex-col items-center text-center shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-stone-50">
                  <div className="flex-1 mb-4">
                    <h4 className="font-bold text-[#3D3431] text-lg leading-tight">{option.title}</h4>
                    {option.subtitle && <p className="font-bold text-[#3D3431] text-lg leading-tight">{option.subtitle}</p>}
                    {option.cost && <p className="text-xs text-gray-500 mt-2">{option.cost}</p>}
                    <p className="text-sm font-medium text-[#3D3431] mt-1">{option.points}</p>
                  </div>
                  <button className={`${option.btnColor} text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity w-full`}>
                    {option.btnText}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
