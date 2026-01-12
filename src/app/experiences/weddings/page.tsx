import ExperienceHero from "@/components/experiences/ExperienceHero";
import ProblemCards from "@/components/experiences/ProblemCards";
import SolutionCards from "@/components/experiences/SolutionCards";
import ExperienceFormats from "@/components/experiences/ExperienceFormats";
import MomentsGallery from "@/components/experiences/MomentsGallery";
import TrustSection from "@/components/experiences/TrustSection";
import EnquiryForm from "@/components/experiences/EnquiryForm";

export default function WeddingsPage() {
    const problemCards = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            title: "Guests just watch",
            description: "Beautiful ceremony, but guests are passive observers",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "Everyone's on phones",
            description: "People scrolling instead of connecting",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Awkward downtime",
            description: "Dead zones between events where guests feel lost",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: "Forgettable reception",
            description: "Same old dinner and dance routine",
        },
    ];

    const solutionCards = [
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            title: "Interactive Celebrations",
            highlight: "Guest Engagement",
            description:
                "Transform your wedding into an experience where every guest feels part of the celebration. Games that bring strangers together and create lasting memories.",
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: "Memorable Moments",
            highlight: "Photo-Worthy",
            description:
                "Create Instagram-worthy moments that guests will talk about for years. Your wedding becomes the one everyone remembers.",
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Elegant & Fun",
            highlight: "Premium Quality",
            description:
                "Sophisticated entertainment that matches your wedding aesthetic. Classy, beautiful, and incredibly fun.",
        },
    ];

    const formats = [
        {
            title: "Cocktail Hour Games",
            whatItIs: "Elegant lawn games and interactive stations during pre-ceremony",
            whenItWorks: "Guest arrival, cocktail hour, photo session gaps",
            whoItsFor: "Couples wanting to keep guests entertained and mingling",
            imagePath: "/weddings/cocktail-games.jpg",
        },
        {
            title: "Reception Entertainment",
            whatItIs: "Full evening of interactive games woven into your celebration",
            whenItWorks: "Between dinner courses, after first dance, late night",
            whoItsFor: "Couples planning unforgettable receptions",
            imagePath: "/weddings/real-wedding-games.jpg",
        },
        {
            title: "Mehendi & Sangeet Specials",
            whatItIs: "Traditional celebrations elevated with interactive games",
            whenItWorks: "Pre-wedding functions, family gatherings",
            whoItsFor: "Multi-day celebrations wanting variety",
            imagePath: "/weddings/mehendi.jpg",
        },
    ];

    const galleryImages = [
        "/weddings/real-wedding-games.jpg",
        "/BrideGroom.png",
        "/mehfil2.jpg",
        "/event1.jpg",
        "/people_playing.jpg",
        "/peopleplaying.jpg",
        "/funatcafe.jpg",
        "/IMG_9307.jpg",
    ];

    const trustPoints = [
        {
            number: "01",
            title: "Seamless Integration",
            description: "Fits perfectly into your wedding timeline and theme.",
        },
        {
            number: "02",
            title: "All Ages Welcome",
            description: "Games that grandparents and kids both enjoy.",
        },
        {
            number: "03",
            title: "Stress-Free Setup",
            description: "We coordinate with your planner. Zero hassle for you.",
        },
        {
            number: "04",
            title: "Premium Presentation",
            description: "Beautiful setups that enhance your décor.",
        },
    ];

    return (
        <>
            <ExperienceHero
                category="WEDDING EXPERIENCES"
                headline="Weddings Guests Actually Enjoy"
                subheadline="Turn your celebration into an unforgettable experience everyone talks about"
                ctaText="Make It Memorable"
                ctaHref="#enquiry"
                backgroundGradient="from-[#FFF4D6] via-[#FFE8B3] to-[#F4C752]/40"
                accentColor="#F4C752"
                decorations={
                    <>
                        {/* Heart */}
                        <svg className="absolute top-24 right-24 w-20 h-20 text-[#F4C752]/30" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {/* Rings */}
                        <svg className="absolute bottom-28 left-20 w-24 h-24 text-[#F4C752]/25" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
                        </svg>
                        {/* Sparkles */}
                        <svg className="absolute top-1/3 right-1/4 w-16 h-16 text-[#F4C752]/35" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6z" />
                        </svg>
                        {/* Small heart */}
                        <svg className="absolute top-1/2 left-1/4 w-12 h-12 text-[#F4C752]/20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </>
                }
            />

            <ProblemCards
                sectionTitle="Why Wedding Guests Get Bored"
                cards={problemCards}
            />

            <SolutionCards
                sectionTitle="How We Create Magic"
                cards={solutionCards}
            />

            <ExperienceFormats
                sectionTitle="Perfect for Every Moment"
                formats={formats}
            />

            <MomentsGallery
                sectionTitle="Celebrations That Shine"
                images={galleryImages}
            />

            <TrustSection
                sectionTitle="Why Couples Love Us"
                points={trustPoints}
            />

            <div id="enquiry">
                <EnquiryForm
                    headline="Let's Make Your Day Extraordinary"
                    subtext="Share your vision and we'll create the perfect entertainment experience"
                    ctaText="Start Planning Your Celebration"
                    experienceType="wedding"
                />
            </div>
        </>
    );
}
