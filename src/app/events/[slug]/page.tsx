import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EventRegistrationButton } from "@/components/event-registration-button";
import { CalendarDays, MapPin, Clock, Users, Star } from "lucide-react";
import Image from "next/image";
import { TicketView } from "@/components/ticket-view";
import { getEventReviews } from "@/actions/review-actions"; // Ensure this is imported
import { EventReviewForm } from "@/components/event-review-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function EventDetailPage({ params }: PageProps) {
    const session = await auth();
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    // Fetch Event + Reviews
    const event = await db.event.findUnique({
        where: { slug: decodedSlug },
        include: {
            registrations: {
                where: {
                    userId: session?.user?.id || ""
                }
            },
            reviews: {
                include: { user: true },
                orderBy: { createdAt: 'desc' }
            },
            _count: {
                select: { registrations: true }
            }
        }
    });

    if (!event || !event.isActive) {
        notFound();
    }

    const userRegistration = event.registrations[0];
    const isRegistered = !!userRegistration;
    const isFull = event.capacity ? event._count.registrations >= event.capacity : false;
    // Enhanced "Past" check: if endTime exists use it, else if startTime is > 24h ago
    const isPast = event.endTime
        ? new Date(event.endTime) < new Date()
        : (new Date(event.startTime).getTime() + 86400000 < Date.now());

    const isOngoing = !isPast && new Date(event.startTime) <= new Date();

    let userData = null;
    if (session?.user?.id) {
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { name: true, email: true, phoneNumber: true }
        });
        if (user) {
            userData = {
                name: user.name,
                email: user.email,
                contact: user.phoneNumber
            };
        }
    }

    return (
        <div className="min-h-screen bg-[#FFF4D6] px-6 pt-28 pb-20">
            <div className="max-w-5xl mx-auto space-y-10">

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                    {/* Hero Image */}
                    {event.image ? (
                        <div className="relative h-64 md:h-96 w-full">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                            />
                            {isPast && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <h2 className="text-4xl font-bold text-white border-4 border-white px-6 py-2 rounded-xl transform -rotate-6">PAST EVENT</h2>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                            <span className="text-4xl">🎉</span>
                        </div>
                    )}

                    <div className="p-8 md:p-12 space-y-8">
                        {/* Header Info */}
                        <div>
                            <div className="flex flex-wrap gap-4 mb-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {event.type.replace("_", " ")}
                                </span>
                                {event.isFeatured && (
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                                )}
                                {isOngoing && (
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">Happening Now</span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E2A24]">{event.title}</h1>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#5A554B]">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="w-6 h-6 text-[#F4A300]" />
                                <div>
                                    <p className="font-semibold">Date</p>
                                    <p>{new Date(event.startTime).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-6 h-6 text-[#F4A300]" />
                                <div>
                                    <p className="font-semibold">Time</p>
                                    <p>
                                        {new Date(event.startTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        {event.endTime && ` - ${new Date(event.endTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-6 h-6 text-[#F4A300]" />
                                <div>
                                    <p className="font-semibold">Location</p>
                                    <p>{event.venue || "TBA"}</p>
                                    <p className="text-sm">{event.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="w-6 h-6 text-[#F4A300]" />
                                <div>
                                    <p className="font-semibold">Capacity</p>
                                    <p>{event.capacity ? `${event._count.registrations} / ${event.capacity} Registered` : "Open Limit"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose max-w-none text-[#4B463D]">
                            <h3 className="text-2xl font-bold mb-4">About Event</h3>
                            <p className="whitespace-pre-line leading-relaxed">{event.description || "No description provided."}</p>
                        </div>

                        {/* Registration Section */}
                        {!isPast && (
                            <div className="border-t pt-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div>
                                        <p className="text-lg font-medium text-[#5A554B]">Ticket Price</p>
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-3xl font-bold text-[#2E2A24]">
                                                {Number(event.ticketPrice) > 0 ? `₹${Number(event.ticketPrice)}` : "Free"}
                                            </p>
                                            {event.pointReward && (
                                                <span className="text-green-600 font-medium text-sm">
                                                    +{Number(event.pointReward)} Points Reward
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto">
                                        {isRegistered && userRegistration.paymentStatus === "PAID" ? (
                                            <div className="space-y-4 text-center">
                                                <div className="p-4 bg-green-100 text-green-800 rounded-lg font-medium">
                                                    ✅ Registration Confirmed
                                                </div>
                                                {userRegistration.ticketCode && (
                                                    <div className="text-sm text-muted-foreground">
                                                        Ticket: <span className="font-mono font-bold">{userRegistration.ticketCode}</span>
                                                    </div>
                                                )}
                                                <TicketView event={event} ticketCode={userRegistration.ticketCode || ""} userName={session?.user?.name || ""} />
                                            </div>
                                        ) : (
                                            event.isRegistrationOpen ? (
                                                <div className="w-full md:w-auto">
                                                    <EventRegistrationButton
                                                        eventId={event.id}
                                                        price={event.ticketPrice ? Number(event.ticketPrice) : 0}
                                                        isRegistered={isRegistered}
                                                        isFull={isFull}
                                                        isActive={event.isActive && !event.isCancelled}
                                                        isPast={isPast}
                                                        userData={userData || undefined}
                                                    />
                                                    {event.isCancelled && <p className="text-red-500 mt-2 font-medium">Event Cancelled</p>}
                                                </div>
                                            ) : (
                                                <div className="p-4 bg-gray-200 text-gray-600 rounded-lg font-medium text-center">
                                                    Registration Closed
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* GALLERY SECTON (If images exist) */}
                {event.galleryImages && event.galleryImages.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-[#2E2A24]">Event Gallery 📸</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {event.galleryImages.map((src, i) => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform">
                                    <Image src={src} alt={`Gallery ${i}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* REVIEWS SECTION */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md">
                    <h2 className="text-3xl font-bold text-[#2E2A24] mb-8">Reviews & Memories 💭</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Write Review Column */}
                        <div className="space-y-6">
                            {session?.user ? (
                                isPast || isRegistered ? (
                                    <EventReviewForm eventId={event.id} />
                                ) : (
                                    <div className="p-6 bg-gray-50 rounded-xl text-center text-muted-foreground">
                                        Join our events to share your experience!
                                    </div>
                                )
                            ) : (
                                <div className="p-6 bg-gray-50 rounded-xl text-center">
                                    <p className="mb-4">Login to leave a review</p>
                                    <a href="/login" className="text-primary underline font-medium">Login Now</a>
                                </div>
                            )}
                        </div>

                        {/* Reviews List Column */}
                        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                            {event.reviews.length === 0 ? (
                                <p className="text-muted-foreground italic">No reviews yet. Be the first!</p>
                            ) : (
                                event.reviews.map((review) => (
                                    <div key={review.id} className="bg-gray-50 p-4 rounded-xl space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={review.user.image || ""} />
                                                <AvatarFallback>{review.user.name?.[0] || "?"}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-semibold">{review.user.name}</p>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="ml-auto text-xs text-muted-foreground">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm">{review.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
