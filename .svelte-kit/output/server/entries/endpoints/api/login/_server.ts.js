import { s as supabase } from "../../../../chunks/supabase.js";
import { j as json } from "../../../../chunks/index.js";
async function POST({ request }) {
  const { email, password } = await request.json();
  const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError) return json({ error: authError.message }, { status: 401 });
  return json({ session: data.session });
}
export {
  POST
};
