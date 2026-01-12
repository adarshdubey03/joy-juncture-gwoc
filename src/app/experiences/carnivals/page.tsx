import ExperienceHero from "@/components/experiences/ExperienceHero";
import ProblemCards from "@/components/experiences/ProblemCards";
import SolutionCards from "@/components/experiences/SolutionCards";
import ExperienceFormats from "@/components/experiences/ExperienceFormats";
import MomentsGallery from "@/components/experiences/MomentsGallery";
import TrustSection from "@/components/experiences/TrustSection";
import EnquiryForm from "@/components/experiences/EnquiryForm";

export default function CarnivalsPage() {
    const problemCards = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Crowd control chaos",
            description: "Long lines, bottlenecks, frustrated attendees",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Low engagement zones",
            description: "Dead spots where energy drops and people leave",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            title: "Safety concerns",
            description: "Managing large crowds without proper flow",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
            ),
            title: "Poor ROI",
            description: "High costs but attendees don't stay or return",
        },
    ];

    const solutionCards = [
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            title: "Scalable Systems",
            highlight: "1000+ Capacity",
            description:
                "Proven infrastructure for massive crowds. Multiple game zones, optimized flow, and professional crowd management that keeps energy high.",
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Non-Stop Energy",
            highlight: "Zero Downtime",
            description:
                "Strategic game placement ensures constant engagement. No dead zones, no boredom. Every corner of your event buzzes with activity.",
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Safe & Smooth",
            highlight: "Professional Ops",
            description:
                "Trained staff, safety protocols, and crowd flow design. We handle the logistics so you can focus on the big picture.",
        },
    ];

    const formats = [
        {
            title: "Community Festivals",
            whatItIs: "Large-scale game zones for public celebrations",
            whenItWorks: "City festivals, cultural events, holiday celebrations",
            whoItsFor: "Event organizers planning for 500+ attendees",
            imagePath: "/carnivals/real-event.jpg",
        },
        {
            title: "College Fests",
            whatItIs: "High-energy game arenas for student events",
            whenItWorks: "Annual fests, sports days, cultural weeks",
            whoItsFor: "Universities and colleges wanting epic experiences",
            imagePath: "/carnivals/college-fest.jpg",
        },
        {
            title: "Corporate Mega Events",
            whatItIs: "Enterprise-scale entertainment for massive gatherings",
            whenItWorks: "Annual days, product launches, employee celebrations",
            whoItsFor: "Large companies hosting 1000+ people",
            imagePath: "/carnivals/corporate-mega.jpg",
        },
    ];

    const galleryImages = [
        "/carnivals/real-event.jpg",
        "/people_playing.jpg",
        "/peopleplaying.jpg",
        "/gamenight1.jpg",
        "/funatcafe.jpg",
        "/event1.jpg",
        "/mehfil2.jpg",
        "/IMG_9307.jpg",
    ];

    const trustPoints = [
        {
            number: "01",
            title: "Proven at Scale",
            description: "Successfully managed events with 5000+ attendees.",
        },
        {
            number: "02",
            title: "Turnkey Solutions",
            description: "Complete setup, staffing, and breakdown included.",
        },
        {
            number: "03",
            title: "Flexible Configurations",
            description: "Adapt to any venue size or layout.",
        },
        {
            number: "04",
            title: "Data & Insights",
            description: "Post-event analytics on engagement and flow.",
        },
    ];

    return (
        <>
            <ExperienceHero
                category="LARGE-SCALE EVENTS"
                headline="Carnivals That Command Attention"
                subheadline="Transform massive gatherings into unforgettable experiences with professional-grade entertainment"
                ctaText="Scale Your Event"
                ctaHref="#enquiry"
                backgroundGradient="from-[#FFF4D6] via-[#FFE8B3] to-[#F4C752]/40"
                accentColor="#F4C752"
                decorations={
                    <>
                        {/* Ferris Wheel */}
                        <svg className="absolute top-16 right-20 w-24 h-24 text-[#F4C752]/30" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="12" cy="2" r="1.5" />
                            <circle cx="12" cy="22" r="1.5" />
                            <circle cx="2" cy="12" r="1.5" />
                            <circle cx="22" cy="12" r="1.5" />
                            <circle cx="5.5" cy="5.5" r="1.5" />
                            <circle cx="18.5" cy="18.5" r="1.5" />
                            <circle cx="18.5" cy="5.5" r="1.5" />
                            <circle cx="5.5" cy="18.5" r="1.5" />
                            <line x1="12" y1="12" x2="12" y2="2" stroke="currentColor" strokeWidth="1" />
                            <line x1="12" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" />
                            <line x1="12" y1="12" x2="12" y2="22" stroke="currentColor" strokeWidth="1" />
                            <line x1="12" y1="12" x2="2" y2="12" stroke="currentColor" strokeWidth="1" />
                        </svg>
                        {/* Carnival Tent */}
                        <svg className="absolute bottom-28 left-16 w-20 h-20 text-[#F4C752]/35" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z" />
                            <path d="M12 6v12M8 14l8-4M8 10l8 4" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </svg>
                        {/* Flags */}
                        <svg className="absolute top-1/3 right-1/3 w-16 h-16 text-[#F4C752]/28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
                        </svg>
                        {/* Ticket */}
                        <svg className="absolute top-1/2 left-1/4 w-18 h-18 text-[#F4C752]/25" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9-1.5c0 .83-.67 1.5-1.5 1.5S10 9.33 10 8.5 10.67 7 11.5 7s1.5.67 1.5 1.5zm0 7c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM13 12c0 .83-.67 1.5-1.5 1.5S10 12.83 10 12s.67-1.5 1.5-1.5S13 11.17 13 12z" />
                        </svg>
                    </>
                }
            />

            <ProblemCards
                sectionTitle="Why Large Events Struggle"
                cards={problemCards}
            />

            <SolutionCards
                sectionTitle="How We Handle the Crowds"
                cards={solutionCards}
            />

            <ExperienceFormats
                sectionTitle="Built for Scale"
                formats={formats}
            />

            <MomentsGallery
                sectionTitle="Epic Events in Action"
                images={galleryImages}
            />

            <TrustSection
                sectionTitle="Why Organizers Trust Us"
                points={trustPoints}
            />

            <div id="enquiry">
                <EnquiryForm
                    headline="Let's Build Something Epic"
                    subtext="Share your event details and we'll design the perfect large-scale experience"
                    ctaText="Get Your Event Proposal"
                    experienceType="carnival"
                />
            </div>
        </>
    );
}
