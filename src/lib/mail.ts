import { google } from 'googleapis';

// 1. CONFIGURATION
const CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground',
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  emailUser: process.env.GMAIL_USER,
};

interface JoyEvent {
  title?: string;
  name?: string;
  startTime: string | Date;
  venue?: string;
  location?: string;
  [key: string]: any;
}

// 2. GMAIL CLIENT SETUP
const oauth2Client = new google.auth.OAuth2(
  CONFIG.clientId,
  CONFIG.clientSecret,
  CONFIG.redirectUri
);

if (CONFIG.refreshToken) {
  oauth2Client.setCredentials({ refresh_token: CONFIG.refreshToken });
}

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// 3. INTERNAL HELPERS
const generateHtml = (title: string, content: string): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #F4C752; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
          .code-box { background-color: #f5f5f5; border: 2px dashed #F4C752; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
          .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #000; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .alert { padding: 12px; margin: 20px 0; border-left: 4px solid; }
          .warning { background-color: #fff3cd; border-color: #ffc107; }
          .danger { background-color: #f8d7da; border-color: #dc3545; }
          h1 { margin: 0; color: #000; }
          a { color: #F4C752; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>Joy Juncture</h1></div>
          <div class="content">
            <h2>${title}</h2>
            ${content}
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Joy Juncture. All rights reserved.</p>
            <p>Moments of Joy, One Game at a Time</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const makeRawEmail = (to: string, from: string, subject: string, htmlBody: string) => {
  const str = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    `Content-Type: text/html; charset=utf-8`,
    '',
    htmlBody,
  ].join('\n');

  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const dispatchEmail = async (
  email: string,
  subject: string,
  htmlContent: string,
  logFallbackFn: () => void
) => {
  const isConfigured = CONFIG.clientId && CONFIG.clientSecret && CONFIG.refreshToken && CONFIG.emailUser;

  if (!isConfigured) {
    console.warn("⚠️ [Email] Missing credentials. Check .env variables.");
    // Force fallback to print so you can see what's happening
    logFallbackFn(); 
    return;
  }

  try {
    const raw = makeRawEmail(email, CONFIG.emailUser!, subject, htmlContent);
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });
    console.log(`✅ Email sent to ${email} (ID: ${res.data.id})`);
  } catch (error: any) {
    console.error('❌ [Email] API Failed:', error.message);
    logFallbackFn();
  }
};

// 4. EXPORTED FUNCTIONS
export const sendVerificationEmail = async (email: string, code: string): Promise<void> => {
  const subject = 'Verify Your Joy Juncture Account';
  const html = generateHtml('Verify Your Account', `
    <p>Thank you for joining Joy Juncture! To complete your registration, please use the verification code below:</p>
    <div class="code-box"><div class="code">${code}</div></div>
    <p>This code will expire in <strong>10 minutes</strong>.</p>
    <div class="alert warning">
      <strong>Security Tip:</strong> Never share this code with anyone.
    </div>
    <p>If you didn't request this code, please ignore this email.</p>
  `);

  await dispatchEmail(email, subject, html, () => {
    console.log(`📧 [DEV] VERIFICATION -> To: ${email} | Code: ${code}`);
  });
};

export const sendPasswordResetEmail = async (email: string, code: string): Promise<void> => {
  const subject = 'Reset Your Password - Joy Juncture';
  const html = generateHtml('Reset Your Password', `
    <p>We received a request to reset your password. Use the code below to proceed:</p>
    <div class="code-box"><div class="code">${code}</div></div>
    <p>This code will expire in <strong>10 minutes</strong>.</p>
    <div class="alert danger">
      <strong>⚠️ Security Alert:</strong> If you didn't request a password reset, ignore this email.
    </div>
  `);

  await dispatchEmail(email, subject, html, () => {
    console.log(`📧 [DEV] RESET -> To: ${email} | Code: ${code}`);
  });
};

export const sendTicketEmail = async (email: string, userName: string, event: JoyEvent, ticketCode: string): Promise<void> => {
  const eventTitle = event.title || event.name || 'Event';
  const subject = `Your Ticket for ${eventTitle}`;
  const html = generateHtml('Ticket Confirmed!', `
    <p>Hi ${userName},</p>
    <p>You are registered for <strong>${eventTitle}</strong>.</p>
    <p><strong>Date:</strong> ${new Date(event.startTime).toLocaleString()}</p>
    <p><strong>Venue:</strong> ${event.venue || event.location || 'TBA'}</p>
    <div class="code-box">
        <div style="font-size: 14px; color: #666;">TICKET CODE</div>
        <div class="code" style="font-size: 24px;">${ticketCode}</div>
    </div>
  `);

  await dispatchEmail(email, subject, html, () => {
    console.log(`📧 [DEV] TICKET -> To: ${email} | Event: ${eventTitle}`);
  });
};

export const sendEventUpdateEmail = async (email: string, userName: string, eventName: string, message: string): Promise<void> => {
  const subject = `Update regarding ${eventName}`;
  const html = generateHtml('Event Update', `
    <p>Hi ${userName},</p>
    <p>We have an update for <strong>${eventName}</strong>:</p>
    <blockquote style="border-left: 4px solid #F4C752; padding-left: 15px; margin: 20px 0; font-style: italic; background: #f9f9f9; padding: 15px;">
        ${message}
    </blockquote>
  `);

  await dispatchEmail(email, subject, html, () => {
    console.log(`📧 [DEV] UPDATE -> To: ${email} | Event: ${eventName}`);
  });
};
