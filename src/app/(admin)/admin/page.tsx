
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Calendar, Gift, AlertCircle } from "lucide-react";
import { getDashboardStats } from "@/actions/admin/get-dashboard-stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#2E2A24]">Dashboard</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-2xl border-none shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-[#F4A300]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#2E2A24]">{stats.totalRevenue}</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-[#F4A300]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#2E2A24]">{stats.activeUsers}</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-[#F4A300]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#2E2A24]">{stats.salesCount}</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Points Distributed</CardTitle>
                        <Gift className="h-4 w-4 text-[#F4A300]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#2E2A24]">{stats.pointsDistributed}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 space-y-4">
                    <Card className="rounded-3xl border-none shadow-xl bg-white">
                        <CardHeader>
                            <CardTitle className="text-xl text-[#2E2A24]">Overview</CardTitle>
                            <CardDescription>Review upcoming events and pending actions.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-4 rounded-2xl border-2 border-dashed border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                                    <Calendar className="h-6 w-6 text-[#F4A300]" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none text-gray-500">
                                            Upcoming Events
                                        </p>
                                        <p className="text-2xl font-bold text-[#2E2A24]">{stats.upcomingEventsCount}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl border-2 border-dashed border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                                    <AlertCircle className="h-6 w-6 text-red-500" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none text-gray-500">
                                            New Enquiries
                                        </p>
                                        <p className="text-2xl font-bold text-[#2E2A24]">{stats.pendingEnquiriesCount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border-2 border-dashed border-gray-100 p-4 flex items-center justify-center h-[200px] text-gray-400 bg-gray-50/50">
                                Revenue Chart Placeholder (Add Recharts later)
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-3 rounded-3xl border-none shadow-xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl text-[#2E2A24]">Recent Sales</CardTitle>
                        <CardDescription>Latest completed orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {stats.recentSales.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No recent sales.</p>
                            ) : (
                                stats.recentSales.map((sale) => (
                                    <div key={sale.id} className="flex items-center p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                            <AvatarImage src={sale.image || ""} alt={sale.name} />
                                            <AvatarFallback className="bg-[#FFF4D6] text-[#F4A300]">{sale.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-semibold leading-none text-[#2E2A24]">{sale.name}</p>
                                            <p className="text-xs text-gray-500">{sale.email}</p>
                                        </div>
                                        <div className="ml-auto font-bold text-[#2E2A24]">{sale.amount}</div>
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
