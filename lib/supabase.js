import { createClient } from '@supabase/supabase-js'

// Get URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if the URL and key are available
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or ANON Key is missing in environment variables.")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
