import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fjmrhsgwnvsdmjmoermh.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_ZPettRXPkciAUQ_w7vgMqg_VkHXkdME";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
