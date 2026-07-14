import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://aqcpfjoeczyuxvqodlth.supabase.co'
const SUPABASE_KEY = 'sb_publishable_dy1sShCprQXPTwcSdrvaxg_PJhYqAXd'

export const isConfigured = true

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function getProfile() {
  const { data } = await supabase.from('profile_info').select('*').single()
  return data
}

export async function getExperiences() {
  const { data } = await supabase.from('experience').select('*').order('order')
  return data ?? []
}

export async function getEducation() {
  const { data } = await supabase.from('education').select('*').order('order')
  return data ?? []
}

export async function getSkills() {
  const { data } = await supabase.from('skills').select('*').order('order')
  return data ?? []
}

export async function getLanguages() {
  const { data } = await supabase.from('languages').select('*').order('order')
  return data ?? []
}

export async function getHobbies() {
  const { data } = await supabase.from('hobbies').select('*').order('order')
  return data ?? []
}

export async function getSoftwareTools() {
  const { data } = await supabase.from('software_tools').select('*').order('order')
  return data ?? []
}

export async function getProjects() {
  const { data } = await supabase.from('projects').select('*').order('date', { ascending: false })
  return data ?? []
}

export async function getProject(slug: string) {
  const { data } = await supabase.from('projects').select('*').eq('slug', slug).single()
  return data
}

export async function getServices() {
  const { data } = await supabase.from('services').select('*').order('order')
  return data ?? []
}

export async function getSettings() {
  const { data } = await supabase.from('settings').select('key,value')
  const map: Record<string, string> = {}
  data?.forEach(s => map[s.key] = s.value)
  return map
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
