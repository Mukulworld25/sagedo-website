import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

// Basic types for Deno Edge Functions
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, service_name, order_id } = await req.json()

    if (!amount || !order_id) {
      throw new Error('amount and order_id are required fields')
    }

    const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID')
    const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay keys not configured')
    }

    // Call Razorpay API directly using fetch via Basic Auth
    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)
    
    // Convert amount to paise (multiply by 100) and ensure it's an integer
    // Assuming the frontend sends rupees
    const amountInPaise = Math.round(Number(amount) * 100)

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${order_id}`,
        notes: {
          service_name: service_name || 'Service',
          order_id: order_id
        }
      })
    })

    const razorpayOrder = await response.json()

    if (!response.ok) {
      console.error("Razorpay Error:", razorpayOrder)
      throw new Error(`Razorpay API Error: ${razorpayOrder.error?.description || 'Unknown error'}`)
    }

    return new Response(
      JSON.stringify({ 
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
