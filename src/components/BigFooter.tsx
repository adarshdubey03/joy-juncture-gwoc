import Image from "next/image";
import { Instagram, Twitter, Linkedin } from "lucide-react";

export default function BigFooter() {
  return (
    <footer className="w-full px-4 md:px-8 pb-10">
      {/* Rounded Footer Container */}
      <div className="w-full bg-[#1E1A14] text-[#FFF4D6] rounded-[28px] px-8 md:px-16 py-20">
        
        {/* Top: Brand Statement */}
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-2xl font-semibold leading-tight text-[#F4C752]">
            At Joy Juncture, we believe the best moments in life happen around a table... laughing, bonding, and competing with friends & family.
            <br />
            It’s something you share.
          </h2>

          <p className="mt-6 text-[#CFC3A3] text-lg">
            Founded by two passionate siblings, we craft games that blend strategy, storytelling, and sheer joy!
          </p>
        </div>

        {/* Middle: Navigation */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 text-sm">
          {[
            {
              title: "JJ Web-App",
              items: [
                "Play 'The Showdown'",
              ],
            },
            {
              title: "Quicklinks",
              items: [
                "Privacy Policy",
                "Cancellation policy",
                "Terms & Conditions",
                "Return & refund policy",
                "Shipping policy",
                "Cookie policy",

              ],
            },
            {
              title: "Collaborate",
              items: [
                "Partner with Us",
                "a) Partnered Game Program (New Creators)",
               " b) Amplified sales Program (Existing Creators)",
              ],
            },
       
          ].map((section) => (
            <div key={section.title}>
              <p className="mb-4 uppercase tracking-wide text-[#E6D8A8]">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-[#FFF4D6] hover:text-[#F4C752] cursor-pointer transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-[#2A2208] pt-8">
          
          {/* Logo */}
          <div className="flex items-center gap-3 opacity-90">
            <Image
              src="/logo.png" // make sure this exists in /public
              alt="Joy Juncture"
              width={42}
              height={42}
            />
            <span className="text-lg font-semibold">Joy Juncture</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-[#B8AC8A] text-center">
            © {new Date().getFullYear()} Joy Juncture · Designed for moments that matter
          </p>

          {/* Social Icons */}
          <div className="flex gap-6">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <Icon
                key={i}
                className="h-5 w-5 cursor-pointer text-[#FFF4D6] hover:text-[#F4C752] hover:-translate-y-0.5 transition-all"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
