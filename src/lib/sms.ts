import axios from "axios";

// Configuration
const MACRODROID_URL = process.env.MACRODROID_URL; // e.g. https://trigger.macrodroid.com/.../send_sms

/**
 * Core function to trigger MacroDroid Webhook
 */
const triggerMacroDroid = async (phone: string, fullMessageText: string) => {
    if (!MACRODROID_URL) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`📱 [DEV Mock] To: ${phone} | Msg: ${fullMessageText}`);
        }
        return false;
    }

    try {
const params = new URLSearchParams();
params.append('phone', phone);
params.append('message', fullMessageText);

        const fullUrl = `${MACRODROID_URL}?${params.toString()}`;

        await axios.get(fullUrl);
        console.log(`✅ SMS sent via Phone to ${phone}`);
        return true;
    } catch (error: any) {
        console.error("❌ Failed to trigger MacroDroid:", error.message);
        return false;
    }
};

export const sendVerificationSMS = async (phone: string, token: string) => {
    // We construct the FULL message here
    const message = `Your Joy Juncture verification code is: ${token}. Do not share this.`;
    await triggerMacroDroid(phone, message);
};

export const sendTicketSMS = async (phone: string, eventName: string, ticketCode: string) => {
    const message = `Ticket Confirmed! Event: ${eventName}. Entry Code: ${ticketCode}. Enjoy!`;
    await triggerMacroDroid(phone, message);
};

export const sendEventUpdateSMS = async (phone: string, eventName: string, updateMsg: string) => {
    const message = `Update for ${eventName}: ${updateMsg}`;
    await triggerMacroDroid(phone, message);
};