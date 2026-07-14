import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://aqcpfjoeczyuxvqodlth.supabase.co";
const SUPABASE_KEY = "sb_publishable_dy1sShCprQXPTwcSdrvaxg_PJhYqAXd";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export {
  supabase as s
};
