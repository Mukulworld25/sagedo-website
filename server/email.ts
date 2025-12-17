import nodemailer from 'nodemailer';

// Gmail SMTP configuration
// Required env vars: GMAIL_USER and GMAIL_APP_PASSWORD
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || process.env.EMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD,
  },
  debug: true, // show debug output
  logger: true // log information in console
});

// Admin email for notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sagedoai00@gmail.com';

// ============================================
// Interfaces
// ============================================
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

// ============================================
// 1. ORDER + PAYMENT CONFIRMATION (Combined)
// ============================================
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const shortId = data.orderId.slice(0, 8);
  const amountText = data.isFree ? 'FREE (Golden Ticket Used)' : `₹${data.amount}`;

  const subject = data.isFree
    ? `Order Confirmed (Golden Ticket) #${shortId} - SAGE DO`
    : `Order & Payment Confirmed #${shortId} - SAGE DO`;

  const customerHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
      <h1 style="color: #f43f5e; font-size: 28px; margin-bottom: 20px;">
        ${data.isFree ? '🎫 You Just Used a GOLDEN TICKET!' : '💸 Money Gone, Magic Incoming!'}
      </h1>
      
      <p style="font-size: 16px; color: #e2e8f0;">Hey ${data.customerName}! 👋</p>
      
      <p style="font-size: 16px; color: #e2e8f0;">
        ${data.isFree
      ? 'You clever human! Using that Golden Ticket like a boss! ✨'
      : 'Your wallet just got lighter, but your life\'s about to get easier! 🚀'}
      </p>
      
      <div style="background: #2d2d44; padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #f43f5e;">
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>🎯 Order ID:</strong> #${shortId}</p>
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>✨ Service:</strong> ${data.serviceName}</p>
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>💰 Amount:</strong> ${amountText}</p>
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
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: data.customerEmail,
      subject,
      html: customerHtml,
    });
    console.log('✉️ Order confirmation email sent to:', data.customerEmail);

    // Admin email notification
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: ADMIN_EMAIL,
      subject: `🆕 New Order #${shortId} - ${data.serviceName} - ₹${data.amount}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Order Received!</h2>
          <p><strong>Order ID:</strong> ${data.orderId}</p>
          <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
          <p><strong>Service:</strong> ${data.serviceName}</p>
          <p><strong>Amount:</strong> ${amountText}</p>
          ${data.paymentId ? `<p><strong>Payment ID:</strong> ${data.paymentId}</p>` : ''}
          <p><a href="https://sagedo.vercel.app/admin">View in Admin Panel</a></p>
        </div>
      `,
    });
    console.log('✉️ Admin notification sent for order:', data.orderId);
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
  }
}

// ============================================
// 2. ORDER DELIVERED
// ============================================
export async function sendOrderDeliveredEmail(data: OrderEmailData & { deliveryNotes?: string }) {
  const shortId = data.orderId.slice(0, 8);

  const customerHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
      <h1 style="color: #22c55e; font-size: 28px; margin-bottom: 20px;">
        🚀 BOOM! It's Done!
      </h1>
      
      <p style="font-size: 16px; color: #e2e8f0;">Hey ${data.customerName}! 👋</p>
      
      <p style="font-size: 16px; color: #e2e8f0;">
        Remember when you thought "this is too much work"?<br>
        Well, <strong>WE DID IT FOR YOU!</strong> 🎤💥
      </p>
      
      <div style="background: #2d2d44; padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #22c55e;">
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>✅ Order:</strong> #${shortId} - DELIVERED!</p>
        <p style="margin: 8px 0; color: #e2e8f0;"><strong>✨ Service:</strong> ${data.serviceName}</p>
        ${data.deliveryNotes ? `<p style="margin: 8px 0; color: #e2e8f0;"><strong>📝 Notes:</strong> ${data.deliveryNotes}</p>` : ''}
      </div>
      
      <p style="font-size: 16px; color: #e2e8f0;">
        📎 Check attachments for your files!
      </p>
      
      <div style="background: #3d3d5c; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center;">
        <p style="font-size: 18px; color: #fbbf24; margin-bottom: 12px;">🌟 LIKED OUR WORK? (or hated it?)</p>
        <p style="font-size: 14px; color: #94a3b8; margin-bottom: 16px;">
          We won't cry... okay maybe a little 😢<br>
          But your feedback makes us better!
        </p>
        <a href="https://sagedo.vercel.app/about" style="display: inline-block; background: #f43f5e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Leave Feedback 👉
        </a>
        <p style="font-size: 12px; color: #64748b; margin-top: 12px; font-style: italic;">
          "Be honest. We can handle it."<br>
          (Narrator: They could not handle it)
        </p>
      </div>
      
      <p style="font-size: 16px; color: #94a3b8;">
        Come back soon! Your daily grind misses us already 😏
      </p>
      
      <p style="margin-top: 32px; color: #94a3b8; font-size: 14px;">
        — SAGE DO AI 🤖<br>
        WhatsApp: +91 7018709291
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: data.customerEmail,
      subject: `Order Delivered #${shortId} - SAGE DO`,
      html: customerHtml,
    });
    console.log('✉️ Order delivered email sent to:', data.customerEmail);
  } catch (error) {
    console.error('❌ Failed to send delivery email:', error);
  }
}

// ============================================
// Payment Success (redirects to combined function)
// ============================================
export async function sendPaymentSuccessEmail(data: OrderEmailData & { paymentId: string; paymentMethod: string }) {
  await sendOrderConfirmationEmail({
    ...data,
    isFree: false,
  });
}

// ============================================
// Account Deletion Email
// ============================================
export async function sendAccountDeletionEmail(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: email,
      subject: 'Account Deleted - SAGE DO',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 16px;">
          <h1 style="color: #f43f5e;">Account Deleted 👋</h1>
          <p style="color: #e2e8f0;">Hi ${name},</p>
          <p style="color: #e2e8f0;">Your SAGE DO account has been successfully deleted as requested.</p>
          <p style="color: #94a3b8;">We're sorry to see you go! If you ever want to come back, you're always welcome.</p>
          <p style="margin-top: 32px; color: #94a3b8;">— SAGE DO AI Team 🤖</p>
        </div>
      `,
    });
    console.log('✉️ Account deletion email sent to:', email);
  } catch (error) {
    console.error('❌ Failed to send account deletion email:', error);
  }
}
