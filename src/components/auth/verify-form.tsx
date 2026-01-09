"use client";

import { useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { verify } from "@/actions/verify";

export const VerifyForm = () => {
    const [emailOtp, setEmailOtp] = useState("");
    const [phoneOtp, setPhoneOtp] = useState("");

    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const onVerifyEmail = () => {
        setError("");
        setSuccess("");
        startTransition(() => {
            verify(emailOtp, "email")
                .then((data) => {
                    if (data.error) setError(data.error);
                    if (data.success) {
                        setSuccess(data.success);
                        setEmailVerified(true);
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    };

    const onVerifyPhone = () => {
        setError("");
        setSuccess("");
        startTransition(() => {
            verify(phoneOtp, "phone")
                .then((data) => {
                    if (data.error) setError(data.error);
                    if (data.success) {
                        setSuccess(data.success);
                        setPhoneVerified(true);
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    };

    const isComplete = emailVerified && phoneVerified;

    return (
        <CardWrapper
            headerLabel="Verify your account"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="space-y-6">
                {/* Email Verification */}
                <div className="space-y-2">
                    <p className="text-sm font-medium">Email Verification</p>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter Email OTP"
                            value={emailOtp}
                            onChange={(e) => setEmailOtp(e.target.value)}
                            disabled={isPending || emailVerified}
                        />
                        <Button
                            onClick={onVerifyEmail}
                            disabled={isPending || emailVerified || !emailOtp}
                            className={emailVerified ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                            {emailVerified ? "✓" : "Verify"}
                        </Button>
                    </div>
                </div>

                {/* Phone Verification */}
                <div className="space-y-2">
                    <p className="text-sm font-medium">Phone Verification</p>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter Phone OTP"
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value)}
                            disabled={isPending || phoneVerified}
                        />
                        <Button
                            onClick={onVerifyPhone}
                            disabled={isPending || phoneVerified || !phoneOtp}
                            className={phoneVerified ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                            {phoneVerified ? "✓" : "Verify"}
                        </Button>
                    </div>
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />

                {isComplete && (
                    <Button
                        className="w-full"
                        onClick={() => window.location.href = "/login"}
                    >
                        Go to Login
                    </Button>
                )}
            </div>
        </CardWrapper>
    );
};
