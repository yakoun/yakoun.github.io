import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public'

export const isConfigured = true

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY)

const seed = {
  profile: { first_name: 'Ouniboryabi', last_name: 'YAKOUN', title: 'Électrotechnicien & Développeur', summary: "Passionné par les technologies électriques, les réseaux télécom et le développement web.", address: 'Tsévié, Togo', phone: '+22897533307', email: 'yakounouniboryabi@gmail.com', birth_date: '1999-05-04', github: 'electrodev', linkedin: 'electrodev', website: 'https://electrodev.fr' },
  experiences: [
    { id: '1', company: 'Entreprise Électrique', role: 'Électrotechnicien', start_date: '2020-01', end_date: null, current: true, description: 'Installation et maintenance des réseaux électriques BT/HT', responsibilities: ['Installation de tableaux électriques', 'Câblage industriel', 'Dépannage et maintenance'] },
    { id: '2', company: 'Freelance', role: 'Développeur Web', start_date: '2021-06', end_date: null, current: true, description: 'Création d\'applications web et sites vitrines', responsibilities: ['Développement d\'applications web', 'Création de sites vitrines', 'Maintenance technique'] },
  ],
  education: [
    { id: '1', institution: 'Université de Lomé', degree: 'Licence', field: 'Génie Électrique', start_date: '2018-09', end_date: '2021-06', description: 'Formation en génie électrique et énergies renouvelables' },
  ],
  skills: [
    { id: '1', name: 'Électricité BT/HT', level: 5, category: 'Électricité' },
    { id: '2', name: 'Câblage réseau', level: 4, category: 'Réseaux' },
    { id: '3', name: 'JavaScript', level: 4, category: 'Développement' },
    { id: '4', name: 'SvelteKit', level: 3, category: 'Développement' },
    { id: '5', name: 'Dépannage électrique', level: 5, category: 'Électricité' },
  ],
  languages: [
    { id: '1', name: 'Français', level: 5 },
    { id: '2', name: 'Anglais', level: 3 },
    { id: '3', name: 'Éwé', level: 5 },
  ],
  hobbies: [
    { id: '1', name: 'Programmation', icon: 'code' },
    { id: '2', name: 'Électronique', icon: 'cpu' },
    { id: '3', name: 'Sport', icon: 'heart' },
  ],
  software: [
    { id: '1', name: 'VS Code', category: 'Logiciel', level: 5 },
    { id: '2', name: 'AutoCAD', category: 'Logiciel', level: 3 },
    { id: '3', name: 'Node.js', category: 'Langage programmation', level: 4 },
    { id: '4', name: 'Svelte', category: 'Framework', level: 4 },
    { id: '5', name: 'Git', category: 'Outil', level: 4 },
    { id: '6', name: 'Linux', category: 'Outil', level: 3 },
  ],
  projects: [
    { id: '1', title: 'Installation électrique résidentielle', slug: 'installation-electrique', description: 'Installation complète d\'un tableau électrique pour une villa de 3 pièces', category: 'electricite', date: '2024-03', featured: true, technologies: 'Disjoncteurs, Câbles, Tableau électrique, Mise à la terre', github_repo: '', live_url: '' },
  ],
  services: [
    { id: '1', title: 'Installation électrique', description: 'Installation et rénovation d\'installations électriques résidentielles et industrielles' },
    { id: '2', title: 'Réseaux & Télécom', description: 'Configuration et déploiement d\'infrastructures réseau (LAN, WAN, WiFi, Fibre)' },
    { id: '3', title: 'Développement Web', description: 'Création d\'applications web modernes et performantes' },
  ],
  certifications: [
    { id: '1', title: 'Habilitation électrique B1/B2', organization: 'CIFMAS', date: '2021-08', description: 'Habilitation électrique pour travaux en haute et basse tension.' },
    { id: '2', title: 'Certification SvelteKit', organization: 'OpenClassrooms', date: '2025-03', description: 'Développement d\'applications web modernes avec SvelteKit.' },
  ],
}

const tableNames = {
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  languages: 'languages',
  hobbies: 'hobbies',
  software_tools: 'software_tools',
  services: 'services',
}

async function from<T>(table: string, seedData: T): Promise<T> {
  try {
    const { data } = await supabase.from(table as any).select('*').order('order')
    return (data ?? seedData) as T
  } catch {
    return seedData
  }
}

export async function getProfile() {
  try {
    const { data } = await supabase.from('profile_info').select('*').single()
    return data ?? seed.profile
  } catch { return seed.profile }
}

export async function getExperiences() {
  return from<any[]>(tableNames.experience, seed.experiences)
}

export async function getEducation() {
  return from<any[]>(tableNames.education, seed.education)
}

export async function getSkills() {
  return from<any[]>(tableNames.skills, seed.skills)
}

export async function getLanguages() {
  return from<any[]>(tableNames.languages, seed.languages)
}

export async function getHobbies() {
  return from<any[]>(tableNames.hobbies, seed.hobbies)
}

export async function getSoftwareTools() {
  return from<any[]>(tableNames.software_tools, seed.software)
}

export async function getCertifications() {
  try {
    const { data } = await supabase.from('certifications' as any).select('*').order('created_at')
    return data ?? seed.certifications
  } catch { return seed.certifications }
}

export async function getProjects() {
  try {
    const { data } = await supabase.from('projects').select('*').order('date', { ascending: false })
    return data ?? seed.projects
  } catch { return seed.projects }
}

export async function getProject(slug: string) {
  try {
    const { data } = await supabase.from('projects').select('*').eq('slug', slug).single()
    return data ?? seed.projects.find(p => p.slug === slug)
  } catch { return seed.projects.find(p => p.slug === slug) }
}

export async function getServices() {
  return from<any[]>(tableNames.services, seed.services)
}

export async function getSettings() {
  try {
    const { data } = await supabase.from('settings').select('key,value')
    if (!data) return {}
    const map: Record<string, string> = {}
    data.forEach(s => map[s.key] = s.value)
    return map
  } catch { return {} }
}

export function getImageUrl(path: string) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const { data } = supabase.storage.from('folio').getPublicUrl(path)
  return data.publicUrl
}

export async function sendMessage(name: string, email: string, message: string) {
  const { error } = await supabase.from('messages').insert({ name, email, message })
  return error
}

export async function getGallery() {
  const { data } = await supabase.from('gallery').select('*').order('order')
  return data ?? []
}
