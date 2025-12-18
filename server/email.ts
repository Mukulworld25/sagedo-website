import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

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

interface DeliveryEmailData extends OrderEmailData {
  deliveryNotes?: string;
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
          <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
          <p><strong>Service:</strong> ${data.serviceName}</p>
          <p><strong>Amount:</strong> ${amountText}</p>
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
          <p style="color: #e2e8f0;">Hey ${data.customerName}! Your payment of ₹${data.amount} has been received.</p>
          <div style="background: #2d2d44; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="color: #e2e8f0;"><strong>Order ID:</strong> #${shortId}</p>
            <p style="color: #e2e8f0;"><strong>Service:</strong> ${data.serviceName}</p>
            <p style="color: #e2e8f0;"><strong>Amount:</strong> ₹${data.amount}</p>
            <p style="color: #e2e8f0;"><strong>Payment Method:</strong> ${data.paymentMethod}</p>
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
          <h1 style="color: #10b981; font-size: 28px;">🎉 Your Order is Delivered!</h1>
          <p style="color: #e2e8f0;">Hey ${data.customerName}! Great news - your order is complete!</p>
          
          <div style="background: #2d2d44; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="color: #e2e8f0;"><strong>Order ID:</strong> #${shortId}</p>
            <p style="color: #e2e8f0;"><strong>Service:</strong> ${data.serviceName}</p>
            ${data.deliveryNotes ? `<p style="color: #e2e8f0;"><strong>Notes:</strong> ${data.deliveryNotes}</p>` : ''}
          </div>
          
          <p style="color: #e2e8f0;">
            🔗 <a href="https://sagedo.vercel.app/track?orderId=${data.orderId}" style="color: #f43f5e;">View delivered files</a>
          </p>
          
          <p style="color: #e2e8f0; margin-top: 20px;">
            📝 <a href="https://sagedo.vercel.app/about" style="color: #f43f5e;">Leave us feedback!</a>
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
