// Types Supabase générés manuellement
export interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: 'electricite'|'reseaux'|'wifi'|'paraboles'|'dev-web'|'apps-mobiles'|'automatisation'
  images: string[]
  technologies: string
  date: string
  featured: boolean
  github_repo: string
  live_url: string
  created_at: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon: string
  description: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  image_url: string
}

export interface GalleryItem {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  featured: boolean
}

export interface Message {
  id: string
  name: string
  email: string
  phone: string
  message: string
  read: boolean
  created_at: string
}

export const CATEGORIES = [
  { value: 'electricite', label: 'Électricité', emoji: '⚡' },
  { value: 'reseaux', label: 'Réseaux', emoji: '🔗' },
  { value: 'wifi', label: 'WiFi', emoji: '📶' },
  { value: 'paraboles', label: 'Paraboles', emoji: '📡' },
  { value: 'dev-web', label: 'Développement web', emoji: '💻' },
  { value: 'apps-mobiles', label: 'Applications mobiles', emoji: '📱' },
  { value: 'automatisation', label: 'Automatisation', emoji: '⚙️' },
] as const

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.value, c.label])
)