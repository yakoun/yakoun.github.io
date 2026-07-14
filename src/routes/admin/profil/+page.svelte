<script lang="ts">
  import { supabase, isConfigured } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Save } from 'lucide-svelte'

  const defaults = {
    first_name: 'Ouniboryabi', last_name: 'YAKOUN',
    title: 'Électrotechnicien',
    summary: "Passionné par les technologies électriques, les réseaux télécom et le développement web, je possède une expertise en installation et maintenance des systèmes électriques, configuration des infrastructures réseau et création d'applications web. Rigoureux et polyvalent, je mets mes compétences au service de solutions innovantes et performantes, tout en respectant les normes de sécurité et de qualité.",
    address: 'Tsévié, Togo', phone: '+22897533307',
    email: 'yakounouniboryabi@gmail.com',
    birth_date: '1999-05-04',
    github: '', linkedin: '', website: ''
  }

  let form = { ...defaults }
  let saved = false; let saving = false

  onMount(async () => {
    if (!isConfigured) return
    const { data } = await supabase.from('profile_info').select('*').single()
    if (data) {
      form = { ...defaults, ...data }
    }
  })

  async function save() {
    saving = true; saved = false
    if (!isConfigured) { saving = false; saved = true; return }
    const { data: existing } = await supabase.from('profile_info').select('id').single()
    const { error } = existing
      ? await supabase.from('profile_info').update(form).eq('id', existing.id)
      : await supabase.from('profile_info').insert(form)
    if (!error) saved = true
    saving = false
  }
</script>

<h1 class="text-2xl font-bold mb-6">Profil</h1>

{#if saved}
  <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6 text-sm text-green-700 dark:text-green-400">Profil mis à jour</div>
{/if}

<form on:submit|preventDefault={save} class="card max-w-2xl space-y-4">
  <div class="grid sm:grid-cols-2 gap-4">
    <div><label class="label">Prénom <input type="text" bind:value={form.first_name} class="input" /></label></div>
    <div><label class="label">Nom <input type="text" bind:value={form.last_name} class="input" /></label></div>
  </div>
  <div><label class="label">Titre / Métier <input type="text" bind:value={form.title} class="input" /></label></div>
  <div><label class="label">Résumé <textarea rows={3} bind:value={form.summary} class="input resize-none"></textarea></label></div>
  <div class="grid sm:grid-cols-2 gap-4">
    <div><label class="label">Adresse <input type="text" bind:value={form.address} class="input" /></label></div>
    <div><label class="label">Téléphone <input type="text" bind:value={form.phone} class="input" /></label></div>
  </div>
  <div class="grid sm:grid-cols-2 gap-4">
    <div><label class="label">Email <input type="email" bind:value={form.email} class="input" /></label></div>
    <div><label class="label">Date de naissance <input type="date" bind:value={form.birth_date} class="input" /></label></div>
  </div>
  <div class="grid sm:grid-cols-3 gap-4">
    <div><label class="label">GitHub <input type="text" bind:value={form.github} class="input" placeholder="username" /></label></div>
    <div><label class="label">LinkedIn <input type="text" bind:value={form.linkedin} class="input" placeholder="username" /></label></div>
    <div><label class="label">Site web <input type="text" bind:value={form.website} class="input" placeholder="https://" /></label></div>
  </div>
  <button type="submit" disabled={saving} class="btn-primary"><Save size={16} /> {saving ? 'Enregistrement...' : 'Enregistrer'}</button>
</form>
