import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendVerificationSMS = async (phone: string, token: string) => {
    // If we're missing credentials, log and return (for dev/partial setup safety)
    if (!accountSid || !authToken || !twilioNumber) {
        console.error("❌ Twilio credentials missing in .env");
        console.log("----------------------------------------");
        console.log("📱 SMS Mock (Twilio not configured):");
        console.log(`To: ${phone}, Token: ${token}`);
        console.log("----------------------------------------");
        return;
    }

    try {
        const message = await client.messages.create({
            body: `Your verification code is: ${token}`,
            from: twilioNumber,
            to: phone
        });

        console.log(`✅ SMS sent to ${phone}. SID: ${message.sid}`);
    } catch (error) {
        console.error("❌ Failed to send SMS:", error);
        // Fallback log for dev awareness
        console.log("----------------------------------------");
        console.log("📱 SMS Mock (Fallback):");
        console.log(`To: ${phone}, Token: ${token}`);
        console.log("----------------------------------------");
    }
};
