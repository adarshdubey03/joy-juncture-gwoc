import Image from "next/image";

export default function FoundersPage() {
  return (
    <main className="w-full min-h-screen bg-[#FFF4D6] text-[#4A3B32] overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative px-6 pt-32 md:pt-40 pb-12 w-full flex flex-col items-center text-center">
        <div className="absolute top-12 left-10 md:left-32 text-[#8B5E3C] opacity-60 hidden md:block text-2xl animate-bounce">
          ✦
        </div>
        <div className="absolute top-24 right-10 md:right-32 text-[#8B5E3C] opacity-60 hidden md:block text-xl rotate-12">
          ★
        </div>

        <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-[#4A2C22] mb-3">
          It Started With a Simple Game...
        </h1>
        <p className="font-geist text-xl italic text-[#5D4037] mb-8 font-medium">
          Our journey to creating moments that matter
        </p>

        <div className="relative w-full max-w-sm md:max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:scale-105 transition-transform duration-500 ease-out">
          <Image
            src="/story_header.jpg"
            alt="Friends playing games"
            fill
            className="object-contain" // Changed to contain to respect the illustration style
          />
        </div>

        {/* Decorative arrow element using SVG manually if needed or just implied by spacing */}
      </section>

      {/* MAIN STORY GRID */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* LEFT COLUMN: ORIGIN STORY & FOUNDERS */}
        <div className="space-y-12">

          <div className="space-y-4">
            <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-[#5D4037] flex items-center gap-3">
              A Spark of Realization
              <span className="block w-16 h-1 bg-[#8B5E3C]/20 rounded-full mt-2"></span>
            </h2>
            <p className="font-geist text-lg text-[#6D4C41] leading-relaxed">
              It was a cold Tuesday night. Friends gathered, phones away, and snacks easy between us.
              As laughter clicked, the joy shared experience with the world.
            </p>
            <p className="font-geist text-lg text-[#6D4C41] leading-relaxed">
              The joy didn't fill the room, just in an ordinary room, somehow lasting but in
              that night, I knew to share feeling with the world.
              <br /><br />
              No family legacy. No master plan. Just two people, a lot of ideas, and an unhealthy love for games.
            </p>
          </div>

          {/* POLAROID FOUNDER CARD */}
          <div className="max-w-sm mx-auto md:mx-0 transform -rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer">
            <div className="bg-white p-4 pb-12 shadow-xl rounded-sm border border-stone-100">
              <div className="relative w-full aspect-square bg-stone-100 overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-700">
                {/* Utilizing both founder images in a collage style */}
                <div className="absolute top-0 left-0 w-1/2 h-full relative">
                  <Image src="/khushi.jpg" alt="Khushi" fill className="object-cover" />
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full relative">
                  <Image src="/muskan.jpg" alt="Muskan" fill className="object-cover" />
                </div>
                {/* Overlay to merge them for polaroid feel */}
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="relative h-full w-full">
                    <Image src="/khushi.jpg" alt="Khushi" fill className="object-cover" />
                  </div>
                  <div className="relative h-full w-full">
                    <Image src="/muskan.jpg" alt="Muskan" fill className="object-cover" />
                  </div>
                </div>
              </div>
              <h3 className="font-kalam text-3xl text-center text-[#4A2C22] rotate-1">
                Khushi & Muskan
              </h3>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: TIMELINE */}
        <div className="relative space-y-12 pl-4">
          {/* Vertical Dashed Line */}
          <div className="absolute left-12 top-4 bottom-12 w-0.5 border-l-2 border-dotted border-[#D7CCC8] -z-10 hidden md:block"></div>

          <h3 className="font-fredoka text-xl text-[#795548] font-semibold mb-8">
            From Game Night to Global Community
          </h3>

          {/* TIMELINE ITEM 1 */}
          <div className="flex gap-6 items-start group">
            <div className="w-16 h-16 shrink-0 bg-white rounded-full p-3 shadow-md border-2 border-[#fff5e1] z-10 group-hover:scale-110 transition-transform">
              <div className="relative w-full h-full">
                <Image src="/story_icon_chaos.png" alt="Chaos" fill className="object-contain" />
              </div>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl shadow-sm border border-[#FFF3E0] hover:bg-white transition-colors">
              <h4 className="font-fredoka text-lg font-bold text-[#5D4037] mb-2">Gathering Around of Table</h4>
              <p className="font-geist text-[#795548] text-sm">
                Casual weekly meetups in my small tiny magic unfold.
                Game nights, rule fights, laughter, and the realization that these moments stayed longer than most things.
              </p>
            </div>
          </div>

          {/* TIMELINE ITEM 2 */}
          <div className="flex gap-6 items-start group">
            <div className="w-16 h-16 shrink-0 bg-white rounded-full p-3 shadow-md border-2 border-[#fff5e1] z-10 group-hover:scale-110 transition-transform">
              <div className="relative w-full h-full">
                <Image src="/story_icon_leap.png" alt="Leap" fill className="object-contain" />
              </div>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl shadow-sm border border-[#FFF3E0] hover:bg-white transition-colors">
              <h4 className="font-fredoka text-lg font-bold text-[#5D4037] mb-2">A Leap of Faith</h4>
              <p className="font-geist text-[#795548] text-sm">
                Launching our first game on crowdfunding platform, seeing overwhelming support.
                Walking away from predictable paths to try something uncertain — but joyful.
              </p>
            </div>
          </div>

          {/* TIMELINE ITEM 3 */}
          <div className="flex gap-6 items-start group">
            <div className="w-16 h-16 shrink-0 bg-white rounded-full p-3 shadow-md border-2 border-[#fff5e1] z-10 group-hover:scale-110 transition-transform">
              <div className="relative w-full h-full">
                <Image src="/story_icon_community.png" alt="Community" fill className="object-contain" />
              </div>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl shadow-sm border border-[#FFF3E0] hover:bg-white transition-colors">
              <h4 className="font-fredoka text-lg font-bold text-[#5D4037] mb-2">Expanding our first team</h4>
              <p className="font-geist text-[#795548] text-sm">
                Hosting community events, platform. The overwhelming support.
                What began as random ideas slowly turned into real games.
              </p>
            </div>
          </div>

          {/* TIMELINE ITEM 4 - EXTRA based on image */}
          <div className="flex gap-6 items-start group">
            <div className="w-16 h-16 shrink-0 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#fff5e1] z-10 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🌉</span>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl shadow-sm border border-[#FFF3E0] hover:bg-white transition-colors">
              <h4 className="font-fredoka text-lg font-bold text-[#5D4037] mb-2">Building Bridges of Joy</h4>
              <p className="font-geist text-[#795548] text-sm">
                We're hurting generation, and one impact on shared experiences.
                We are just getting started.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PROMISE SECTION */}
      <section className="px-6 pb-24 pt-12">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-14 shadow-lg border-2 border-[#FFF0D4] text-center space-y-6">
          <h2 className="font-fredoka text-3xl md:text-4xl font-bold text-[#4A2C22]">
            More Than Just Games: Our Promise
          </h2>
          <p className="font-geist text-lg text-[#6D4C41] max-w-2xl mx-auto leading-relaxed">
            Joy Juncture is built on the belief that connection, and togetherness.
            We're incredibly grateful you joined us journey. Together will create spaces
            where everyone belongs, game, one experience at a time.
          </p>

          <div className="pt-8 flex flex-col items-center justify-center gap-2">
            <p className="font-fredoka text-[#5D4037] font-semibold">With immense gratitude,</p>
            <p className="font-fredoka text-[#4A2C22]"> Founder - Khushi & Muskan</p>
            {/* Using a script font or simple signature placeholder */}
            <div className="font-kalam text-4xl text-[#8B5E3C] mt-2 rotate-[-4deg]">
              JJ
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
