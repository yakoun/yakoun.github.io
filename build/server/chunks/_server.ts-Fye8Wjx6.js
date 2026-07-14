import { s as supabase } from './supabase-CbuSEcXR.js';
import { j as json } from './index-BIAFQWR9.js';
import '@supabase/supabase-js';

async function POST({ request }) {
  const { email, password } = await request.json();
  const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError) return json({ error: authError.message }, { status: 401 });
  return json({ session: data.session });
}

export { POST };
//# sourceMappingURL=_server.ts-Fye8Wjx6.js.map
