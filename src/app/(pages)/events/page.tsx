import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EventsList } from "@/components/events/events-list";
import { PastEvents } from "@/components/events/past-events";

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-primary text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Join the <span className="text-accent">Fun</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From competitive tournaments to casual meetups, there's always something happening at Joy Juncture.
                    </p>
                </div>
            </section>

            <EventsList />
            <PastEvents />
            <Footer />
        </main>
    );
}
