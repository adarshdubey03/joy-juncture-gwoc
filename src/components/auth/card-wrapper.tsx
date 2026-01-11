"use client"
import { Social } from "@/components/auth/social";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { Header } from "@/components/auth/header";
import { BackButton } from "./back-button";
interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}


export const CardWrapper = ({
    children, headerLabel, backButtonLabel, backButtonHref, showSocial }: CardWrapperProps) => {
    return (<div className="w-[400px] shadow-md bg-white rounded-xl border border-neutral-200">
        <div className="p-6">
            <Header label={headerLabel} />
        </div>
        <div className="p-6 pt-0">{children}</div>
        {showSocial && (
            <div className="p-6 pt-0">
                <Social />
            </div>
        )}
        <div className="p-6 pt-0">
            <BackButton
                label={backButtonLabel}
                href={backButtonHref} />
        </div>

    </div>)
}
