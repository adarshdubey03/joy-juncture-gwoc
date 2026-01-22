import { CalendarDays, MapPin, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getUpcomingEvents } from "@/actions/event-actions";
import { format } from "date-fns"; // Standardizing date format if available, else native

export default async function UpcomingEventsPage() {
  const { data: events = [] } = await getUpcomingEvents();

  return (
    <div className="min-h-screen bg-[#FFF4D6] px-6 pt-28 pb-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E2A24] flex items-center justify-center gap-3 font-fredoka">
          Upcoming Events <Sparkles className="w-8 h-8 text-[#F4A300]" />
        </h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Game nights, puzzles, laughter, and unforgettable experiences — join
          the fun at Joy Juncture!
        </p>
      </div>

      {/* Events List */}
      <div className="max-w-5xl mx-auto grid gap-10">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-neutral-100"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#2E2A24] font-fredoka">
                    {event.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-6 text-sm text-[#6B655A] font-medium">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#F4A300]" />
                      {new Date(event.startTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {event.endTime && ` • ${new Date(event.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - ${new Date(event.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
                      {!event.endTime && ` • ${new Date(event.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F4A300]" />
                      {event.location || "Joy Juncture Studio"}
                    </span>
                  </div>

                  <p className="mt-4 text-neutral-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center gap-2 bg-[#F4A300] text-[#2E2A24] font-bold px-8 py-4 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all"
                  >
                    Register Now <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty State
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-neutral-300">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <CalendarDays size={32} />
            </div>
            <h3 className="text-xl font-bold text-neutral-700 font-fredoka">No upcoming events scheduled</h3>
            <p className="text-neutral-500 mt-2">Check back soon for new game nights!</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto text-center mt-24">
        <h3 className="text-2xl font-bold text-[#2E2A24] font-fredoka">
          Earn JJ Points by Participating 🎁
        </h3>
        <p className="mt-3 text-[#5A554B]">
          Every event you attend brings you closer to rewards, discounts, and
          exclusive games.
        </p>
        <Link
          href="/wallet"
          className="inline-block mt-8 bg-[#2E2A24] text-white font-bold px-8 py-3 rounded-full hover:opacity-90 shadow-lg"
        >
          View My Wallet
        </Link>
      </div>
    </div>
  );
}
