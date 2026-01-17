import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProfileContent from "@/components/profile/ProfileContent";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Parallel data fetching for performance
  const [userData, orders, eventRegistrations, puzzleAttempts] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      include: {
        wallet: true,
        receivedPoints: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        }
      }
    }),
    db.order.findMany({
      where: { userId: session.user.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true // items already contain snapshot data (productName, productImage, etc.)
      }
    }),
    db.eventRegistration.findMany({
      where: { userId: session.user.id },
      take: 5, // Increased limit
      orderBy: { registeredAt: 'desc' },
      include: { event: true }
    }),
    db.puzzleAttempt.findMany({
      where: { userId: session.user.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { puzzle: true }
    })
  ]);

  if (!userData) {
    redirect("/login");
  }

  // Transform data for Client Component (Decimal -> Number)
  const formattedUser = {
    name: userData.name,
    email: userData.email,
    image: userData.image,
    phoneNumber: userData.phoneNumber,
    createdAt: userData.createdAt,
    wallet: userData.wallet ? { ...userData.wallet, balance: Number(userData.wallet.balance) } : null,
  };

  const formattedOrders = orders.map(order => ({
    id: order.id,
    status: order.status,
    totalAmount: Number(order.totalAmount),
    createdAt: order.createdAt,
    items: order.items.map(item => ({
      id: item.id,
      productName: item.productName,
      productImage: item.productImage,
      quantity: item.quantity
    }))
  }));

  const formattedPoints = userData.receivedPoints.map(point => ({
    id: point.id,
    amount: Number(point.amount),
    reason: point.reason,
    createdAt: point.createdAt,
    description: point.description
  }));

  const formattedEvents = eventRegistrations.map(reg => ({
    id: reg.id,
    ticketCode: reg.ticketCode, // Include ticket code
    event: {
      title: reg.event.title,
      description: reg.event.description,
      type: reg.event.type,
      startTime: reg.event.startTime,
      slug: reg.event.slug, // Include slug for linking
      image: reg.event.image // Include image
    }
  }));

  const formattedPuzzles = puzzleAttempts.map(att => ({
    id: att.id,
    isCorrect: att.isCorrect,
    puzzle: {
      title: att.puzzle.title
    }
  }));

  async function handleSignOut() {
    "use server";
    await signOut();
  }

  return (
    <ProfileContent
      user={formattedUser}
      orders={formattedOrders}
      points={formattedPoints}
      events={formattedEvents}
      puzzles={formattedPuzzles}
      onSignOut={handleSignOut}
    />
  );
}
