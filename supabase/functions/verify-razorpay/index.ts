import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from "../_shared/cors.ts"
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

// Function to encode text to buffer
const encoder = new TextEncoder()

// Function to create HMAC SHA-256 Digest
async function generateHmac(message: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message))
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order_id) {
      throw new Error('Missing payment verification data')
    }

    const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay secret not configured')
    }

    // Verify HMAC signature
    const signatureBody = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = await generateHmac(signatureBody, RAZORPAY_KEY_SECRET)

    if (expectedSignature !== razorpay_signature) {
      throw new Error('Invalid payment signature')
    }

    // Payment is valid. Update order in Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Supabase environment variables not configured')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data: updatedOrder, error } = await supabase
      .from('orders')
      .update({ payment_status: 'paid' })
      .eq('id', order_id)
      .select()
      .single()

    if (error) {
      console.error("Error updating order status in Supabase:", error)
      throw new Error('Payment verified, but failed to update order status')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment verified successfully',
        order: updatedOrder 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Payment Verification Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
