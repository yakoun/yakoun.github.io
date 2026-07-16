import { json } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'

const certificationsSQL = `CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  date TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read certifications" ON certifications;
CREATE POLICY "Public read certifications" ON certifications FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin write certifications" ON certifications;
CREATE POLICY "Admin write certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated');`

export async function POST() {
  const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY)

  // Try via RPC
  for (const rpcName of ['exec_sql', 'pg_query']) {
    try {
      const { error } = await supabaseAdmin.rpc(rpcName, { query_text: certificationsSQL })
      if (!error) {
        return json({ ok: true, method: rpcName, message: 'Table certifications créée avec succès' })
      }
    } catch {}
  }

  // Try via Management API
  try {
    const res = await fetch(`https://api.supabase.com/v1/projects/aqcpfjoeczyuxvqodlth/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SUPABASE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: certificationsSQL }),
    })
    if (res.ok) {
      return json({ ok: true, method: 'mgmt', message: 'Table certifications créée avec succès' })
    }
  } catch {}

  // Fallback: return the SQL for manual execution
  return json({
    ok: false,
    method: null,
    sql: certificationsSQL,
    message: 'Création automatique impossible. Copiez le SQL ci-dessous et exécutez-le dans le SQL Editor Supabase (Dashboard → SQL Editor → New Query).',
  })
}
