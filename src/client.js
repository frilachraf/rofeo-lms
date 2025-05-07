import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qwcxskzpvafmhfczdscy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3Y3hza3pwdmFmbWhmY3pkc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMjkxNjIsImV4cCI6MjA2MTgwNTE2Mn0.L87Hf41ltiiB3WZMGx1hsl2kYdUj_0ygYAxk2UpBE98'
export const supabase = createClient(supabaseUrl, supabaseKey)