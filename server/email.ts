import nodemailer from 'nodemailer';

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || process.env.EMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD,
  },
});

// Admin contact
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sagedoai00@gmail.com';
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || '917018709291';

// ============================================
// WhatsApp via CallMeBot (Free)
// Setup: Send "I allow callmebot to send me messages" to +34 644 51 95 23
// ============================================
async function sendWhatsAppMessage(phone: string, message: string) {
  try {
    const apiKey = process.env.CALLMEBOT_API_KEY || ''; // Get from CallMeBot
    if (!apiKey) {
      console.log('⚠️ CALLMEBOT_API_KEY not set, skipping WhatsApp');
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMessage}&apikey=${apiKey}`;

    const response = await fetch(url);
    if (response.ok) {
      console.log('📱 WhatsApp sent to:', phone);
    } else {
      console.log('⚠️ WhatsApp failed:', await response.text());
    }
  } catch (error) {
    console.error('❌ WhatsApp error:', error);
  }
}

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
// For paid orders AND free orders (Golden Ticket)
// ============================================
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const shortId = data.orderId.slice(0, 8);
  const isPaid = data.amount > 0 && !data.isFree;
  const amountText = data.isFree ? 'FREE (Golden Ticket Used)' : `₹${data.amount}`;

  // Email subject (professional)
  const subject = data.isFree
    ? `Order Confirmed (Golden Ticket) #${shortId} - SAGE DO`
    : `Order & Payment Confirmed #${shortId} - SAGE DO`;

  // Fun email body
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

    // WhatsApp to admin
    const whatsappMsg = data.isFree
      ? `🎫 SAGE DO - FREE Order!\n\nOrder #${shortId} confirmed!\nService: ${data.serviceName}\nAmount: FREE (Golden Ticket)\nCustomer: ${data.customerEmail}\n\nTrack: sagedo.vercel.app/admin`
      : `💸 SAGE DO - Cha-Ching!\n\nOrder #${shortId} confirmed!\nService: ${data.serviceName}\nAmount: ₹${data.amount} ✓\nCustomer: ${data.customerEmail}\n\nTrack: sagedo.vercel.app/admin`;

    await sendWhatsAppMessage(ADMIN_WHATSAPP, whatsappMsg);

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
  } catch (error) {
    console.error('❌ Failed to send order confirmation:', error);
    // Fallback: Try WhatsApp only
    const fallbackMsg = `⚠️ EMAIL FAILED!\n\nOrder #${shortId}\nService: ${data.serviceName}\nCustomer: ${data.customerEmail}\n\nCheck admin panel!`;
    await sendWhatsAppMessage(ADMIN_WHATSAPP, fallbackMsg);
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

    // WhatsApp to admin confirmation
    const whatsappMsg = `🚀 SAGE DO - DELIVERED!\n\nOrder #${shortId}\nService: ${data.serviceName}\nCustomer: ${data.customerEmail}\n\nStatus: ✅ Delivered`;
    await sendWhatsAppMessage(ADMIN_WHATSAPP, whatsappMsg);

  } catch (error) {
    console.error('❌ Failed to send delivery email:', error);
    const fallbackMsg = `⚠️ DELIVERY EMAIL FAILED!\n\nOrder #${shortId}\nCustomer: ${data.customerEmail}\n\nPlease notify manually!`;
    await sendWhatsAppMessage(ADMIN_WHATSAPP, fallbackMsg);
  }
}

// ============================================
// Payment Success (redirects to combined function)
// Kept for backward compatibility
// ============================================
export async function sendPaymentSuccessEmail(data: OrderEmailData & { paymentId: string; paymentMethod: string }) {
  // Now combined with order confirmation
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
