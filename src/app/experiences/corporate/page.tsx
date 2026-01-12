
"use client";
import { submitExperienceEnquiry } from "@/actions/enquiry-actions";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CorporateEngagementPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    teamSize: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitExperienceEnquiry({
        name: formData.contactName,
        company: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        type: "Corporate",
        message: formData.message,
        guestCount: formData.teamSize,
      });

      if (result.success) {
        setFormSubmitted(true);
        // Clear the form
        setFormData({
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          teamSize: "",
          message: "",
        });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToForm = () => {
    const form = document.getElementById("enquiry-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[#FFF4D6] min-h-screen relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4C752] via-[#FFF4D6] to-[#FFE8A3]" />

        {/* Animated Geometric Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-black/5 rounded-full blur-2xl"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 px-6 py-2 bg-black/10 backdrop-blur-sm rounded-full"
            >
              <p className="text-black/70 font-semibold text-sm uppercase tracking-wider">
                Corporate Engagement Experiences
              </p>
            </motion.div>

            <h1 className="font-fredoka text-5xl md:text-7xl text-black mb-6 leading-tight tracking-tight">
              Connection. Culture. Engagement.
            </h1>
            <p className="text-black/80 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
              Transform your workplace through play. Build stronger teams, boost morale,
              and create moments that matter.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleScrollToForm}
              className="mt-10 px-10 py-4 rounded-full bg-black text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Plan a Corporate Experience
            </button>
          </motion.div>
        </div>

      </section>

      {/* The Problem Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-16 text-center">
            The Problem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProblemCard
              icon="😔"
              title="Employees feel disconnected"
              description="Remote work and busy schedules have created silos. Teams work together but don't truly connect."
            />
            <ProblemCard
              icon="🔄"
              title="Team activities feel forced"
              description="Generic icebreakers and repetitive events that nobody looks forward to attending."
            />
            <ProblemCard
              icon="📉"
              title="Low participation rates"
              description="Declining engagement in corporate events. People show up physically but check out mentally."
            />
          </div>
        </motion.div>
      </section>

      {/* Our Solution Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">
            Our Solution
          </h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Game-based experiences designed to bring people together naturally
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SolutionCard
              icon="🎯"
              title="Thoughtfully Designed"
              description="Every experience is crafted to encourage genuine interaction, not forced participation."
            />
            <SolutionCard
              icon="🤝"
              title="Inclusive & Accessible"
              description="Easy-to-play, high-energy formats that work for everyone, regardless of background or personality."
            />
            <SolutionCard
              icon="✨"
              title="Fully Customized"
              description="Tailored to your team size, company culture, and specific engagement goals."
            />
          </div>
        </motion.div>
      </section>

      {/* Experience Types Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">
            Experience Types
          </h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Choose the format that fits your team's needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExperienceCard
              image="/corporate/team-building.jpg"
              title="Team Building Sessions"
              when="Quarterly or bi-annual"
              why="Strengthen cross-functional collaboration"
              forWhom="Teams of 10-50 people"
              description="Interactive game sessions designed to break down silos and build trust through shared challenges and laughter."
            />
            <ExperienceCard
              image="/corporate/festival.png"
              title="Festival Celebrations"
              when="Diwali, Christmas, New Year"
              why="Celebrate diversity and culture"
              forWhom="Entire organization"
              description="Inclusive cultural celebrations that bring everyone together through games that honor traditions while creating new memories."
            />
            <ExperienceCard
              image="/corporate/milestone.png"
              title="Milestone & Annual Events"
              when="Company anniversaries, achievements"
              why="Mark important moments memorably"
              forWhom="Leadership teams and all employees"
              description="Sophisticated game experiences for formal celebrations that add energy and connection to milestone moments."
            />
            <ExperienceCard
              image="/corporate/monthly-kit.png"
              title="Monthly Engagement Kits"
              when="Ongoing, every month"
              why="Maintain consistent team connection"
              forWhom="Small teams or departments"
              description="Curated game kits delivered monthly to keep engagement high and give teams something to look forward to."
            />
          </div>
        </motion.div>
      </section>

      {/* Visual Proof Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">
            Real Moments, Real Connection
          </h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            See how teams come alive through play
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProofCard
              image="/corporate/proof-office.png"
              caption="Office lunch breaks transformed into moments of genuine connection"
            />
            <ProofCard
              image="/corporate/proof-offsite.png"
              caption="Offsite retreats where teams bond through shared experiences"
            />
            <ProofCard
              image="/corporate/proof-hybrid.png"
              caption="Hybrid setups that bring remote and in-office teams together"
            />
          </div>
        </motion.div>
      </section>

      {/* Why It Works Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-16 text-center">
            Why It Works
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            <WhyCard
              number="01"
              title="Designed for participation, not performance"
              description="No one needs to be good at games. Our experiences focus on interaction and fun, not competition or skill."
            />
            <WhyCard
              number="02"
              title="Zero awkward ice-breaking"
              description="Games naturally create conversation and laughter. No forced introductions or uncomfortable activities."
            />
            <WhyCard
              number="03"
              title="Seamless execution from concept to play"
              description="We handle everything—design, logistics, facilitation. You just show up and enjoy the experience."
            />
          </div>
        </motion.div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry-form" className="relative z-10 max-w-4xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">
            Build Your Corporate Experience
          </h2>
          <p className="text-neutral-700 text-xl text-center mb-12 leading-relaxed">
            Tell us about your team, and we'll create something perfect for you
          </p>

          {formSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl text-center shadow-lg"
            >
              <p className="text-green-700 font-bold text-xl">
                ✓ Thank you! We'll be in touch within 24 hours.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-[#F4C752] focus:outline-none transition-colors"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-[#F4C752] focus:outline-none transition-colors"
                  placeholder="Full name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-[#F4C752] focus:outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-[#F4C752] focus:outline-none transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Team Size *
              </label>
              <select
                required
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-[#F4C752] focus:outline-none transition-colors"
              >
                <option value="">Select team size</option>
                <option value="10-25">10-25 people</option>
                <option value="25-50">25-50 people</option>
                <option value="50-100">50-100 people</option>
                <option value="100-200">100-200 people</option>
                <option value="200+">200+ people</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Tell us about your vision
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-[#F4C752] focus:outline-none transition-colors resize-none"
                placeholder="What kind of experience are you looking for? Any specific goals, themes, or preferences?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full md:w-auto
                px-12 py-4 rounded-full
                bg-[#F4C752] text-black font-bold text-lg
                shadow-[0_8px_24px_rgba(244,199,82,0.4)]
                hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(244,199,82,0.6)]
                transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0
              "
            >
              {isSubmitting ? "Sending..." : "Build My Corporate Experience"}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-24" />
    </main>
  );
}

// Component: Problem Card
function ProblemCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-neutral-200 hover:border-[#F4C752] hover:shadow-xl transition-all"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Component: Solution Card
function SolutionCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-[#F4C752]/20 to-white/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#F4C752]/30 hover:border-[#F4C752] hover:shadow-2xl transition-all"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
      <p className="text-neutral-700 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Component: Experience Card
function ExperienceCard({
  image,
  title,
  when,
  why,
  forWhom,
  description,
}: {
  image: string;
  title: string;
  when: string;
  why: string;
  forWhom: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-neutral-200 hover:border-[#F4C752]"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-8">
        <h3 className="font-fredoka text-2xl text-black mb-4">{title}</h3>
        <div className="space-y-2 mb-4 text-sm">
          <p className="text-neutral-600">
            <span className="font-semibold text-black">When:</span> {when}
          </p>
          <p className="text-neutral-600">
            <span className="font-semibold text-black">Why:</span> {why}
          </p>
          <p className="text-neutral-600">
            <span className="font-semibold text-black">For whom:</span> {forWhom}
          </p>
        </div>
        <p className="text-neutral-700 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Component: Proof Card
function ProofCard({ image, caption }: { image: string; caption: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
    >
      <Image
        src={image}
        alt={caption}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <p className="text-white font-medium leading-relaxed">{caption}</p>
      </div>
    </motion.div>
  );
}

// Component: Why Card
function WhyCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ x: 8 }}
      transition={{ duration: 0.3 }}
      className="flex gap-6 items-start bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-neutral-200 hover:border-[#F4C752] hover:shadow-lg transition-all"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#F4C752] flex items-center justify-center">
        <span className="font-fredoka text-2xl text-black">{number}</span>
      </div>
      <div>
        <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
        <p className="text-neutral-700 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
