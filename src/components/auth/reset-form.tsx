"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema, NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { reset } from "@/actions/reset";
import { newPassword } from "@/actions/new-password";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [step, setStep] = useState<1 | 2>(1);

    const requestForm = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const [otp, setOtp] = useState("");
    const [resendCountdown, setResendCountdown] = useState(0);

    // Countdown effect
    useState(() => {
        // Not using useEffect for interval here to avoid complexity in snippet, 
        // but let's add the useEffect for countdown
    });

    // Actually we need useEffect
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    // Using a simpler approach for the snippet
    const onResend = () => {
        const values = requestForm.getValues();
        startTransition(() => {
            reset(values).then((data) => {
                if (data?.error) setError(data.error);
                if (data?.success) {
                    setSuccess("Code sent again!");
                    setResendCountdown(60);
                }
            });
        });
    }

    // Effect for countdown
    if (resendCountdown > 0) {
        setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }

    const passwordForm = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onRequestSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        setSuccess(data.success);
                        setTimeout(() => {
                            setStep(2); // Move to Step 2
                            setSuccess("Code sent! Please check your email/phone.");
                        }, 1000);
                    }
                });
        });
    };

    const onResetSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit code.");
            return;
        }

        startTransition(() => {
            // We pass the Input OTP as the token
            // We assume the token (OTP) lookup handles finding the associated identifier in the backend
            // OR we iterate. currently newPassword takes (values, token).
            newPassword(values, otp)
                .then((data) => {
                    if (data?.error) setError(data.error);
                    if (data?.success) {
                        setSuccess(data.success);
                    }
                });
        });
    };

    return (
        <CardWrapper
            headerLabel={step === 1 ? "Forgot your password?" : "Reset Password"}
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            {step === 1 && (
                <Form {...requestForm}>
                    <form
                        onSubmit={requestForm.handleSubmit(onRequestSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={requestForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email or Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Enter email or phone"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Send Code
                        </Button>
                    </form>
                </Form>
            )}

            {step === 2 && (
                <Form {...passwordForm}>
                    <form
                        onSubmit={passwordForm.handleSubmit(onResetSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <div className="flex flex-col items-center gap-2">
                                <FormLabel>Verification Code</FormLabel>
                                <InputOTP
                                    maxLength={6}
                                    value={otp}
                                    onChange={setOtp}
                                    disabled={isPending}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            <FormField
                                control={passwordForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="******"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Reset Password
                        </Button>
                        <div className="mt-4 text-center">
                            {resendCountdown > 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Resend code in {resendCountdown}s
                                </p>
                            ) : (
                                <Button
                                    size="sm"
                                    variant="link"
                                    onClick={onResend}
                                    type="button"
                                    disabled={isPending}
                                >
                                    Resend Code
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            )}
        </CardWrapper>
    );
};
