"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { BeatLoader } from "react-spinners";

export const VerificationFormClient = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const effectRan = useRef(false);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token, success, error]);

    useEffect(() => {
        if (effectRan.current) return;
        effectRan.current = true;

        onSubmit();
    }, [onSubmit]);

    return (
        <div className="flex items-center w-full justify-center">
            {!success && !error && (
                <BeatLoader />
            )}
            <FormSuccess message={success} />
            {!success && (
                <FormError message={error} />
            )}
        </div>
    )
}
