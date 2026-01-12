"use client"
import { submitExperienceEnquiry } from "@/actions/enquiry-actions";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BirthdayExperiencesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    celebrationType: "",
    date: "",
    guestCount: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const combinedMessage = `Type: ${formData.celebrationType}\nDate: ${formData.date}\n\n${formData.message}`;

      const result = await submitExperienceEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: "Birthday",
        guestCount: formData.guestCount,
        message: combinedMessage,
        company: "N/A"
      });

      if (result.success) {
        setFormSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          celebrationType: "",
          date: "",
          guestCount: "",
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
      /* ... existing render code up to form ... */
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8D5FF] via-[#FFE8A3] to-[#FF9B9B]" />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 px-6 py-2 bg-purple-100/60 backdrop-blur-sm rounded-full"
            >
              <p className="text-purple-800 font-semibold text-sm uppercase tracking-wider">
                Birthdays & Anniversary Experiences
              </p>
            </motion.div>

            <h1 className="font-fredoka text-5xl md:text-7xl text-black mb-6 leading-tight tracking-tight">
              Celebrate People, Not Just Parties
            </h1>
            <p className="text-black/80 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Create celebrations filled with shared laughter, genuine connections,
              and memories that last long after the candles are blown out.
            </p>

            <button
              onClick={handleScrollToForm}
              className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Plan a Celebration
            </button>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-16 text-center">The Problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProblemCard icon="🎭" title="Parties feel predictable" description="Same cake, same songs, same awkward small talk. Celebrations that feel like obligations rather than joy." />
            <ProblemCard icon="🤐" title="Guests don't mingle naturally" description="People stick to their comfort zones, leaving new friendships and connections unexplored." />
            <ProblemCard icon="😴" title="Entertainment lacks engagement" description="Generic activities that don't spark real participation or create memorable moments." />
          </div>
        </motion.div>
      </section>

      {/* What We Create Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">What We Create</h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Celebrations designed around people, not templates
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SolutionCard icon="🎨" title="Theme-Based Games" description="Activities designed around interests, hobbies, and personalities—not generic party games." />
            <SolutionCard icon="🎯" title="Age-Appropriate Play" description="From kids to seniors, everyone gets experiences that match their energy and interests." />
            <SolutionCard icon="👥" title="Mixed-Group Friendly" description="Formats that work for friends, families, colleagues, or any combination of people." />
          </div>
        </motion.div>
      </section>

      {/* Experience Types Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">Experience Types</h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Celebrations for every milestone
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExperienceCard image="/birthdays/adult-night.png" title="Adult Birthday Game Nights" when="Ages 21+" why="Create meaningful connections" forWhom="Friend groups, couples" description="Sophisticated game experiences with craft drinks, great conversation, and activities that bring out everyone's competitive and creative sides." />
            <ExperienceCard image="/birthdays/kids-party.png" title="Kids & Teen Party Games" when="Ages 5-18" why="High energy, zero boredom" forWhom="Children and teenagers" description="Age-appropriate challenges and team games that keep kids engaged, active, and laughing throughout the celebration." />
            <ExperienceCard image="/birthdays/milestone.png" title="Milestone Birthdays" when="30th, 40th, 50th+" why="Honor the journey" forWhom="Multi-generational gatherings" description="Elegant experiences that celebrate life stories, bringing together family and friends across all ages." />
            <ExperienceCard image="/birthdays/anniversary.png" title="Anniversary Celebrations" when="1st to 50th+" why="Celebrate love and partnership" forWhom="Couples and their loved ones" description="Romantic and fun activities that honor the couple's journey while engaging all their guests." />
          </div>
        </motion.div>
      </section>

      {/* Visual Proof Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">Real Celebrations, Real Joy</h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Moments captured from celebrations we've designed
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProofCard image="/birthdays/proof-1.png" caption="Small-group celebrations where everyone feels included and engaged" />
            <ProofCard image="/birthdays/proof-2.png" caption="Home, café, and private venue setups that feel personal and special" />
            <ProofCard image="/birthdays/proof-3.png" caption="High-energy moments where laughter and connection happen naturally" />
          </div>
        </motion.div>
      </section>

      {/* Why It's Loved Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-16 text-center">Why It's Loved</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <WhyCard number="01" title="Easy to join, hard to forget" description="No complicated rules or forced participation. Just natural, engaging activities that people actually want to be part of." />
            <WhyCard number="02" title="No awkward hosting pressure" description="We handle the flow, timing, and facilitation. You get to enjoy your own celebration without stress." />
            <WhyCard number="03" title="Everyone participates at their comfort level" description="Introverts and extroverts both find their groove. No one feels left out or overwhelmed." />
          </div>
        </motion.div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry-form" className="relative z-10 max-w-4xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">Make Your Celebration Memorable</h2>
          <p className="text-neutral-700 text-xl text-center mb-12 leading-relaxed">
            Tell us about your vision
          </p>

          {formSubmitted && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl text-center shadow-lg">
              <p className="text-green-700 font-bold text-xl">✓ Thank you! We'll be in touch within 24 hours.</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Your Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-purple-400 focus:outline-none transition-colors" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-purple-400 focus:outline-none transition-colors" placeholder="you@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-purple-400 focus:outline-none transition-colors" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Celebration Type *</label>
                <select required value={formData.celebrationType} onChange={(e) => setFormData({ ...formData, celebrationType: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-purple-400 focus:outline-none transition-colors">
                  <option value="">Select type</option>
                  <option value="adult-birthday">Adult Birthday</option>
                  <option value="kids-birthday">Kids Birthday</option>
                  <option value="milestone">Milestone Birthday</option>
                  <option value="anniversary">Anniversary</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Date</label>
                <input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-purple-400 focus:outline-none transition-colors" placeholder="DD/MM/YYYY" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Guest Count *</label>
                <select required value={formData.guestCount} onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-purple-400 focus:outline-none transition-colors">
                  <option value="">Select count</option>
                  <option value="5-10">5-10 guests</option>
                  <option value="10-20">10-20 guests</option>
                  <option value="20-30">20-30 guests</option>
                  <option value="30-50">30-50 guests</option>
                  <option value="50+">50+ guests</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Tell us about your celebration</label>
              <textarea rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-purple-400 focus:outline-none transition-colors resize-none" placeholder="What kind of vibe are you going for? Any themes or special requests?" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100">
              {isSubmitting ? "Sending..." : "Make My Celebration Memorable"}
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
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-neutral-200 hover:border-purple-300 hover:shadow-xl transition-all">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function SolutionCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="bg-gradient-to-br from-purple-100/40 to-pink-100/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-200/50 hover:border-purple-300 hover:shadow-2xl transition-all">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
      <p className="text-neutral-700 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function ExperienceCard({ image, title, when, why, forWhom, description }: { image: string; title: string; when: string; why: string; forWhom: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-neutral-200 hover:border-purple-300">
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
    <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="flex gap-6 items-start bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-neutral-200 hover:border-purple-300 hover:shadow-lg transition-all">
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
        <span className="font-fredoka text-2xl text-white">{number}</span>
      </div>
      <div>
        <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
        <p className="text-neutral-700 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
