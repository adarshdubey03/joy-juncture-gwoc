"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { VerificationFormClient } from "./verification-form-client";
import { Suspense } from "react";

export const NewVerificationForm = () => {
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="flex items-center w-full justify-center">
                <Suspense fallback={<BeatLoader />}>
                    <VerificationFormClient />
                </Suspense>
            </div>
        </CardWrapper>
    );
}
