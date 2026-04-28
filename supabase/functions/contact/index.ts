import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
        throw new Error('Name, email, and message are required')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Supabase environment variables not configured')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert into contact_messages table
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        { 
          name, 
          email, 
          subject: subject || 'Contact Form Submission',
          message,
          status: 'new'
        }
      ])
      .select()

    if (error) {
        throw error
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message securely saved" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Error handling contact form:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
