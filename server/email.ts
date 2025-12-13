import nodemailer from 'nodemailer';

// Gmail SMTP configuration
// User needs to set GMAIL_USER and GMAIL_APP_PASSWORD environment variables
// To get App Password: Google Account > Security > 2-Step Verification > App Passwords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || process.env.EMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD,
  },
});

// Admin email for notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sagedoai@gmail.com';

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  serviceName: string;
  amount: number;
  orderDate: string;
}

interface PaymentEmailData extends OrderEmailData {
  paymentId: string;
  paymentMethod: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  try {
    // Email to customer
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: data.customerEmail,
      subject: `Order Confirmed #${data.orderId} - SAGE DO`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Order Confirmed! 🎉</h1>
          <p>Hi ${data.customerName},</p>
          <p>Thank you for your order! We've received your request and will start working on it shortly.</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Details:</h3>
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            <p><strong>Service:</strong> ${data.serviceName}</p>
            <p><strong>Amount:</strong> ₹${data.amount}</p>
            <p><strong>Date:</strong> ${data.orderDate}</p>
          </div>
          
          <p>You can track your order status at: <a href="https://sagedo.vercel.app/track">Track Order</a></p>
          
          <p>Best regards,<br><strong>SAGE DO AI Team</strong></p>
        </div>
      `,
    });
    console.log('✉️ Order confirmation email sent to:', data.customerEmail);

    // Also notify admin
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: ADMIN_EMAIL,
      subject: `🆕 New Order #${data.orderId} - ${data.serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Order Received!</h2>
          <p><strong>Order ID:</strong> ${data.orderId}</p>
          <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
          <p><strong>Service:</strong> ${data.serviceName}</p>
          <p><strong>Amount:</strong> ₹${data.amount}</p>
          <p><strong>Date:</strong> ${data.orderDate}</p>
          <p><a href="https://sagedo.vercel.app/admin">View in Admin Panel</a></p>
        </div>
      `,
    });
    console.log('✉️ Admin notification sent for order:', data.orderId);
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
  }
}

export async function sendPaymentSuccessEmail(data: PaymentEmailData) {
  try {
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: data.customerEmail,
      subject: `Payment Successful #${data.orderId} - SAGE DO`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">Payment Successful! ✅</h1>
          <p>Hi ${data.customerName},</p>
          <p>Your payment has been confirmed. We're now working on your order!</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Payment Details:</h3>
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            <p><strong>Payment ID:</strong> ${data.paymentId}</p>
            <p><strong>Service:</strong> ${data.serviceName}</p>
            <p><strong>Amount Paid:</strong> ₹${data.amount}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
          </div>
          
          <p>Track your order: <a href="https://sagedo.vercel.app/track">Track Order</a></p>
          
          <p>Best regards,<br><strong>SAGE DO AI Team</strong></p>
        </div>
      `,
    });
    console.log('✉️ Payment success email sent to:', data.customerEmail);

    // Notify admin about payment
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: ADMIN_EMAIL,
      subject: `💰 Payment Received #${data.orderId} - ₹${data.amount}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Payment Received!</h2>
          <p><strong>Order ID:</strong> ${data.orderId}</p>
          <p><strong>Payment ID:</strong> ${data.paymentId}</p>
          <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
          <p><strong>Amount:</strong> ₹${data.amount}</p>
          <p><a href="https://sagedo.vercel.app/admin">View in Admin Panel</a></p>
        </div>
      `,
    });
  } catch (error) {
    console.error('❌ Failed to send payment success email:', error);
  }
}

export async function sendOrderDeliveredEmail(data: OrderEmailData & { deliveryNotes?: string }) {
  try {
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: data.customerEmail,
      subject: `Order Delivered #${data.orderId} - SAGE DO`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">Order Delivered! 🎉</h1>
          <p>Hi ${data.customerName},</p>
          <p>Great news! Your order has been completed and delivered.</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Details:</h3>
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            <p><strong>Service:</strong> ${data.serviceName}</p>
            ${data.deliveryNotes ? `<p><strong>Notes:</strong> ${data.deliveryNotes}</p>` : ''}
          </div>
          
          <p>Please check your dashboard to download the deliverables.</p>
          <p><a href="https://sagedo.vercel.app/dashboard">Go to Dashboard</a></p>
          
          <p>Thank you for choosing SAGE DO! ❤️</p>
          <p>Best regards,<br><strong>SAGE DO AI Team</strong></p>
        </div>
      `,
    });
    console.log('✉️ Order delivered email sent to:', data.customerEmail);
  } catch (error) {
    console.error('❌ Failed to send order delivered email:', error);
  }
}

export async function sendAccountDeletionEmail(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: `"SAGE DO AI" <${process.env.GMAIL_USER || 'noreply@sagedo.com'}>`,
      to: email,
      subject: 'Account Deleted - SAGE DO',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Account Deleted</h1>
          <p>Hi ${name},</p>
          <p>Your SAGE DO account has been successfully deleted as requested.</p>
          <p>We're sorry to see you go! If you ever want to come back, you're always welcome.</p>
          <p>Best regards,<br><strong>SAGE DO AI Team</strong></p>
        </div>
      `,
    });
    console.log('✉️ Account deletion email sent to:', email);
  } catch (error) {
    console.error('❌ Failed to send account deletion email:', error);
  }
}
