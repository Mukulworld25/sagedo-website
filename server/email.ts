import emailjs from '@emailjs/browser';

// EmailJS configuration (from your existing setup)
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_Sagedo00';
const EMAILJS_TEMPLATE_ORDER = process.env.EMAILJS_TEMPLATE_ORDER || 'template_order';
const EMAILJS_TEMPLATE_PAYMENT = process.env.EMAILJS_TEMPLATE_PAYMENT || 'template_payment';
const EMAILJS_TEMPLATE_DELIVERY = process.env.EMAILJS_TEMPLATE_DELIVERY || 'template_delivery';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'your-public-key';

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
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ORDER,
      {
        to_email: data.customerEmail,
        customer_name: data.customerName,
        order_id: data.orderId,
        service_name: data.serviceName,
        amount: data.amount,
        order_date: data.orderDate,
      },
      EMAILJS_PUBLIC_KEY
    );
    console.log('Order confirmation email sent to:', data.customerEmail);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }
}

export async function sendPaymentSuccessEmail(data: PaymentEmailData) {
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_PAYMENT,
      {
        to_email: data.customerEmail,
        customer_name: data.customerName,
        order_id: data.orderId,
        payment_id: data.paymentId,
        service_name: data.serviceName,
        amount: data.amount,
        payment_method: data.paymentMethod || 'Razorpay',
      },
      EMAILJS_PUBLIC_KEY
    );
    console.log('Payment success email sent to:', data.customerEmail);
  } catch (error) {
    console.error('Failed to send payment success email:', error);
  }
}

export async function sendOrderDeliveredEmail(data: OrderEmailData & { deliveryNotes?: string }) {
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_DELIVERY,
      {
        to_email: data.customerEmail,
        customer_name: data.customerName,
        order_id: data.orderId,
        service_name: data.serviceName,
        delivery_notes: data.deliveryNotes || 'Your order has been completed!',
      },
      EMAILJS_PUBLIC_KEY
    );
    console.log('Order delivered email sent to:', data.customerEmail);
  } catch (error) {
    console.error('Failed to send order delivered email:', error);
  }
}

export async function sendAccountDeletionEmail(email: string, name: string) {
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_account_deletion', // Create this template in EmailJS
      {
        to_email: email,
        customer_name: name,
      },
      EMAILJS_PUBLIC_KEY
    );
    console.log('Account deletion email sent to:', email);
  } catch (error) {
    console.error('Failed to send account deletion email:', error);
  }
}
