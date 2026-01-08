import { Instagram, Twitter, Linkedin } from "lucide-react";

export default function BigFooter() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 min-h-[80vh] flex flex-col justify-between py-24">
        
        {/* Top: Brand Statement */}
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Joy isn’t something you buy.
            <br />
            It’s something you share.
          </h2>

          <p className="mt-6 text-neutral-400 text-lg">
            Joy Juncture designs play experiences that bring people together —
            at home, live, and in moments that matter.
          </p>
        </div>

        {/* Middle: Navigation */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 text-sm">
          <div>
            <p className="mb-4 text-neutral-400 uppercase tracking-wide">
              Play
            </p>
            <ul className="space-y-2 text-neutral-200">
              <li>Play at Home</li>
              <li>Play Together (Live)</li>
              <li>Play for Occasions</li>
              <li>Community Play</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-neutral-400 uppercase tracking-wide">
              Games
            </p>
            <ul className="space-y-2 text-neutral-200">
              <li>All Games</li>
              <li>Party Games</li>
              <li>Family Games</li>
              <li>Couples & Friends</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-neutral-400 uppercase tracking-wide">
              Experiences
            </p>
            <ul className="space-y-2 text-neutral-200">
              <li>Live Events</li>
              <li>Workshops</li>
              <li>Corporate Play</li>
              <li>Celebrations</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-neutral-400 uppercase tracking-wide">
              About
            </p>
            <ul className="space-y-2 text-neutral-200">
              <li>Our Philosophy</li>
              <li>Proof of Joy</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        {/* Bottom: Social + Legal */}
        <div className="mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-neutral-800 pt-8">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Joy Juncture. Designed for moments that matter.
          </p>

          <div className="flex gap-6 text-neutral-400">
            <Instagram className="h-5 w-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="h-5 w-5 cursor-pointer hover:text-white transition-colors" />
            <Linkedin className="h-5 w-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
