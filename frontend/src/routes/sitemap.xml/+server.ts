import { supabase } from '$lib/api/supabase'

export async function GET() {
  const baseUrl = 'https://electrodev.fr'

  const pages = [
    { loc: '', priority: '1.0' },
    { loc: '/a-propos', priority: '0.9' },
    { loc: '/projets', priority: '0.8' },
    { loc: '/galerie', priority: '0.7' },
    { loc: '/contact', priority: '0.7' },
  ]

  let projectSlugs: string[] = []
  try {
    const { data } = await supabase.from('projects').select('slug')
    projectSlugs = (data ?? []).map(p => p.slug).filter(Boolean)
  } catch {}

  const urls = [...pages]

  for (const slug of projectSlugs) {
    urls.push({ loc: `/projets/${slug}`, priority: '0.6' })
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/2001/XMLSchema-instance"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `
  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <priority>${u.priority}</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
