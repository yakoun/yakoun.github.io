<script lang="ts">
  import { supabase, isConfigured } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Plus, Pencil, Trash2, Save, X, PlusCircle, MinusCircle } from 'lucide-svelte'

  let items: any[] = []; let loading = true; let editing: any = null; let creating = false
  let form: any = { company: '', role: '', location: '', start_date: '', end_date: '', responsibilities: [''], current: false }

  const seedData = [
    { company: 'EDTel SARL', role: 'Technicien Monteur', location: 'Lomé, Togo', start_date: '2021-07', end_date: '2021-10', responsibilities: ['Technicien en fibre optique', 'Armement des poteaux', 'Pose de câbles fibre optique'], current: false },
    { company: 'CEET Tsévié', role: 'Stage Technique Réseau Électrique', location: 'Tsévié, Togo', start_date: '2021-01', end_date: '2021-05', responsibilities: ['Fouilles et implantation de poteaux électriques', 'Pose de câbles électriques', 'Dépannage électrique', 'Tracé de plans de maintenance', 'Rédaction des rapports de fin de travaux'], current: false },
    { company: 'SNPT', role: "Stage d'immersion - Entretien Électrique", location: 'Hahotoé', start_date: '2017-07', end_date: '2017-08', responsibilities: ['Diagnostic des systèmes électriques', 'Analyse des schémas électriques', 'Maintenance préventive', 'Maintenance corrective'], current: false }
  ]

  function pack(item: any) {
    const loc = item.location || ''
    const resps = (item.responsibilities || []).filter((r: string) => r.trim())
    const parts: string[] = []
    if (loc) parts.push('[LOC]' + loc)
    if (resps.length) parts.push('[RESP]' + resps.join('||'))
    return parts.join('\n')
  }

  function unpack(desc: string) {
    const result: any = { location: '', responsibilities: [''] }
    if (!desc) return result
    const locMatch = desc.match(/\[LOC\](.+?)(?:\n|$)/)
    if (locMatch) result.location = locMatch[1].trim()
    const respMatch = desc.match(/\[RESP\](.+)/)
    if (respMatch) {
      result.responsibilities = respMatch[1].split('||').filter(Boolean)
      if (result.responsibilities.length === 0) result.responsibilities = ['']
    }
    return result
  }

  onMount(async () => { await load(); loading = false })

  async function load() {
    if (!isConfigured) return
    const { data } = await supabase.from('experience').select('*').order('order')
    items = data ?? []
    if (items.length === 0 && isConfigured) {
      for (let i = 0; i < seedData.length; i++) {
        const s = seedData[i]
        await supabase.from('experience').insert({
          company: s.company, role: s.role,
          description: pack(s),
          start_date: s.start_date, end_date: s.end_date,
          current: s.current, order: i
        })
      }
      const { data: seeded } = await supabase.from('experience').select('*').order('order')
      items = seeded ?? []
    }
  }

  function newForm() {
    creating = true; editing = null
    form = { company: '', role: '', location: '', start_date: '', end_date: '', responsibilities: [''], current: false }
  }

  function editItem(item: any) {
    creating = false; editing = item.id
    const unpacked = unpack(item.description || '')
    form = {
      company: item.company || '',
      role: item.role || '',
      location: unpacked.location,
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      responsibilities: unpacked.responsibilities,
      current: item.current || false
    }
  }

  function cancel() { creating = false; editing = null }

  function addResp() { form.responsibilities = [...form.responsibilities, ''] }
  function removeResp(i: number) { form.responsibilities = form.responsibilities.filter((_: any, idx: number) => idx !== i) }

  async function save() {
    if (!isConfigured) return
    const data = {
      company: form.company, role: form.role,
      description: pack(form),
      start_date: form.start_date, end_date: form.end_date,
      current: form.current,
      order: creating ? items.length : undefined
    }
    if (creating) {
      await supabase.from('experience').insert(data)
    } else {
      await supabase.from('experience').update(data).eq('id', editing)
    }
    cancel(); await load()
  }

  async function del(id: string) {
    if (!confirm('Supprimer ?')) return; await supabase.from('experience').delete().eq('id', id); await load()
  }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Expériences</h1>
  {#if !creating}
    <button on:click={newForm} class="btn-primary text-sm"><Plus size={16} /> Ajouter</button>
  {/if}
</div>

{#if creating || editing}
  <form on:submit|preventDefault={save} class="card mb-6 max-w-xl space-y-3">
    <div class="grid sm:grid-cols-2 gap-3">
      <div><label class="label">Entreprise <input type="text" bind:value={form.company} required class="input" /></label></div>
      <div><label class="label">Position <input type="text" bind:value={form.role} required class="input" /></label></div>
    </div>
    <div class="grid sm:grid-cols-3 gap-3">
      <div><label class="label">Lieu <input type="text" bind:value={form.location} class="input" placeholder="Ville, Pays" /></label></div>
      <div><label class="label">Date début <input type="text" bind:value={form.start_date} required class="input" placeholder="YYYY-MM" /></label></div>
      <div><label class="label">Date fin <input type="text" bind:value={form.end_date} disabled={form.current} class="input" placeholder="YYYY-MM ou laisser vide" /></label></div>
    </div>
    <div class="flex items-center gap-4">
      <label class="flex items-center gap-2 text-sm"><input type="checkbox" bind:checked={form.current} /> Poste actuel</label>
    </div>
    <div>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Responsabilités</label>
      {#each form.responsibilities as resp, i}
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs text-gray-400 w-5">{i + 1}.</span>
          <input type="text" bind:value={form.responsibilities[i]} class="input flex-1" placeholder="Ex: Installation de câbles" />
          <button type="button" on:click={() => removeResp(i)} class="p-1 text-red-400 hover:text-red-600" disabled={form.responsibilities.length <= 1}><MinusCircle size={16} /></button>
        </div>
      {/each}
      <button type="button" on:click={addResp} class="text-xs text-primary-600 hover:text-primary-800 flex items-center gap-1 mt-1"><PlusCircle size={14} /> Ajouter une responsabilité</button>
    </div>
    <div class="flex gap-2 pt-2">
      <button type="submit" class="btn-primary text-sm"><Save size={14} /> Enregistrer</button>
      <button type="button" on:click={cancel} class="btn-secondary text-sm"><X size={14} /> Annuler</button>
    </div>
  </form>
{/if}

<div class="space-y-2">
  {#each items as item}
    {@const u = unpack(item.description || '')}
    <div class="card flex items-start justify-between gap-4 p-4">
      <div class="flex-1">
        <h3 class="font-semibold text-sm">{item.role}</h3>
        <p class="text-xs text-primary-600">{item.company}{#if u.location} · {u.location}{/if}</p>
        <p class="text-xs text-gray-400">{item.start_date} — {item.current ? 'Actuel' : item.end_date}</p>
        {#if u.responsibilities.length > 0 && u.responsibilities[0]}
          <ul class="mt-2 space-y-0.5">
            {#each u.responsibilities as r}
              <li class="text-xs text-gray-500 flex items-start gap-1.5"><span class="text-primary-400 mt-0.5">•</span> {r}</li>
            {/each}
          </ul>
        {/if}
      </div>
      <div class="flex gap-1 shrink-0">
        <button on:click={() => editItem(item)} class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><Pencil size={14} /></button>
        <button on:click={() => del(item.id)} class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={14} /></button>
      </div>
    </div>
  {/each}
</div>
