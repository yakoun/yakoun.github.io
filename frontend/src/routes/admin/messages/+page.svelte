<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Mail, Trash2, Eye, Calendar, MailOpen } from 'lucide-svelte'

  let messages: any[] = []
  let loading = true
  let selected: any = null

  onMount(async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    messages = data || []
    loading = false
  })

  $: unreadCount = messages.filter(m => !m.read).length

  async function markRead(msg: any) {
    if (msg.read) return
    await supabase.from('messages').update({ read: true }).eq('id', msg.id)
    msg.read = true
  }

  async function markUnread(msg: any) {
    if (!msg.read) return
    await supabase.from('messages').update({ read: false }).eq('id', msg.id)
    msg.read = false
  }

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
  <span class="text-sm text-gray-500">
    {messages.length} message(s)
    {#if unreadCount > 0}
      <span class="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/50 text-primary-700">
        {unreadCount} non lu(s)
      </span>
    {/if}
  </span>
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
          on:click={() => { selected = msg; markRead(msg) }}
          class="w-full text-left card hover:shadow-md transition-shadow {selected?.id === msg.id ? 'ring-2 ring-primary-500' : ''} {!msg.read ? 'border-l-4 border-l-primary-500 bg-primary-50/50 dark:bg-primary-950/20' : ''}"
        >
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full {msg.read ? 'bg-gray-100 dark:bg-gray-800' : 'bg-primary-100 dark:bg-primary-900'} flex items-center justify-center {msg.read ? 'text-gray-400' : 'text-primary-600'} font-medium shrink-0">
              {msg.name?.charAt(0).toUpperCase()}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-semibold text-sm {msg.read ? '' : 'text-primary-700'}">{msg.name}</span>
                {#if !msg.read}<span class="w-2 h-2 rounded-full bg-primary-500 shrink-0" />{/if}
                <span class="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <p class="text-sm {msg.read ? 'text-gray-500' : 'text-gray-700 dark:text-gray-300 font-medium'} truncate">{msg.message}</p>
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
          <div class="flex items-center justify-between gap-2 text-sm text-gray-400 mb-4">
            <div class="flex items-center gap-2">
              <Calendar size={14} /> {new Date(selected.created_at).toLocaleString('fr-FR')}
            </div>
            <button
              on:click={() => selected.read ? markUnread(selected) : markRead(selected)}
              class="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors {selected.read ? 'text-gray-400' : 'text-primary-600'}"
            >
              {#if selected.read}<Mail size={14} /> Marquer non lu{:else}<MailOpen size={14} /> Marquer lu{/if}
            </button>
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