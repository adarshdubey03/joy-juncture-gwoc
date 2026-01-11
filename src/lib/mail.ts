import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const FROM_EMAIL = process.env.EMAIL_FROM || 'onboarding@resend.dev';
const RETRY_ATTEMPTS = parseInt(process.env.EMAIL_RETRY_ATTEMPTS || '3');
const RETRY_DELAY_MS = parseInt(process.env.EMAIL_RETRY_DELAY_MS || '1000');

// Utility: Sleep function for retry delays
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: Retry logic with exponential backoff
async function sendWithRetry<T>(
    fn: () => Promise<T>,
    retries = RETRY_ATTEMPTS
): Promise<T> {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            const isLastAttempt = attempt === retries - 1;

            if (isLastAttempt) {
                throw error;
            }

            // Exponential backoff: 1s, 2s, 4s
            const delay = RETRY_DELAY_MS * Math.pow(2, attempt);
            console.warn(`Email send attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
            await sleep(delay);
        }
    }

    throw new Error('All retry attempts exhausted');
}

// Development mode fallback (logs OTP to console)
function logOTPFallback(email: string, code: string, type: 'verification' | 'reset'): void {
    if (process.env.NODE_ENV === 'development') {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📧 ${type === 'verification' ? 'VERIFICATION' : 'PASSWORD RESET'} OTP (DEV MODE)`);
        console.log(`To: ${email}`);
        console.log(`Code: ${code}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
}

/**
 * Send verification OTP email
 * @param email - Recipient email address
 * @param code - 6-digit OTP code
 */
export const sendVerificationEmail = async (
    email: string,
    code: string
): Promise<void> => {
    // Fallback for missing API key
    if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️ RESEND_API_KEY not configured, using development fallback');
        logOTPFallback(email, code, 'verification');
        return;
    }

    try {
        await sendWithRetry(async () => {
            const { data, error } = await resend.emails.send({
                from: FROM_EMAIL,
                to: email,
                subject: 'Verify Your Joy Juncture Account',
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #F4C752; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
                .code-box { background-color: #f5f5f5; border: 2px dashed #F4C752; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
                .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #000; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; color: #000;">Joy Juncture</h1>
                </div>
                <div class="content">
                  <h2>Verify Your Account</h2>
                  <p>Thank you for joining Joy Juncture! To complete your registration, please use the verification code below:</p>
                  
                  <div class="code-box">
                    <div class="code">${code}</div>
                  </div>
                  
                  <p>This code will expire in <strong>10 minutes</strong>.</p>
                  
                  <div class="warning">
                    <strong>Security Tip:</strong> Never share this code with anyone. Joy Juncture will never ask for your verification code.
                  </div>
                  
                  <p>If you didn't request this code, please ignore this email or <a href="${BASE_URL}/contact">contact support</a>.</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Joy Juncture. All rights reserved.</p>
                  <p>Moments of Joy, One Game at a Time</p>
                </div>
              </div>
            </body>
          </html>
        `,
            });

            if (error) {
                throw new Error(`Resend API error: ${error.message || JSON.stringify(error)}`);
            }

            console.log(`✅ Verification email sent successfully to ${email} (ID: ${data?.id})`);
        });
    } catch (error) {
        console.error('❌ Failed to send verification email after retries:', error);

        // Fallback in development
        if (process.env.NODE_ENV === 'development') {
            logOTPFallback(email, code, 'verification');
        }

        // Re-throw to let caller handle
        throw new Error(`Email delivery failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/**
 * Send password reset OTP email
 * @param email - Recipient email address
 * @param code - 6-digit OTP code
 */
export const sendPasswordResetEmail = async (
    email: string,
    code: string
): Promise<void> => {
    // Fallback for missing API key
    if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️ RESEND_API_KEY not configured, using development fallback');
        logOTPFallback(email, code, 'reset');
        return;
    }

    try {
        await sendWithRetry(async () => {
            const { data, error } = await resend.emails.send({
                from: FROM_EMAIL,
                to: email,
                subject: 'Reset Your Password - Joy Juncture',
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #F4C752; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
                .code-box { background-color: #f5f5f5; border: 2px dashed #F4C752; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
                .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #000; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
                .danger { background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 12px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; color: #000;">Joy Juncture</h1>
                </div>
                <div class="content">
                  <h2>Reset Your Password</h2>
                  <p>We received a request to reset your password. Use the code below to proceed:</p>
                  
                  <div class="code-box">
                    <div class="code">${code}</div>
                  </div>
                  
                  <p>This code will expire in <strong>10 minutes</strong>.</p>
                  
                  <div class="danger">
                    <strong>⚠️ Security Alert:</strong> If you didn't request a password reset, please ignore this email and consider changing your password immediately.
                  </div>
                  
                  <div class="warning">
                    <strong>Never share this code</strong> with anyone, including Joy Juncture staff. We will never ask for your reset code.
                  </div>
                  
                  <p>Need help? <a href="${BASE_URL}/contact">Contact our support team</a>.</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Joy Juncture. All rights reserved.</p>
                  <p>Moments of Joy, One Game at a Time</p>
                </div>
              </div>
            </body>
          </html>
        `,
            });

            if (error) {
                throw new Error(`Resend API error: ${error.message || JSON.stringify(error)}`);
            }

            console.log(`✅ Password reset email sent successfully to ${email} (ID: ${data?.id})`);
        });
    } catch (error) {
        console.error('❌ Failed to send password reset email after retries:', error);

        // Fallback in development
        if (process.env.NODE_ENV === 'development') {
            logOTPFallback(email, code, 'reset');
        }

        // Re-throw to let caller handle
        throw new Error(`Email delivery failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
