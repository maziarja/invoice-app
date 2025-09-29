import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

const supabaseUrl = "https://gpapuumrkatmcfxjbyvs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYXB1dW1ya2F0bWNmeGpieXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNTU0MzMsImV4cCI6MjA3MzYzMTQzM30.SEzsFy6UwPIE8_V0059CanISXBFRCzJh4ZjmIUTj3Ow";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
