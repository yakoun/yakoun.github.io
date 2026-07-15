import { createClient } from '@supabase/supabase-js'
import { SUPABASE_SECRET_KEY } from '$env/static/private'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'

export const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY)

export async function setupTable(tableName: string, createSql: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin.rpc('exec_sql' as any, { query_text: createSql })
    if (error) {
      return { ok: false, error: `RPC exec_sql failed: ${error.message}` }
    }
    return { ok: true }
  } catch {
    try {
      const { error } = await supabaseAdmin.rpc('pg_query' as any, { query_text: createSql })
      if (error) {
        return { ok: false, error: `RPC pg_query failed: ${error.message}` }
      }
      return { ok: true }
    } catch (e: any) {
      return { ok: false, error: e?.message || 'Impossible de créer la table automatiquement. Utilisez le SQL Editor dans Supabase Dashboard.' }
    }
  }
}
