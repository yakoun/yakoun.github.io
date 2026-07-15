// Edge Function Supabase : Webhook GitHub → Sync projets
// Déploiement : supabase functions deploy github-webhook --no-verify-jwt

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface GitHubPayload {
  action: string
  repository: {
    id: number
    name: string
    full_name: string
    description: string | null
    html_url: string
    homepage: string | null
    language: string | null
    topics: string[]
    private: boolean
    updated_at: string
    pushed_at: string
  }
  release?: {
    tag_name: string
    published_at: string
  }
}

serve(async (req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Vérifier la signature si un secret est configuré
  const signature = req.headers.get('x-hub-signature-256')
  const secret = Deno.env.get('GITHUB_WEBHOOK_SECRET')

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const payload: GitHubPayload = await req.json()
    const repo = payload.repository

    // Ignorer les repos privés
    if (repo.private) {
      return new Response('Private repo ignored', { status: 200 })
    }

    // Mapping des topics GitHub vers catégories portfolio
    const topicToCategory: Record<string, string> = {
      'electricite': 'electricite',
      'electrical': 'electricite',
      'network': 'reseaux',
      'reseaux': 'reseaux',
      'wifi': 'wifi',
      'satellite': 'paraboles',
      'parabole': 'paraboles',
      'web': 'dev-web',
      'svelte': 'dev-web',
      'sveltekit': 'dev-web',
      'mobile': 'apps-mobiles',
      'automation': 'automatisation',
      'automatisation': 'automatisation',
    }

    const category = repo.topics
      ?.map(t => topicToCategory[t.toLowerCase()])
      .filter(Boolean)[0] || 'dev-web'

    const technologies = [repo.language, ...repo.topics]
      .filter(Boolean)
      .join(', ')

    // Slug à partir du nom du repo
    const slug = repo.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Upsert : créer ou mettre à jour le projet
    const { error } = await supabase.from('projects').upsert({
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      slug,
      description: repo.description || `Projet ${repo.name}`,
      category,
      technologies,
      github_repo: repo.full_name,
      github_description: repo.description,
      live_url: repo.homepage,
      date: repo.pushed_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      featured: false,
    }, {
      onConflict: 'slug',
      ignoreDuplicates: false,
    })

    if (error) {
      console.error('Supabase error:', error)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    // Si c'est une release, marquer comme featured
    if (payload.release) {
      await supabase.from('projects')
        .update({ featured: true })
        .eq('slug', slug)
    }

    return new Response(JSON.stringify({
      success: true,
      repo: repo.full_name,
      category,
    }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Webhook error:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})