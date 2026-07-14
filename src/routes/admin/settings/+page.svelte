<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Save, CheckCircle } from 'lucide-svelte'

  let settings: Record<string, string> = {}
  let loading = true
  let saving = false
  let success = false

  const keys = ['site_title', 'site_description', 'hero_title', 'hero_subtitle', 'phone', 'email', 'whatsapp', 'address', 'first_name', 'last_name', 'nationality', 'birth_date', 'github', 'linkedin', 'website', 'city', 'country']

  const defaults: Record<string, string> = {
    site_title: 'Ouniboryabi YAKOUN - Électrotechnicien',
    site_description: 'Portfolio professionnel de Ouniboryabi YAKOUN, spécialisé en génie électrique, réseaux télécom et développement web.',
    hero_title: 'Ouniboryabi YAKOUN',
    hero_subtitle: 'Électrotechnicien',
    phone: '+22897533307',
    email: 'yakounouniboryabi@gmail.com',
    whatsapp: '+22897533307',
    address: 'Tsévié, Togo',
    first_name: 'Ouniboryabi',
    last_name: 'YAKOUN',
    nationality: 'Togolais',
    birth_date: '1999-05-04',
    city: 'Tsévié',
    country: 'Togo',
    github: '',
    linkedin: '',
    website: ''
  }

  onMount(async () => {
    const { data } = await supabase.from('settings').select('*')
    if (data && data.length > 0) {
      data.forEach(s => settings[s.key] = s.value || '')
    } else {
      settings = { ...defaults }
    }
    loading = false
  })

  async function saveSettings() {
    saving = true; success = false
    try {
      for (const key of keys) {
        await supabase.from('settings').upsert({ key, value: settings[key] || '' })
      }
      success = true; setTimeout(() => success = false, 3000)
    } catch (e: any) { alert(e?.message) }
    finally { saving = false }
  }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Paramètres</h1>
  <button on:click={saveSettings} disabled={saving || loading} class="btn-primary"><Save size={18} /> {saving ? 'Sauvegarde...' : 'Enregistrer'}</button>
</div>

{#if success}
  <div class="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-6">
    <CheckCircle size={16} /> Paramètres mis à jour
  </div>
{/if}

{#if loading}
  <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" /></div>
{:else}
  <div class="card space-y-5">
    <h2 class="font-semibold text-lg border-b pb-2">Site</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div><label class="label">Titre du site <input type="text" bind:value={settings.site_title} class="input" /></label></div>
      <div><label class="label">Description du site <input type="text" bind:value={settings.site_description} class="input" /></label></div>
      <div><label class="label">Titre Hero <input type="text" bind:value={settings.hero_title} class="input" /></label></div>
      <div><label class="label">Sous-titre Hero <input type="text" bind:value={settings.hero_subtitle} class="input" /></label></div>
    </div>

    <h2 class="font-semibold text-lg border-b pb-2">Informations personnelles</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div><label class="label">Prénom <input type="text" bind:value={settings.first_name} class="input" /></label></div>
      <div><label class="label">Nom <input type="text" bind:value={settings.last_name} class="input" /></label></div>
      <div><label class="label">Nationalité <input type="text" bind:value={settings.nationality} class="input" /></label></div>
      <div><label class="label">Date de naissance <input type="date" bind:value={settings.birth_date} class="input" /></label></div>
      <div><label class="label">Ville <input type="text" bind:value={settings.city} class="input" /></label></div>
      <div><label class="label">Pays <input type="text" bind:value={settings.country} class="input" /></label></div>
    </div>

    <h2 class="font-semibold text-lg border-b pb-2">Contact</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div><label class="label">Téléphone <input type="text" bind:value={settings.phone} class="input" /></label></div>
      <div><label class="label">Email <input type="text" bind:value={settings.email} class="input" /></label></div>
      <div><label class="label">WhatsApp (numéro) <input type="text" bind:value={settings.whatsapp} class="input" /></label></div>
      <div><label class="label">Adresse <input type="text" bind:value={settings.address} class="input" /></label></div>
    </div>

    <h2 class="font-semibold text-lg border-b pb-2">Réseaux sociaux</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <div><label class="label">GitHub <input type="text" bind:value={settings.github} class="input" placeholder="username" /></label></div>
      <div><label class="label">LinkedIn <input type="text" bind:value={settings.linkedin} class="input" placeholder="username" /></label></div>
      <div><label class="label">Site web <input type="text" bind:value={settings.website} class="input" placeholder="https://" /></label></div>
    </div>
  </div>
{/if}
