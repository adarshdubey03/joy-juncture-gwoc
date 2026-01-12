"use client"
import { submitExperienceEnquiry } from "@/actions/enquiry-actions";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WeddingExperiencesPage() {
  const [formData, setFormData] = useState({
    coupleName: "",
    email: "",
    phone: "",
    weddingDate: "",
    functions: "",
    guestCount: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const combinedMessage = `Functions: ${formData.functions}\nWedding Date: ${formData.weddingDate}\n\n${formData.message}`;

      const result = await submitExperienceEnquiry({
        name: formData.coupleName,
        email: formData.email,
        phone: formData.phone,
        type: "Wedding",
        guestCount: formData.guestCount,
        message: combinedMessage,
        company: "N/A"
      });

      if (result.success) {
        setFormSubmitted(true);
        setFormData({
          coupleName: "",
          email: "",
          phone: "",
          weddingDate: "",
          functions: "",
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background - Soft Pink to Cream */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFE5E5] via-[#FFF4D6] to-[#FFEEF0]" />

        {/* Animated Shapes - Romantic & Soft */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl"
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
              className="inline-block mb-6 px-6 py-2 bg-rose-100/60 backdrop-blur-sm rounded-full"
            >
              <p className="text-rose-800 font-semibold text-sm uppercase tracking-wider">
                Wedding Experiences & Entertainment
              </p>
            </motion.div>

            <h1 className="font-fredoka text-5xl md:text-7xl text-black mb-6 leading-tight tracking-tight">
              Togetherness. Joy. Celebration.
            </h1>
            <p className="text-black/80 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Make every guest part of your celebration. Create moments of connection
              that feel as special as the wedding itself.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleScrollToForm}
              className="mt-10 px-10 py-4 rounded-full bg-rose-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Design Our Wedding Experience
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
              icon="💔"
              title="Guests feel disconnected"
              description="Large weddings often leave guests sitting at tables with strangers, struggling to connect beyond small talk."
            />
            <ProblemCard
              icon="⏰"
              title="Downtime between rituals"
              description="Long gaps between ceremonies leave guests bored and disengaged, checking phones instead of celebrating."
            />
            <ProblemCard
              icon="🔁"
              title="Entertainment feels repetitive"
              description="The same DJ, same photo booth, same activities that guests have seen at every other wedding."
            />
          </div>
        </motion.div>
      </section>

      {/* Our Approach Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">
            Our Approach
          </h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Entertainment that enhances, never interrupts
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SolutionCard
              icon="💝"
              title="Tailored to Your Story"
              description="Interactive games and activities designed around your relationship, inside jokes, and shared memories."
            />
            <SolutionCard
              icon="👨‍👩‍👧‍👦"
              title="Family-Friendly & Inclusive"
              description="Play formats that work for all ages—from grandparents to kids—ensuring everyone can participate."
            />
            <SolutionCard
              icon="⚡"
              title="Seamlessly Integrated"
              description="Activities that fit naturally into your wedding timeline without disrupting ceremonies or traditions."
            />
          </div>
        </motion.div>
      </section>

      {/* Wedding Experiences Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">
            Wedding Experiences
          </h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Moments designed for every celebration
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExperienceCard
              image="/weddings/mehndi-haldi.png"
              title="Mehndi & Haldi Games"
              when="Pre-wedding ceremonies"
              why="Break the ice between families"
              forWhom="Close family and friends"
              description="Colorful, energetic games that match the vibrant atmosphere of mehndi and haldi, creating laughter and bonding moments."
            />
            <ExperienceCard
              image="/weddings/sangeet.png"
              title="Sangeet Interactive Play"
              when="Sangeet night"
              why="Engage guests between performances"
              forWhom="All wedding guests"
              description="Team-based games and challenges that complement the musical celebration and get everyone involved."
            />
            <ExperienceCard
              image="/weddings/reception.png"
              title="Reception Engagement Zones"
              when="Wedding reception"
              why="Keep energy high throughout"
              forWhom="All ages, all guests"
              description="Sophisticated play stations integrated into your reception decor, offering optional engagement for guests."
            />
            <ExperienceCard
              image="/weddings/hampers.png"
              title="Entertainment Hampers for Guests"
              when="Throughout the wedding"
              why="Thoughtful guest experience"
              forWhom="Guest tables and rooms"
              description="Beautifully packaged game kits placed at tables or in guest rooms as elegant wedding favors."
            />
          </div>
        </motion.div>
      </section>

      {/* Visual Storytelling Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-6 text-center">
            Moments That Matter
          </h2>
          <p className="text-neutral-700 text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Real weddings, real connections
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProofCard
              image="/weddings/proof-1.png"
              caption="Three generations playing together, creating memories that last beyond the wedding day"
            />
            <ProofCard
              image="/weddings/proof-2.png"
              caption="Bride's and groom's families meeting for the first time, bonding through laughter and play"
            />
            <ProofCard
              image="/weddings/proof-3.png"
              caption="Candid moments of joy that happen naturally when guests feel truly engaged"
            />
          </div>
        </motion.div>
      </section>

      {/* Why Couples Choose This Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-fredoka text-4xl md:text-5xl text-black mb-16 text-center">
            Why Couples Choose This
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            <WhyCard
              number="01"
              title="Personalized to your story"
              description="Every game, every activity reflects who you are as a couple. Your guests experience your journey through play."
            />
            <WhyCard
              number="02"
              title="Keeps guests engaged naturally"
              description="No forced participation. Activities are inviting and optional, allowing guests to engage at their own comfort level."
            />
            <WhyCard
              number="03"
              title="Adds a memorable layer"
              description="Years later, guests won't just remember the venue or the food—they'll remember the moments of connection and joy."
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
            Create Your Wedding Experience
          </h2>
          <p className="text-neutral-700 text-xl text-center mb-12 leading-relaxed">
            Let's design something beautiful together
          </p>

          {formSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl text-center shadow-lg"
            >
              <p className="text-green-700 font-bold text-xl">
                ✓ Thank you! We'll be in touch within 24 hours to discuss your wedding.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Couple Names *
                </label>
                <input
                  type="text"
                  required
                  value={formData.coupleName}
                  onChange={(e) => setFormData({ ...formData, coupleName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-rose-400 focus:outline-none transition-colors"
                  placeholder="Bride & Groom names"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-rose-400 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-rose-400 focus:outline-none transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Wedding Date
                </label>
                <input
                  type="text"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-rose-400 focus:outline-none transition-colors"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Functions *
                </label>
                <input
                  type="text"
                  required
                  value={formData.functions}
                  onChange={(e) => setFormData({ ...formData, functions: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-rose-400 focus:outline-none transition-colors"
                  placeholder="Mehndi, Sangeet, Reception..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Guest Count *
                </label>
                <select
                  required
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-rose-400 focus:outline-none transition-colors"
                >
                  <option value="">Select guest count</option>
                  <option value="50-100">50-100 guests</option>
                  <option value="100-200">100-200 guests</option>
                  <option value="200-300">200-300 guests</option>
                  <option value="300-500">300-500 guests</option>
                  <option value="500+">500+ guests</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Tell us about your vision
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white text-black focus:border-rose-400 focus:outline-none transition-colors resize-none"
                placeholder="What kind of atmosphere do you want to create? Any specific themes or ideas?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 py-4 rounded-full bg-rose-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? "Sending..." : "Create Our Wedding Play Experience"}
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
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-neutral-200 hover:border-rose-300 hover:shadow-xl transition-all"
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
      className="bg-gradient-to-br from-rose-100/40 to-white/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-rose-200/50 hover:border-rose-300 hover:shadow-2xl transition-all"
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
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-neutral-200 hover:border-rose-300"
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
      className="flex gap-6 items-start bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-neutral-200 hover:border-rose-300 hover:shadow-lg transition-all"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center">
        <span className="font-fredoka text-2xl text-white">{number}</span>
      </div>
      <div>
        <h3 className="font-fredoka text-2xl text-black mb-3">{title}</h3>
        <p className="text-neutral-700 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
