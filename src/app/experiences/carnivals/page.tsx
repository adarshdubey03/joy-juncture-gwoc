"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CarnivalExperiencesPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    phone: "",
    eventType: "",
    audienceSize: "",
    venue: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setFormData({
      organizationName: "",
      email: "",
      phone: "",
      eventType: "",
      audienceSize: "",
      venue: "",
      message: "",
    });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleScrollToForm = () => {
    const form = document.getElementById("enquiry-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[#FFF4D6] min-h-screen relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4] via-[#FFE66D] to-[#FF6B6B]" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -180, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-red-400/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 px-6 py-2 bg-cyan-100/60 backdrop-blur-sm rounded-full"
            >
              <p className="text-cyan-900 font-semibold text-sm uppercase tracking-wider">
                Carnivals & Game Zones
              </p>
            </motion.div>

            <h1 className="font-fredoka text-5xl md:text-7xl text-black mb-6 leading-tight tracking-tight">
              Large-Scale Play. Shared Energy.
            </h1>
            <p className="text-black/80 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Walk-in, open participation experiences designed for crowds.
              High engagement, smooth flow, unforgettable energy.
            </p>

            <button
              onClick={handleScrollToForm}
              className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Plan a Game Zone
            </button>
          </motion.div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-16 text-center">The Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProblemCard icon="👥" title="Managing large crowds" description="Keeping hundreds or thousands of participants engaged without chaos or long wait times." />
            <ProblemCard icon="⚡" title="Keeping engagement high" description="Maintaining energy and excitement across multiple hours and diverse audience demographics." />
            <ProblemCard icon="🎨" title="Visual appeal + functionality" description="Creating setups that look amazing for photos while being practical for high-volume participation." />
          </div>
        </motion.div>
      </section>

      {/* Our Solution Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">Our Solution</h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Designed for scale, built for flow
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SolutionCard icon="🎯" title="Modular Game Zones" description="High-footfall stations that can handle volume while maintaining quality experience for each participant." />
            <SolutionCard icon="⏱️" title="Quick-Play Formats" description="Easy-to-understand games with fast resets, ensuring minimal wait times and maximum throughput." />
            <SolutionCard icon="🎭" title="Custom Branding & Themes" description="Fully customizable setups that align with your event's visual identity and messaging." />
          </div>
        </motion.div>
      </section>

      {/* Zone Types Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">Zone Types</h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Experiences for every scale
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExperienceCard image="/carnivals/carnival-games.png" title="Carnival Games" when="Festivals, fairs, community events" why="Classic fun at scale" forWhom="All ages, walk-in crowds" description="Traditional and modern carnival-style games with vibrant setups, instant gratification, and photo-worthy moments." />
            <ExperienceCard image="/carnivals/experience-zone.png" title="Experience Zones" when="Exhibitions, trade shows" why="Interactive brand engagement" forWhom="Targeted audiences" description="Immersive game zones that educate, entertain, and create memorable brand interactions." />
            <ExperienceCard image="/carnivals/college-fest.png" title="College Fest Play Areas" when="Campus festivals, youth events" why="High-energy student engagement" forWhom="College students, young adults" description="Competitive, social, and Instagram-worthy game setups designed for the energy of college crowds." />
            <ExperienceCard image="/carnivals/brand-activation.png" title="Brand Activation Games" when="Product launches, marketing events" why="Memorable brand experiences" forWhom="Target demographics" description="Custom-designed games that communicate brand values while creating shareable, engaging moments." />
          </div>
        </motion.div>
      </section>

      {/* Visual Proof Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">Designed for Scale</h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Wide shots, crowd energy, branded setups
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProofCard image="/carnivals/proof-1.png" caption="Wide zone layouts designed for smooth crowd flow and high participation" />
            <ProofCard image="/carnivals/proof-2.png" caption="Crowd engagement moments captured at peak energy and excitement" />
            <ProofCard image="/carnivals/proof-3.png" caption="Branded and themed setups that look professional and feel premium" />
          </div>
        </motion.div>
      </section>

      {/* Why It Works Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-16 text-center">Why It Works</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <WhyCard number="01" title="Designed for scale" description="Every zone is built to handle high volume without compromising on experience quality or participant satisfaction." />
            <WhyCard number="02" title="Smooth flow and quick resets" description="Strategic layouts and efficient game mechanics ensure minimal bottlenecks and maximum engagement time." />
            <WhyCard number="03" title="Visually engaging without chaos" description="Professional setups that photograph beautifully while maintaining operational efficiency and crowd management." />
          </div>
        </motion.div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry-form" className="relative z-10 max-w-4xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">Design Your Game Zone</h2>
          <p className="text-neutral-700 text-xl text-center mb-12 leading-relaxed">
            Let's create an unforgettable experience
          </p>

          {formSubmitted && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl text-center shadow-lg">
              <p className="text-green-700 font-bold text-xl">✓ Thank you! We'll be in touch within 24 hours.</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Organization Name *</label>
                <input type="text" required value={formData.organizationName} onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-cyan-400 focus:outline-none transition-colors" placeholder="Your organization" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-cyan-400 focus:outline-none transition-colors" placeholder="you@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-cyan-400 focus:outline-none transition-colors" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Event Type *</label>
                <select required value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-cyan-400 focus:outline-none transition-colors">
                  <option value="">Select type</option>
                  <option value="carnival">Carnival/Fair</option>
                  <option value="college-fest">College Fest</option>
                  <option value="brand-activation">Brand Activation</option>
                  <option value="exhibition">Exhibition/Trade Show</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Audience Size *</label>
                <select required value={formData.audienceSize} onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-cyan-400 focus:outline-none transition-colors">
                  <option value="">Select size</option>
                  <option value="100-500">100-500 people</option>
                  <option value="500-1000">500-1,000 people</option>
                  <option value="1000-5000">1,000-5,000 people</option>
                  <option value="5000+">5,000+ people</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Venue Type</label>
                <input type="text" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-cyan-400 focus:outline-none transition-colors" placeholder="Indoor/Outdoor/Both" />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Tell us about your event</label>
              <textarea rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-cyan-400 focus:outline-none transition-colors resize-none" placeholder="What are your goals? Any specific themes or requirements?" />
            </div>

            <button type="submit" className="w-full md:w-auto px-12 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300">
              Design My Game Zone
            </button>
          </form>
        </motion.div>
      </section>

      <div className="h-24" />
    </main>
  );
}

function ProblemCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-neutral-200 hover:border-cyan-300 hover:shadow-xl transition-all">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function SolutionCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="bg-gradient-to-br from-cyan-100/40 to-blue-100/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-200/50 hover:border-cyan-300 hover:shadow-2xl transition-all">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
      <p className="text-neutral-700 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function ExperienceCard({ image, title, when, why, forWhom, description }: { image: string; title: string; when: string; why: string; forWhom: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-neutral-200 hover:border-cyan-300">
      <div className="relative h-64 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 hover:scale-110" />
      </div>
      <div className="p-8">
        <h3 className="font-fredoka text-2xl text-black mb-4">{title}</h3>
        <div className="space-y-2 mb-4 text-sm">
          <p className="text-neutral-600"><span className="font-semibold text-black">When:</span> {when}</p>
          <p className="text-neutral-600"><span className="font-semibold text-black">Why:</span> {why}</p>
          <p className="text-neutral-600"><span className="font-semibold text-black">For whom:</span> {forWhom}</p>
        </div>
        <p className="text-neutral-700 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function ProofCard({ image, caption }: { image: string; caption: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl">
      <Image src={image} alt={caption} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <p className="text-white font-medium leading-relaxed">{caption}</p>
      </div>
    </motion.div>
  );
}

function WhyCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="flex gap-6 items-start bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-neutral-200 hover:border-cyan-300 hover:shadow-lg transition-all">
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
        <span className="font-fredoka text-2xl text-white">{number}</span>
      </div>
      <div>
        <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
        <p className="text-neutral-700 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
