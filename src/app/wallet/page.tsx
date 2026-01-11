"use client";

import { Sparkles, Trophy, Gamepad2, ShoppingBag, CalendarDays, ArrowRight } from "lucide-react";

export default function WalletPage() {
  const totalPoints = 1240;

  const earningHistory = [
    { title: "Sudoku Challenge", points: 120, icon: <Gamepad2 /> },
    { title: "Game Night – Ahmedabad", points: 300, icon: <CalendarDays /> },
    { title: "Deadman’s Deck Purchase", points: 420, icon: <ShoppingBag /> },
    { title: "Riddle of the Day", points: 80, icon: <Gamepad2 /> },
  ];

  const redeemOptions = [
    {
      title: "Free Online Games",
      description: "Play premium riddles & puzzles",
    },
    {
      title: "Event Discounts",
      description: "Use points for game nights & workshops",
    },
    {
      title: "Merch & Games",
      description: "Redeem for Joy Juncture goodies",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF4D6] px-4 md:px-10 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center gap-3">
          Your Wallet <Sparkles className="text-orange-500" />
        </h1>
        <p className="mt-2 text-gray-700 max-w-xl">
          Every game you play, every event you attend, every purchase you make —
          it all adds up 🎉
        </p>
      </div>

      {/* WALLET CARD */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-black text-white rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <p className="uppercase text-sm text-gray-400">Total Points</p>
            <h2 className="text-5xl font-extrabold mt-2">{totalPoints}</h2>
            <p className="mt-3 text-gray-300">
              You’re doing amazing 🚀 Keep playing & earning!
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-orange-400">
            <Trophy />
            <span className="text-sm">Top 20% of community players</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg">Earn More Points</h3>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>🎮 Play online games</li>
            <li>🗓 Join game nights</li>
            <li>🛒 Buy games & merch</li>
          </ul>
          <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
            Start Earning
          </button>
        </div>
      </div>

      {/* EARNING HISTORY */}
      <div className="max-w-6xl mx-auto mt-14">
        <h2 className="text-3xl font-bold text-gray-900">
          How You Earned Your Points
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {earningHistory.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-sm"
            >
              <div className="text-orange-500">{item.icon}</div>
              <p className="font-semibold text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-600">
                +{item.points} points
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* REDEEM SECTION */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900">
          Redeem Your Points
        </h2>
        <p className="mt-2 text-gray-700 max-w-xl">
          Points aren’t meant to sit idle — use them to unlock experiences 💛
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {redeemOptions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
              <button className="mt-6 flex items-center gap-2 text-orange-500 font-medium">
                Explore <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* COMMUNITY CTA */}
      <div className="max-w-6xl mx-auto mt-20 bg-black text-white rounded-3xl p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          This isn’t just a wallet.
        </h2>
        <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
          It’s your journey through games, people, laughter, and memories.
          Keep playing. Keep coming back. 💫
        </p>
        <button className="mt-6 bg-orange-500 text-black px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition">
          Play Now
        </button>
      </div>
    </div>
  );
}
