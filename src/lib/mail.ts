import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ... existing imports ...

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `http://localhost:3000/new-password?token=${token}`;

    console.log("Attempting to send reset email to:", email);

    if (!process.env.RESEND_API_KEY) {
        console.log("----------------------------------------");
        console.log("⚠ NO RESEND_API_KEY FOUND IN .env");
        console.log("📨 Password Reset Link (DEV MODE):");
        console.log(resetLink);
        console.log("----------------------------------------");
        return;
    }

    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
        });
        console.log("✅ Reset email sent to:", email);
    } catch (error) {
        console.error("❌ Failed to send reset email:", error);
        console.log("----------------------------------------");
        console.log("📨 Password Reset Link (Fallback):");
        console.log(resetLink);
        console.log("----------------------------------------");
    }
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    // const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    console.log("Attempting to send verification email to:", email);

    if (!process.env.RESEND_API_KEY) {
        console.log("----------------------------------------");
        console.log("⚠ NO RESEND_API_KEY FOUND IN .env");
        console.log("📨 Email Verification OTP (DEV MODE):");
        console.log(`To: ${email}, Code: ${token}`);
        console.log("----------------------------------------");
        return;
    }

    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Your Confirmation Code",
            html: `<p>Your verification code is: <strong>${token}</strong></p>`
        });

        if (data.error) {
            console.error("❌ Resend API Error:", data.error);
            console.log("----------------------------------------");
            console.log("📨 Email Verification OTP (Fallback):");
            console.log(`To: ${email}, Code: ${token}`);
            console.log("----------------------------------------");
        } else {
            console.log("✅ Email sent successfully via Resend. Data:", data);
        }
    } catch (error) {
        console.error("❌ Failed to send email:", error);
        console.log("----------------------------------------");
        console.log("📨 Email Verification OTP (Fallback):");
        console.log(`To: ${email}, Code: ${token}`);
        console.log("----------------------------------------");
    }
};
