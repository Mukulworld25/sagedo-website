import { Resend } from 'resend';

// Initialize Resend with API key
// MOCK: If no key, create a dummy object to safely log emails without crashing
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey
  ? new Resend(resendApiKey)
  : {
    emails: {
      send: async (params: any) => {
        console.log('[MOCK EMAIL] Would send to:', params.to, 'Subject:', params.subject);
        return { data: { id: 'mock-id' }, error: null };
      }
    }
  } as any;

// Admin email for notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mukul@sagedo.in';

// ============================================
// Interfaces
// ============================================
// Utility to sanitize input for HTML emails
const sanitize = (text: string | undefined | null) => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  serviceName: string;
  amount: number;
  orderDate: string;
  isFree?: boolean;
  paymentId?: string;
}

interface DeliveryEmailData extends OrderEmailData {
  deliveryNotes?: string;
  deliveryFileUrls?: string[];
}

interface PaymentEmailData extends OrderEmailData {
  paymentMethod: string;
}

// ============================================
// 1. ORDER CONFIRMATION EMAIL
// ============================================
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const shortId = data.orderId.slice(0, 8);
  const amountText = data.isFree ? 'FREE (Golden Ticket Used)' : `₹${data.amount}`;

  const subject = data.isFree
    ? `Order Confirmed (Golden Ticket) #${shortId} - SAGE DO`
    : `Order & Payment Confirmed #${shortId} - SAGE DO`;

  const customerHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="https://sagedo.in/sagedo_logo_pro_clean.png" alt="SAGE DO" style="width: 60px; height: 60px;" />
        <p style="color: #f43f5e; font-weight: bold; margin: 8px 0 0 0; font-size: 18px;">SAGE DO</p>
      </div>
      <h1 style="color: #f43f5e; font-size: 28px; margin-bottom: 20px;">
        ${data.isFree ? '🎫 You Just Used a GOLDEN TICKET!' : '💸 Money Gone, Magic Incoming!'}
      </h1>
      
      <p style="font-size: 16px; color: #e2e8f0;">Hey ${sanitize(data.customerName)}! 👋</p>
      
      <p style="font-size: 16px; color: #e2e8f0;">
        ${data.isFree
      ? 'You clever human! Using that Golden Ticket like a boss! ✨'
      : 'Your wallet just got lighter, but your life\'s about to get easier! 🚀'}
      </p>
      
      <div style="background: #2d2d44; padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #f43f5e;">
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>🎯 Order ID:</strong> #${shortId}</p>
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>✨ Service:</strong> ${sanitize(data.serviceName)}</p>
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>💰 Amount:</strong> ${sanitize(amountText)}</p>
        ${data.paymentId ? `<p style="margin: 8px 0; color: #e2e8f0;"><strong>💳 Payment:</strong> Via Razorpay ✓</p>` : ''}
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>📅 Date:</strong> ${data.orderDate}</p>
      </div>
      
      <p style="font-size: 16px; color: #e2e8f0;">
        🔗 <a href="https://sagedo.vercel.app/track?orderId=${data.orderId}" style="color: #f43f5e;">Track your order</a>
      </p>
      
      <p style="font-size: 16px; color: #94a3b8; margin-top: 24px;">
        ${data.isFree ? 'Free stuff tastes the best, doesn\'t it? 😏' : 'Sit back, relax, we\'ve got this! 💪'}
      </p>
      
      <p style="margin-top: 32px; color: #94a3b8; font-size: 14px;">
        — The SAGE DO AI Crew 🤖<br>
        WhatsApp: +91 7018709291
      </p>
    </div>
  `;

  try {
    // Send to customer
    const { data: result, error } = await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.in>',
      to: [data.customerEmail],
      subject,
      html: customerHtml,
    });

    if (error) {
      console.error('Resend error (customer):', error);
      throw new Error(error.message);
    }
    console.log('✉️ Order confirmation email sent to:', data.customerEmail, 'ID:', result?.id);

    // Admin notification
    const { error: adminError } = await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.in>',
      to: [ADMIN_EMAIL],
      subject: `🆕 New Order #${shortId} - ${data.serviceName} - ₹${data.amount}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Order Received!</h2>
          <p><strong>Order ID:</strong> ${data.orderId}</p>
          <p><strong>Customer:</strong> ${sanitize(data.customerName)} (${sanitize(data.customerEmail)})</p>
          <p><strong>Service:</strong> ${sanitize(data.serviceName)}</p>
          <p><strong>Amount:</strong> ${sanitize(amountText)}</p>
          <p><strong>Date:</strong> ${data.orderDate}</p>
        </div>
      `,
    });

    if (adminError) {
      console.error('Resend error (admin):', adminError);
    }
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    throw error;
  }
}

// ============================================
// 2. PAYMENT SUCCESS EMAIL
// ============================================
export async function sendPaymentSuccessEmail(data: PaymentEmailData) {
  const shortId = data.orderId.slice(0, 8);

  try {
    const { error } = await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.in>',
      to: [data.customerEmail],
      subject: `Payment Confirmed #${shortId} - SAGE DO`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
          <h1 style="color: #10b981; font-size: 28px;">💳 Payment Successful!</h1>
          <p style="color: #e2e8f0;">Hey ${sanitize(data.customerName)}! Your payment of ₹${data.amount} has been received.</p>
          <div style="background: #2d2d44; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="color: #e2e8f0;"><strong>Order ID:</strong> #${shortId}</p>
            <p style="color: #e2e8f0;"><strong>Service:</strong> ${sanitize(data.serviceName)}</p>
            <p style="color: #e2e8f0;"><strong>Amount:</strong> ₹${data.amount}</p>
            <p style="color: #e2e8f0;"><strong>Payment Method:</strong> ${sanitize(data.paymentMethod)}</p>
          </div>
          <p style="color: #94a3b8;">We're now working on your order! 🚀</p>
        </div>
      `,
    });

    if (error) {
      console.error('Payment email error:', error);
      throw new Error(error.message);
    }
    console.log('✉️ Payment success email sent to:', data.customerEmail);
  } catch (error) {
    console.error('Failed to send payment email:', error);
    throw error;
  }
}

// ============================================
// 3. ORDER DELIVERED EMAIL
// ============================================
export async function sendOrderDeliveredEmail(data: DeliveryEmailData) {
  const shortId = data.orderId.slice(0, 8);

  try {
    const { error } = await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.in>',
      to: [data.customerEmail],
      subject: `🎉 Order Delivered #${shortId} - SAGE DO`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://sagedo.in/sagedo_logo.png" alt="SAGE DO" style="width: 120px; height: auto;" />
          </div>
          <h1 style="color: #10b981; font-size: 28px;">🎉 Your Order is Delivered!</h1>
          <p style="color: #e2e8f0;">Hey ${data.customerName}! Great news - your order is complete!</p>
          
          <div style="background: #2d2d44; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="color: #e2e8f0;"><strong>Order ID:</strong> #${shortId}</p>
            <p style="color: #e2e8f0;"><strong>Service:</strong> ${data.serviceName}</p>
            ${data.deliveryNotes ? `<p style="color: #e2e8f0;"><strong>Notes:</strong> ${data.deliveryNotes}</p>` : ''}
          </div>
          
          ${data.deliveryFileUrls && data.deliveryFileUrls.length > 0 ? `
          <div style="background: #10b981; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="color: #ffffff; font-weight: bold; margin-bottom: 10px;">📎 Your Delivered Files:</p>
            ${data.deliveryFileUrls.map((url, i) => `
              <a href="${url}" style="display: block; color: #ffffff; background: rgba(255,255,255,0.2); padding: 10px 16px; border-radius: 8px; margin: 5px 0; text-decoration: none;">
                📄 Download File ${i + 1}
              </a>
            `).join('')}
          </div>
          ` : ''}
          
          <p style="color: #e2e8f0;">
            🔗 <a href="https://sagedo.in/dashboard" style="color: #f43f5e;">View in Dashboard</a>
          </p>
          
          <p style="color: #e2e8f0; margin-top: 20px;">
            📝 <a href="https://sagedo.in/about" style="color: #f43f5e;">Leave us feedback!</a>
          </p>
          
          <p style="margin-top: 32px; color: #94a3b8; font-size: 14px;">
            Thanks for choosing SAGE DO! 🙏<br>
            — The SAGE DO AI Crew
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Delivery email error:', error);
      throw new Error(error.message);
    }
    console.log('✉️ Order delivered email sent to:', data.customerEmail);
  } catch (error) {
    console.error('Failed to send delivery email:', error);
    throw error;
  }
}

