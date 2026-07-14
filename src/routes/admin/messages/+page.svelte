<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Mail, Trash2, Eye, Calendar } from 'lucide-svelte'

  let messages: any[] = []
  let loading = true
  let selected: any = null

  onMount(async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    messages = data || []
    loading = false
  })

  async function remove(id: string) {
    if (!confirm('Supprimer ce message ?')) return
    try {
      await supabase.from('messages').delete().eq('id', id)
      messages = messages.filter((m) => m.id !== id)
      if (selected?.id === id) selected = null
    } catch (e: any) { alert(e?.message) }
  }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Messages reçus</h1>
  <span class="text-sm text-gray-500">{messages.length} message(s)</span>
</div>

{#if loading}
  <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" /></div>
{:else if messages.length === 0}
  <div class="card text-center py-12">
    <Mail size={48} class="mx-auto text-gray-300 mb-4" />
    <p class="text-gray-500">Aucun message pour l'instant</p>
  </div>
{:else}
  <div class="grid lg:grid-cols-2 gap-6">
    <div class="space-y-3">
      {#each messages as msg}
        <button
          on:click={() => selected = msg}
          class="w-full text-left card hover:shadow-md transition-shadow {selected?.id === msg.id ? 'ring-2 ring-primary-500' : ''}"
        >
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 font-medium shrink-0">
              {msg.name?.charAt(0).toUpperCase()}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-semibold text-sm">{msg.name}</span>
                <span class="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <p class="text-sm text-gray-500 truncate">{msg.message}</p>
              <p class="text-xs text-gray-400 mt-1">{msg.email}</p>
            </div>
            <button on:click|stopPropagation={() => remove(msg.id)} class="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30">
              <Trash2 size={14} class="text-red-500" />
            </button>
          </div>
        </button>
      {/each}
    </div>

    <div>
      {#if selected}
        <div class="card">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 text-lg font-bold">
              {selected.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 class="font-semibold text-lg">{selected.name}</h2>
              <div class="flex items-center gap-3 text-sm text-gray-500">
                <span>{selected.email}</span>
                {#if selected.phone}<span>· {selected.phone}</span>{/if}
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Calendar size={14} /> {new Date(selected.created_at).toLocaleString('fr-FR')}
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p class="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
          </div>
        </div>
      {:else}
        <div class="card flex items-center justify-center py-20 text-gray-400">
          <Eye size={48} class="mx-auto mb-3" />
          <p class="text-sm">Sélectionnez un message</p>
        </div>
      {/if}
    </div>
  </div>
{/if}