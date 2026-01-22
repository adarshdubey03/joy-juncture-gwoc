import { Instagram, Twitter, Linkedin } from "lucide-react";

export default function BigFooter() {
  return (
    <footer className="w-full px-4 md:px-8 pb-10 bg-[#FFF4D6]">
      {/* Rounded Footer Container */}
      <div
        className="
          mx-auto max-w-360
          h-auto md:h-[80vh]
          bg-[#1E1A14] text-[#FFF4D6]
          rounded-4xl md:rounded-[28px]
          px-6 sm:px-8 md:px-16
          py-12 sm:py-16 md:py-20
          flex flex-col
        "
      >
        {/* Top: Brand Statement with Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-[#F4C752]">
              At Joy Juncture, we believe the best moments in life happen around a
              table… laughing, bonding, and competing with friends & family.
              <br className="hidden sm:block" />
              It's something you share.
            </h2>

            <p className="mt-4 md:mt-6 text-[#CFC3A3] text-base md:text-lg">
              Founded by two passionate siblings, we craft games that blend
              strategy, storytelling, and sheer joy.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 md:gap-6">
            <div className="flex gap-5 md:gap-6">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/joy_juncture/" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/joy-juncture/?originalSubdomain=in" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={Icon.displayName || "Social Link"}
                >
                  <Icon
                    className="
                    h-5 w-5
                    cursor-pointer
                    text-[#FFF4D6]
                    hover:text-[#F4C752]
                    hover:-translate-y-0.5
                    transition-all
                  "
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Navigation — CENTERED */}
        <div className="mt-14 sm:mt-16 md:mt-20 mb-3 flex justify-center grow">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-10 sm:gap-16 md:gap-24 lg:gap-32
              text-sm
              max-w-6xl
              w-full
            "
          >
            {[
              {
                title: "JJ Web-App",
                items: ["Play 'The Showdown'"],
              },
              {
                title: "Quicklinks",
                items: [
                  "Privacy Policy",
                  "Cancellation Policy",
                  "Terms & Conditions",
                  "Return & Refund Policy",
                  "Shipping Policy",
                  "Cookie Policy",
                ],
              },
              {
                title: "Collaborate",
                items: [
                  "Partner with Us",
                  "Partnered Game Program",
                  "Amplified Sales Program",
                ],
              },
              {
                title: "Contact",
                items: [
                  "hello@joyjuncture.com",
                  "+91 9XXXX XXXXX",
                  "Surat, India",
                  "Send an Enquiry",
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
                      className="
                        text-[#FFF4D6]
                        hover:text-[#F4C752]
                        cursor-pointer
                        transition-colors
                      "
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section — TIGHT & FINISHED */}
        <div className="border-t border-[#2A2208] pt-4 md:pt-3 mt-2 flex flex-col items-center gap-4">
          <p className="text-xs sm:text-sm text-[#B8AC8A] text-center">
            © {new Date().getFullYear()} Joy Juncture · Designed for moments that
            matter
          </p>
        </div>
      </div>
    </footer>
  );
}
