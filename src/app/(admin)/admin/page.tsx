
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Calendar, Gift, AlertCircle } from "lucide-react";
import { getDashboardStats } from "@/actions/admin/get-dashboard-stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalRevenue}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.salesCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Points Distributed</CardTitle>
                        <Gift className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pointsDistributed}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>Review upcoming events and pending actions.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-4 rounded-md border p-4">
                                    <Calendar className="h-6 w-6 text-primary" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Upcoming Events
                                        </p>
                                        <p className="text-2xl font-bold">{stats.upcomingEventsCount}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-md border p-4">
                                    <AlertCircle className="h-6 w-6 text-red-500" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            New Enquiries
                                        </p>
                                        <p className="text-2xl font-bold">{stats.pendingEnquiriesCount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-md border p-4 flex items-center justify-center h-[200px] text-muted-foreground bg-muted/50">
                                Revenue Chart Placeholder (Add Recharts later)
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>Latest completed orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {stats.recentSales.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No recent sales.</p>
                            ) : (
                                stats.recentSales.map((sale) => (
                                    <div key={sale.id} className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={sale.image || ""} alt={sale.name} />
                                            <AvatarFallback>{sale.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{sale.name}</p>
                                            <p className="text-sm text-muted-foreground">{sale.email}</p>
                                        </div>
                                        <div className="ml-auto font-medium">{sale.amount}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
