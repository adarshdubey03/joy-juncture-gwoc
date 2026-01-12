import { getOrder } from "@/actions/admin/order-actions";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, CreditCard, MapPin, Package, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrderPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const order = await getOrder(id);

    if (!order) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/orders" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold tracking-tight">Order {order.id.substring(0, 8)}</h2>
                    <p className="text-muted-foreground">
                        Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                </div>
                <Badge variant="outline" className="text-lg px-4 py-1">
                    {order.status}
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LEFT COLUMN */}
                <div className="md:col-span-2 space-y-6">
                    {/* Items */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Order Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between py-4 border-b last:border-0">
                                        <div className="flex gap-4">
                                            {/* Could add product image here if available in item/product relation */}
                                            <div className="bg-neutral-100 w-16 h-16 rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                                Image
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.productName}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Qty: {item.quantity} × {formatCurrency(Number(item.unitPrice))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="font-medium">
                                            {formatCurrency(Number(item.unitPrice) * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 flex justify-end">
                                    <div className="w-48 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>{formatCurrency(Number(order.totalAmount) - Number(order.shippingCost || 0) + Number(order.discount || 0))}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>{formatCurrency(Number(order.shippingCost || 0))}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Discount</span>
                                            <span className="text-green-600">-{formatCurrency(Number(order.discount || 0))}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between font-bold">
                                            <span>Total</span>
                                            <span>{formatCurrency(Number(order.totalAmount))}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline / History */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.statusHistory.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No history available.</p>
                                ) : (
                                    order.statusHistory.map((history) => (
                                        <div key={history.id} className="flex items-start gap-4 text-sm">
                                            <div className="min-w-[140px] text-muted-foreground">
                                                {format(new Date(history.timestamp), "MMM d, h:mm a")}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    Changed to {history.toStatus}
                                                </div>
                                                {history.reason && (
                                                    <div className="text-muted-foreground mt-1">
                                                        "{history.reason}"
                                                    </div>
                                                )}
                                                <div className="text-xs text-neutral-400 mt-1">
                                                    By {history.changedBy.name || "System"}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">
                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <OrderStatusForm orderId={order.id} currentStatus={order.status} />
                        </CardContent>
                    </Card>

                    {/* Customer */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Customer
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="font-medium">{order.user.name || "Guest User"}</div>
                                <div className="text-sm text-muted-foreground">{order.user.email}</div>
                                {order.user.phoneNumber && (
                                    <div className="text-sm text-muted-foreground">{order.user.phoneNumber}</div>
                                )}
                            </div>
                            {order.customerNotes && (
                                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 text-sm">
                                    <span className="font-semibold block mb-1">Note:</span>
                                    {order.customerNotes}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Shipping Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Shipping Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                            {order.shippingStreet ? (
                                <>
                                    <div className="font-medium">{order.shippingName}</div>
                                    <div>{order.shippingStreet}</div>
                                    <div>
                                        {order.shippingCity}, {order.shippingState} {order.shippingPostalCode}
                                    </div>
                                    <div>{order.shippingCountry}</div>
                                    {order.shippingPhone && (
                                        <div className="mt-2 text-muted-foreground">
                                            Phone: {order.shippingPhone}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-muted-foreground">No shipping address provided.</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Payment Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Payment Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Method</span>
                                <span className="font-medium">{order.paymentMethod || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant={order.paymentStatus === 'PAID' ? 'default' : 'secondary'}>{order.paymentStatus || "PENDING"}</Badge>
                            </div>
                            {order.paymentId && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Transaction ID</span>
                                    <span className="font-mono text-xs">{order.paymentId}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
