import Razorpay from 'razorpay';
import crypto from 'crypto';

// Lazy-loaded Razorpay instance to ensure env vars are ready
let razorpayInstance: Razorpay | null = null;

function getRazorpay(): Razorpay {
    if (!razorpayInstance) {
        // TRIM credentials to remove any hidden whitespace
        const keyId = (process.env.RAZORPAY_KEY_ID || '').trim();
        const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

        console.log('Initializing Razorpay:');
        console.log('  Key ID:', keyId);
        console.log('  Key ID Length:', keyId.length);
        console.log('  Key Secret Length:', keySecret.length);

        if (!keyId || !keySecret) {
            throw new Error('Razorpay credentials not configured');
        }

        razorpayInstance = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });
    }
    return razorpayInstance;
}

export async function createPaymentOrder(amount: number, orderId: string) {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt: orderId,
        notes: {
            orderId,
        },
    });
    return order;
}

export function verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
): boolean {
    const text = `${razorpayOrderId}|${razorpayPaymentId}`;
    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(text)
        .digest('hex');

    return generatedSignature === razorpaySignature;
}

