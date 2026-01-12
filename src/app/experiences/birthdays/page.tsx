import ExperienceHero from "@/components/experiences/ExperienceHero";
import ProblemCards from "@/components/experiences/ProblemCards";
import SolutionCards from "@/components/experiences/SolutionCards";
import ExperienceFormats from "@/components/experiences/ExperienceFormats";
import MomentsGallery from "@/components/experiences/MomentsGallery";
import TrustSection from "@/components/experiences/TrustSection";
import EnquiryForm from "@/components/experiences/EnquiryForm";

export default function BirthdaysPage() {
    const problemCards = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: "Same old routine",
            description: "Cake, candles, done. Nothing special or memorable.",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Guests don't mix",
            description: "Friends and family stay in separate groups",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Kids get bored fast",
            description: "30 minutes of fun, then chaos",
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "No standout moments",
            description: "Generic party that looks like everyone else's",
        },
    ];

    const solutionCards = [
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            title: "Non-Stop Fun",
            highlight: "Energy All Day",
            description:
                "Keep the party alive from start to finish. Games that adapt to your crowd and keep everyone engaged, laughing, and making memories.",
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: "Everyone Connects",
            highlight: "Inclusive Play",
            description:
                "Break the ice naturally. Watch different friend groups and family members bond over shared fun and friendly competition.",
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            title: "Your Style, Your Way",
            highlight: "Personalized",
            description:
                "From superhero themes to elegant adult celebrations, we customize everything to match your personality and vision.",
        },
    ];

    const formats = [
        {
            title: "Kids Birthday Parties",
            whatItIs: "High-energy game zones designed for young adventurers",
            whenItWorks: "Ages 5-15, home parties, venue celebrations",
            whoItsFor: "Parents wanting stress-free, memorable kids' parties",
            imagePath: "/birthdays/kids-party.jpg",
        },
        {
            title: "Adult Celebrations",
            whatItIs: "Sophisticated game experiences for grown-up gatherings",
            whenItWorks: "Milestone birthdays, surprise parties, friend reunions",
            whoItsFor: "Adults who want more than dinner and drinks",
            imagePath: "/birthdays/adult-party.jpg",
        },
        {
            title: "Family Gatherings",
            whatItIs: "Multi-generational games everyone can enjoy together",
            whenItWorks: "Big family birthdays, anniversary celebrations",
            whoItsFor: "Families wanting quality time and togetherness",
            imagePath: "/birthdays/family-party.jpg",
        },
    ];

    const galleryImages = [
        "/people_playing.jpg",
        "/peopleplaying.jpg",
        "/gamenight1.jpg",
        "/funatcafe.jpg",
        "/event1.jpg",
        "/mehfil2.jpg",
        "/IMG_9307.jpg",
        "/DMD.jpg",
    ];

    const trustPoints = [
        {
            number: "01",
            title: "Hassle-Free Hosting",
            description: "We bring, set up, manage, and pack. You just enjoy.",
        },
        {
            number: "02",
            title: "Age-Appropriate Fun",
            description: "Games tailored to your guest age range.",
        },
        {
            number: "03",
            title: "Flexible Packages",
            description: "2 hours to full-day experiences. Your call.",
        },
        {
            number: "04",
            title: "Memory Makers",
            description: "Parties people remember and talk about.",
        },
    ];

    return (
        <>
            <ExperienceHero
                category="BIRTHDAY CELEBRATIONS"
                headline="Birthdays Worth Remembering"
                subheadline="Create moments of pure joy that your guests will cherish forever"
                ctaText="Plan Your Party"
                ctaHref="#enquiry"
                backgroundGradient="from-[#FFF4D6] via-[#FFE8B3] to-[#F4C752]/40"
                accentColor="#F4C752"
                decorations={
                    <>
                        {/* Party Hat */}
                        <svg className="absolute top-20 right-28 w-20 h-20 text-[#F4C752]/35" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L3 14h18L12 2zm0 4.5L17.5 13h-11L12 6.5z" />
                            <circle cx="12" cy="4" r="1.5" />
                            <rect x="2" y="20" width="20" height="2" rx="1" />
                        </svg>
                        {/* Birthday Cake */}
                        <svg className="absolute bottom-32 left-24 w-24 h-24 text-[#F4C752]/30" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z" />
                        </svg>
                        {/* Balloon */}
                        <svg className="absolute top-1/3 right-1/4 w-16 h-16 text-[#F4C752]/28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {/* Gift */}
                        <svg className="absolute top-1/2 left-1/3 w-18 h-18 text-[#F4C752]/25" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                        </svg>
                    </>
                }
            />

            <ProblemCards
                sectionTitle="Why Most Parties Fall Flat"
                cards={problemCards}
            />

            <SolutionCards
                sectionTitle="How We Bring the Magic"
                cards={solutionCards}
            />

            <ExperienceFormats
                sectionTitle="Find Your Perfect Party"
                formats={formats}
            />

            <MomentsGallery
                sectionTitle="Pure Joy in Action"
                images={galleryImages}
            />

            <TrustSection
                sectionTitle="Why Families Choose Us"
                points={trustPoints}
            />

            <div id="enquiry">
                <EnquiryForm
                    headline="Let's Create Your Perfect Celebration"
                    subtext="Tell us your vision and we'll make it unforgettable"
                    ctaText="Book Your Birthday Experience"
                    experienceType="birthday"
                />
            </div>
        </>
    );
}
