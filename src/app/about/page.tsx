import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full bg-[#FFF4D6] text-[#2D2D2D] min-h-screen">

      {/* HERO SECTION */}
      <section className="px-8 md:px-16 py-12 md:py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="font-fredoka text-5xl md:text-6xl leading-tight">
            Where Play <br />
            Brings People <br />
            Together
          </h1>
        </div>
        <div className="flex-1 w-full flex justify-center md:justify-end">
          {/* Constrained container to "crop" the image if it is too tall */}
          <div className="relative w-full max-w-lg h-[400px] rounded-2xl overflow-hidden mt-[10px]">
            <Image
              src="/about/hero-illustration.png"
              alt="Group playing games together"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
        <div className="bg-[#FCF3CC] border-2 border-[#F6D387] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm">
          <div className="flex-1 space-y-6">
            <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D]">
              Our Philosophy & Vision
            </h2>
            <h3 className="font-fredoka text-xl text-[#2D2D2D]/80">
              More Than Just Games, It's About Connection
            </h3>
            <p className="font-geist text-lg text-[#2D2D2D]/70 leading-relaxed max-w-2xl">
              At Joy Juncture, we believe games are powerful tools. They're
              catalysts for laughter, silences, and building lasting bonds. We
              create platforms for people to gather, explore new worlds, and
              forge friendships through the universal language of play.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/about/philosophy-illustration.png"
                alt="Philosophy of connection"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BONDING TOOLS SECTION */}
      <section className="px-8 md:px-16 pb-24 max-w-7xl mx-auto">
        <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D] mb-12">
          Games as Tools for Bonding
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="bg-white rounded-[2rem] shadow-sm w-full aspect-[4/3] flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
              <div className="relative w-full h-full">
                <Image
                  src="/about/spark-conversations.png"
                  alt="Spark Conversations"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="font-fredoka text-xl text-[#2D2D2D]">
              Spark Conversations
            </h3>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="bg-white rounded-[2rem] shadow-sm w-full aspect-[4/3] flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
              <div className="relative w-full h-full">
                <Image
                  src="/about/foster-teamwork.png"
                  alt="Foster Teamwork"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="font-fredoka text-xl text-[#2D2D2D]">
              Foster Teamwork
            </h3>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="bg-white rounded-[2rem] shadow-sm w-full aspect-[4/3] flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
              <div className="relative w-full h-full">
                <Image
                  src="/about/shared-memories.png"
                  alt="Create Shared Memories"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="font-fredoka text-xl text-[#2D2D2D]">
              Create Shared Memories
            </h3>
          </div>
        </div>
      </section>

      {/* ================= FOUNDERS CTA ================= */}
      <section className="px-8 md:px-16 py-24 border-t border-[#2D2D2D]/10">
        <div className="max-w-4xl">
          <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D]">
            Curious how it all began?
          </h2>

          <p className="mt-4 font-geist text-[#2D2D2D]/80 text-lg max-w-2xl">
            Joy Juncture didn’t start with a perfect plan — it started with chaos,
            laughter, and two people who believed games could bring people closer.
          </p>

          <Link
            href="/our_story"
            className="inline-block mt-8 rounded-full bg-[#2D2D2D] px-8 py-4 font-geist text-white transition hover:scale-105"
          >
            Meet the founders →
          </Link>
        </div>
      </section>

    </main>
  );
}
