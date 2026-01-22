import { headers } from "next/headers";

/**
 * Retrieves the client IP address from the request headers.
 * Looks for 'x-forwarded-for' and 'x-real-ip' headers.
 * Falls back to '127.0.0.1' if not found.
 */
export async function getClientIp(): Promise<string> {
    const headersList = await headers();

    // X-Forwarded-For can be a comma-separated list of IPs. The client IP is the first one.
    const forwardedFor = headersList.get("x-forwarded-for");
    if (forwardedFor) {
        const ip = forwardedFor.split(",")[0].trim();
        if (ip) return ip;
    }

    const realIp = headersList.get("x-real-ip");
    if (realIp) return realIp;

    // Fallback for development / when no proxy is used locally
    return "127.0.0.1";
}