// ============================================
// 4. ACCOUNT DELETION EMAIL
// ============================================
export async function sendAccountDeletionEmail(email: string, name: string) {
  try {
    const { error } = await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.in>',
      to: [email],
      subject: 'Account Deleted - SAGE DO',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
          <h1 style="color: #f43f5e; font-size: 28px;">Account Deleted</h1>
          <p style="color: #e2e8f0;">Hey ${name},</p>
          <p style="color: #e2e8f0;">Your SAGE DO account has been permanently deleted as requested.</p>
          <p style="color: #94a3b8; margin-top: 20px;">We're sad to see you go! If you change your mind, you can always create a new account.</p>
          <p style="margin-top: 32px; color: #94a3b8; font-size: 14px;">— The SAGE DO AI Crew</p>
        </div>
      `,
    });

    if (error) {
      console.error('Account deletion email error:', error);
    }
    console.log('✉️ Account deletion email sent to:', email);
  } catch (error) {
    console.error('Failed to send account deletion email:', error);
  }
}

// ============================================
// 5. PASSWORD RESET EMAIL
// ============================================
export async function sendPasswordResetEmail(email: string, name: string, resetToken: string) {
  const resetLink = `https://sagedo.in/reset-password?token=${resetToken}`;

  try {
    const { error } = await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.in>',
      to: [email],
      subject: 'Reset Your Password - SAGE DO',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
          <h1 style="color: #f43f5e; font-size: 28px;">Reset Your Password 🔐</h1>
          <p style="color: #e2e8f0;">Hey ${name},</p>
          <p style="color: #e2e8f0;">You requested to reset your password. Click the button below to create a new password:</p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetLink}" style="display: inline-block; background: linear-gradient(to right, #f43f5e, #ef4444); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #94a3b8; font-size: 14px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
          
          <p style="margin-top: 32px; color: #94a3b8; font-size: 14px;">— The SAGE DO AI Crew</p>
        </div>
      `,
    });

    if (error) {
      console.error('Password reset email error:', error);
      throw new Error(error.message);
    }
    console.log('✉️ Password reset email sent to:', email);
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }

}


// ============================================
// 6. CONTACT FORM EMAIL (TO ADMIN)
// ============================================
export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
  try {
    const { error } = await resend.emails.send({
      from: 'SAGE DO Contact <noreply@sagedo.in>',
      to: [ADMIN_EMAIL],
      replyTo: email,
      subject: `📬 New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">New Contact Message Received</h2>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <p style="font-weight: bold;">Message:</p>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #888; font-size: 12px;">This message was sent via the SAGE DO website contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Contact email error:', error);
      throw new Error(error.message);
    }
    console.log('✉️ Contact email sent to admin from:', email);
  } catch (error) {
    console.error('Failed to send contact email:', error);
    // Don't throw here, to avoid breaking the user experience if email fails but DB save works
  }
}


// ============================================
// 7. EMAIL VERIFICATION EMAIL
// ============================================
export async function sendVerificationEmail(email: string, name: string, token: string) {
  const verifyLink = `https://sagedo.in/verify-email?token=${token}`;

  try {
    const { error } = await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.in>',
      to: [email],
      subject: 'Verify your email - SAGE DO',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
          <h1 style="color: #f43f5e; font-size: 28px;">Verify Your Email 📧</h1>
          <p style="color: #e2e8f0;">Hey ${name},</p>
          <p style="color: #e2e8f0;">Welcome to SAGE DO! Please verify your email address to get started.</p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${verifyLink}" style="display: inline-block; background: linear-gradient(to right, #10b981, #059669); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Verify Email
            </a>
          </div>
          
          <p style="color: #94a3b8; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
          
          <p style="margin-top: 32px; color: #94a3b8; font-size: 14px;">— The SAGE DO AI Crew</p>
        </div>
      `,
    });

    if (error) {
      console.error('Verification email error:', error);
      throw new Error(error.message);
    }
    console.log('✉️ Verification email sent to:', email);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
}
