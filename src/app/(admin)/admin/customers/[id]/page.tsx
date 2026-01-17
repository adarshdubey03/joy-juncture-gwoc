import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCustomerDetails } from "@/actions/admin/customer-details";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TransactionTable } from "@/components/admin/rewards/transaction-table";
import { Mail, Phone, Calendar, MapPin, Package, Wallet, Edit, Shield } from "lucide-react";

export default async function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const customer = await getCustomerDetails(id);

    if (!customer) {
        notFound();
    }

    return (
        <div className="space-y-6 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                        <AvatarImage src={customer.image || ""} />
                        <AvatarFallback className="text-xl bg-[#F4A300] text-white">
                            {customer.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold text-[#2E2A24]">{customer.name}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <Mail className="h-4 w-4" />
                            <span>{customer.email}</span>
                            <Badge variant="outline" className="ml-2 capitalize">
                                {customer.role.toLowerCase().replace("_", " ")}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Shield className="mr-2 h-4 w-4" /> Reset Password
                    </Button>
                    <Button>
                        <Edit className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="rounded-2xl shadow-sm border-none bg-white/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                        <span className="font-bold text-lg text-[#2E2A24]">{formatCurrency(customer.totalSpent)}</span>
                    </CardHeader>
                </Card>
                <Card className="rounded-2xl shadow-sm border-none bg-white/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Values Orders</CardTitle>
                        <span className="font-bold text-lg text-[#2E2A24]">{customer.totalOrders}</span>
                    </CardHeader>
                </Card>
                <Card className="rounded-2xl shadow-sm border-none bg-white/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Wallet Balance</CardTitle>
                        <span className="font-bold text-lg text-[#F4A300] flex items-center gap-1">
                            <Wallet className="h-4 w-4" />
                            {Number(customer.wallet?.balance || 0).toLocaleString()}
                        </span>
                    </CardHeader>
                </Card>
                <Card className="rounded-2xl shadow-sm border-none bg-white/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Joined</CardTitle>
                        <span className="font-medium text-sm text-[#2E2A24]">
                            {format(new Date(customer.createdAt), "MMM d, yyyy")}
                        </span>
                    </CardHeader>
                </Card>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-white/50 p-1 rounded-xl">
                    <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                    <TabsTrigger value="orders" className="rounded-lg">Orders</TabsTrigger>
                    <TabsTrigger value="wallet" className="rounded-lg">Wallet & Points</TabsTrigger>
                    <TabsTrigger value="events" className="rounded-lg">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="rounded-3xl border-none shadow-md">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                                        <p className="text-sm">{customer.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                        <p className="text-sm">{customer.phoneNumber || "Not provided"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Address</p>
                                        <p className="text-sm text-muted-foreground italic">Address management separate</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-none shadow-md">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {customer.orders.slice(0, 3).map((order) => (
                                        <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <Package className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Placed Order #{order.id.slice(-6)}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {format(new Date(order.createdAt), "MMM d, h:mm a")}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant="outline">{order.status}</Badge>
                                        </div>
                                    ))}
                                    {customer.orders.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No recent activity.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="orders" className="mt-6">
                    <Card className="rounded-3xl border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>Recent orders placed by this customer</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {customer.orders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="grid gap-1">
                                            <div className="font-medium">Order #{order.id}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {format(new Date(order.createdAt), "PPP")} · {order.itemCount} items
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={order.paymentStatus === 'PAID' ? 'default' : 'secondary'}>
                                                {order.paymentStatus}
                                            </Badge>
                                            <div className="font-bold">{formatCurrency(Number(order.total))}</div>
                                            <Button size="sm" variant="ghost">View</Button>
                                        </div>
                                    </div>
                                ))}
                                {customer.orders.length === 0 && (
                                    <div className="text-center py-12 text-muted-foreground">
                                        No orders found for this customer.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="wallet" className="mt-6">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">Wallet Transactions</h3>
                            {/* Note: We could add the PointAdjustmentDialog here too, pre-filled with this user ID! */}
                        </div>
                        {/* We reuse the table, passing the formatted transactions */}
                        <TransactionTable transactions={customer.recentTransactions} />
                    </div>
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                    <Card className="rounded-3xl border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Event Registrations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {customer.eventRegistrations.map((reg) => (
                                    <div key={reg.id} className="flex gap-4 p-4 border rounded-2xl">
                                        <div className="h-16 w-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            {reg.event.image ? (
                                                <img src={reg.event.image} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                                                    <Calendar className="h-6 w-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold line-clamp-1">{reg.event.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(reg.event.startTime), "PPP p")}
                                            </p>
                                            <div className="mt-2 text-xs">
                                                Registered: {format(new Date(reg.registeredAt), "MMM d")}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {customer.eventRegistrations.length === 0 && (
                                    <div className="col-span-2 text-center py-8 text-muted-foreground">
                                        No event registrations found.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
