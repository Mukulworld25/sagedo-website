import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY || 'demo-key');

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
    await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.online>',
      to: data.customerEmail,
      subject: `Order Confirmation #${data.orderId} - SAGE DO`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; padding: 20px; }
            .button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for choosing SAGE DO</p>
          </div>
          <div class="content">
            <p>Hi ${data.customerName},</p>
            <p>We've received your order and it's being processed. Here are your order details:</p>
            
            <div class="order-details">
              <div class="detail-row">
                <strong>Order ID:</strong>
                <span>#${data.orderId}</span>
              </div>
              <div class="detail-row">
                <strong>Service:</strong>
                <span>${data.serviceName}</span>
              </div>
              <div class="detail-row">
                <strong>Amount:</strong>
                <span>₹${data.amount}</span>
              </div>
              <div class="detail-row">
                <strong>Order Date:</strong>
                <span>${data.orderDate}</span>
              </div>
            </div>

            <p><strong>What's Next?</strong></p>
            <ul>
              <li>We'll start working on your order immediately</li>
              <li>You'll receive updates via email and dashboard</li>
              <li>Typical delivery: 24-48 hours</li>
            </ul>

            <center>
              <a href="https://sagedo-website.onrender.com/dashboard" class="button">View Order Status</a>
            </center>

            <p>Need help? Contact us:<br/>
            WhatsApp: +91 7018709291<br/>
            Email: sagedoai00@gmail.com</p>
          </div>
          <div class="footer">
            <p>SAGE DO - We Do Your Daily Grind, You Do Grand Things</p>
            <p>© 2025 SAGE DO. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    });
    console.log('Order confirmation email sent to:', data.customerEmail);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }
}

export async function sendPaymentSuccessEmail(data: PaymentEmailData) {
  try {
    await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.online>',
      to: data.customerEmail,
      subject: `Payment Successful - Order #${data.orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .payment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .success-badge { background: #38ef7d; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 10px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ Payment Successful!</h1>
            <div class="success-badge">₹${data.amount} Paid</div>
          </div>
          <div class="content">
            <p>Hi ${data.customerName},</p>
            <p>Your payment has been received successfully! We're now processing your order.</p>
            
            <div class="payment-details">
              <div class="detail-row">
                <strong>Payment ID:</strong>
                <span>${data.paymentId}</span>
              </div>
              <div class="detail-row">
                <strong>Order ID:</strong>
                <span>#${data.orderId}</span>
              </div>
              <div class="detail-row">
                <strong>Service:</strong>
                <span>${data.serviceName}</span>
              </div>
              <div class="detail-row">
                <strong>Amount Paid:</strong>
                <span>₹${data.amount}</span>
              </div>
            </div>

            <p><strong>Receipt:</strong> This email serves as your payment receipt. Save it for your records.</p>

            <p>Questions? WhatsApp: +91 7018709291 | Email: sagedoai00@gmail.com</p>
          </div>
          <div class="footer">
            <p>SAGE DO - We Do Your Daily Grind, You Do Grand Things</p>
            <p>© 2025 SAGE DO. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    });
    console.log('Payment success email sent to:', data.customerEmail);
  } catch (error) {
    console.error('Failed to send payment success email:', error);
  }
}

export async function sendOrderDeliveredEmail(data: OrderEmailData & { deliveryNotes?: string }) {
  try {
    await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.online>',
      to: data.customerEmail,
      subject: `Order Delivered - #${data.orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .delivery-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f5576c; }
            .button { background: #f5576c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📦 Order Delivered!</h1>
            <p>Your order is complete</p>
          </div>
          <div class="content">
            <p>Hi ${data.customerName},</p>
            <p>Great news! Your order #${data.orderId} has been delivered.</p>
            
            ${data.deliveryNotes ? `
            <div class="delivery-box">
              <h3>📝 Delivery Notes:</h3>
              <p>${data.deliveryNotes}</p>
            </div>
            ` : ''}

            <p><strong>Service:</strong> ${data.serviceName}</p>

            <center>
              <a href="https://sagedo-website.onrender.com/dashboard" class="button">View Delivered Files</a>
            </center>

            <p><strong>Happy with our service?</strong> We'd love your feedback!</p>

            <p>Need revisions? WhatsApp: +91 7018709291 | Email: sagedoai00@gmail.com</p>

            <p>Thank you for choosing SAGE DO! 🙏</p>
          </div>
          <div class="footer">
            <p>SAGE DO - We Do Your Daily Grind, You Do Grand Things</p>
            <p>© 2025 SAGE DO. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    });
    console.log('Order delivered email sent to:', data.customerEmail);
  } catch (error) {
    console.error('Failed to send order delivered email:', error);
  }
}

export async function sendAccountDeletionEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'SAGE DO <noreply@sagedo.online>',
      to: email,
      subject: 'Account Deletion Confirmation - SAGE DO',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: #666; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Account Deleted</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Your SAGE DO account has been permanently deleted as per your request.</p>
            
            <p><strong>What This Means:</strong></p>
            <ul>
              <li>All your personal data has been removed</li>
              <li>Order history deleted</li>
              <li>Tokens forfeited</li>
              <li>Account access revoked</li>
            </ul>

            <p>Sorry to see you go! You're welcome back anytime.</p>

            <p>If you didn't request this, contact us immediately: sagedoai00@gmail.com</p>
          </div>
          <div class="footer">
            <p>SAGE DO - We Do Your Daily Grind, You Do Grand Things</p>
            <p>© 2025 SAGE DO. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    });
    console.log('Account deletion email sent to:', email);
  } catch (error) {
    console.error('Failed to send account deletion email:', error);
  }
}
