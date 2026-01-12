import ExperienceHero from "@/components/experiences/ExperienceHero";
import ProblemCards from "@/components/experiences/ProblemCards";
import SolutionCards from "@/components/experiences/SolutionCards";
import ExperienceFormats from "@/components/experiences/ExperienceFormats";
import MomentsGallery from "@/components/experiences/MomentsGallery";
import TrustSection from "@/components/experiences/TrustSection";
import EnquiryForm from "@/components/experiences/EnquiryForm";

export default function CorporatePage() {
  const problemCards = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Team events feel forced",
      description: "Generic activities that nobody actually enjoys",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Low participation rates",
      description: "People show up but don't engage",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Budget wasted",
      description: "Expensive events with minimal impact",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
        </svg>
      ),
      title: "Teams stay disconnected",
      description: "Events don't build real connections",
    },
  ];

  const solutionCards = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Real Engagement",
      highlight: "100% Participation",
      description:
        "Games that people actually want to play. No awkward icebreakers, just genuine fun that brings teams together naturally.",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Instant Connection",
      highlight: "Team Building",
      description:
        "Break down silos through shared experiences. Watch collaboration happen organically when people play together.",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Fully Customizable",
      highlight: "Your Brand",
      description:
        "Tailored experiences that match your company culture. From startup vibes to enterprise scale, we adapt to you.",
    },
  ];

  const formats = [
    {
      title: "Office Game Zones",
      whatItIs: "Transform your workspace into an interactive play area",
      whenItWorks: "Team building days, quarterly celebrations, onboarding",
      whoItsFor: "Teams of 20-200 looking for ongoing engagement",
      imagePath: "/corporate/real-office-session-1.jpg",
    },
    {
      title: "Offsite Experiences",
      whatItIs: "Full-day immersive game experiences at your venue",
      whenItWorks: "Annual retreats, leadership summits, milestone celebrations",
      whoItsFor: "Companies planning memorable offsite events",
      imagePath: "/corporate/real-office-session-2.jpg",
    },
    {
      title: "Lunch & Play Sessions",
      whatItIs: "Quick 60-90 minute game sessions during work hours",
      whenItWorks: "Weekly team bonding, Friday fun, stress relief",
      whoItsFor: "Busy teams wanting regular, bite-sized engagement",
      imagePath: "/corporate/real-team-games.jpg",
    },
  ];

  const galleryImages = [
    "/corporate/real-office-session-1.jpg",
    "/corporate/real-office-session-2.jpg",
    "/corporate/real-team-games.jpg",
    "/people_playing.jpg",
    "/peopleplaying.jpg",
    "/gamenight1.jpg",
    "/funatcafe.jpg",
    "/event1.jpg",
  ];

  const trustPoints = [
    {
      number: "01",
      title: "Zero Prep Required",
      description: "We handle everything. You just show up and play.",
    },
    {
      number: "02",
      title: "Flexible Formats",
      description: "From 30 minutes to full-day experiences.",
    },
    {
      number: "03",
      title: "Proven Results",
      description: "Teams report 85% higher engagement scores.",
    },
    {
      number: "04",
      title: "Scalable Solutions",
      description: "Works for 10 people or 1000+.",
    },
  ];

  return (
    <>
      <ExperienceHero
        category="CORPORATE ENGAGEMENT"
        headline="Team Building That Doesn't Suck"
        subheadline="Replace boring meetings with experiences your team will actually remember"
        ctaText="Plan Your Experience"
        ctaHref="#enquiry"
        backgroundGradient="from-[#FFF4D6] via-[#FFE8B3] to-[#F4C752]/40"
        decorations={
          <>
            {/* Briefcase */}
            <svg className="absolute top-20 right-20 w-20 h-20 text-[#F4C752]/30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v5c0 .75.4 1.38 1 1.73V19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-3.28c.59-.35 1-.99 1-1.72V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zM4 9h16v5h-5v-3H9v3H4V9zm9 6h-2v-2h2v2zm6 4H5v-3h4v1h6v-1h4v3z" />
            </svg>
            {/* Lightbulb */}
            <svg className="absolute bottom-32 left-16 w-16 h-16 text-[#F4C752]/25" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
            </svg>
            {/* Users/Team */}
            <svg className="absolute top-1/2 right-1/3 w-24 h-24 text-[#F4C752]/20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </>
        }
      />

      <ProblemCards
        sectionTitle="Why Traditional Team Events Fail"
        cards={problemCards}
      />

      <SolutionCards
        sectionTitle="How We Make Teams Click"
        cards={solutionCards}
      />

      <ExperienceFormats
        sectionTitle="Choose Your Format"
        formats={formats}
      />

      <MomentsGallery
        sectionTitle="Real Teams, Real Fun"
        images={galleryImages}
      />

      <TrustSection
        sectionTitle="Why Companies Choose Us"
        points={trustPoints}
      />

      <div id="enquiry">
        <EnquiryForm
          headline="Let's Build Something Great Together"
          subtext="Tell us about your team and we'll craft the perfect experience"
          ctaText="Get Your Custom Proposal"
          experienceType="corporate"
        />
      </div>
    </>
  );
}
