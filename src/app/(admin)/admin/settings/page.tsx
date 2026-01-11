"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Truck, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your store configuration and preferences.</p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">
                        <Settings className="mr-2 h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="shipping">
                        <Truck className="mr-2 h-4 w-4" />
                        Shipping
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Configure basic store information and preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Store Information</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Configure your store name, description, contact information, and social media links.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        📝 Coming soon: In-app form to manage these settings
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Business Hours</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Set your operating hours for customer service and order processing.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        📝 Coming soon: Business hours configuration
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Shipping Settings */}
                <TabsContent value="shipping">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Configuration</CardTitle>
                            <CardDescription>Manage shipping methods and rates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Shipping Rates</h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Your shipping rates are configured in the database (ShippingRate model).
                                    </p>
                                    <div className="text-xs space-y-1 text-muted-foreground">
                                        <p>• STANDARD: Base rate shipping</p>
                                        <p>• EXPRESS: Fast delivery (1-2 days)</p>
                                        <p>• SAME_DAY: Same day delivery where available</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        📝 Coming soon: Visual rate editor
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Shipping Zones</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Configure shipping zones and region-specific rates.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        📝 Coming soon: Shipping zones management
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Free Shipping</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Set minimum order value for free shipping and applicable regions.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        📝 Coming soon: Free shipping rules
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security & Privacy</CardTitle>
                            <CardDescription>Configure security settings and data privacy options</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Rate Limiting</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Rate limits are configured in your RateLimit model to prevent abuse.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        ✅ Active: Login attempts, API calls, and form submissions are rate-limited
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">User Authentication</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Multi-factor authentication, password policies, and session management.
                                    </p>
                                    <div className="text-xs space-y-1 text-muted-foreground mt-2">
                                        <p>✅ Password requirements: 8+ chars, uppercase, lowercase, number, special char</p>
                                        <p>✅ Account lockout after failed attempts</p>
                                        <p>✅ Email and phone verification</p>
                                    </div>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Data Privacy</h3>
                                    <p className="text-sm text-muted-foreground">
                                        GDPR compliance, data retention, and user data export/deletion.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        📝 Coming soon: Privacy policy management
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications & Alerts</CardTitle>
                            <CardDescription>Configure email and SMS notifications for various events</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Order Notifications</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Automated emails for order confirmations, shipping updates, and delivery notifications.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        📝 Coming soon: Email template editor
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Inventory Alerts</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified when products reach low stock levels (configured per product).
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        ✅ Active: Low stock alerts based on product lowStockAlert field
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Event Reminders</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Send reminders to registered users before events start.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        📝 Coming soon: Event notification scheduler
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
