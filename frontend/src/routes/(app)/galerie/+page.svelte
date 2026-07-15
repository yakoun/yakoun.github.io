<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from '$lib/api/supabase'
  import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-svelte'

  let items: any[] = []
  let loading = true
  let lightboxIndex: number | null = null
  let filtered = 'all'

  const categories = ['all', 'electricite', 'reseau', 'chantier', 'tableau', 'divers']

  onMount(async () => {
    try {
      const { data } = await supabase.from('gallery').select('*').order('order')
      items = data ?? []
    } catch {}
    loading = false
  })

  $: filteredItems = filtered === 'all' ? items : items.filter(i => i.category === filtered)
  $: current = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  function open(idx: number) { lightboxIndex = idx }
  function close() { lightboxIndex = null }
  function prev() { if (lightboxIndex !== null && lightboxIndex > 0) lightboxIndex-- }
  function next() { if (lightboxIndex !== null && lightboxIndex < filteredItems.length - 1) lightboxIndex++ }

  function onKeydown(e: KeyboardEvent) {
    if (lightboxIndex === null) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div class="space-y-8">
  <section class="text-center space-y-4">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight gradient-text">Galerie</h1>
    <p class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Quelques réalisations en images</p>
  </section>

  <!-- Filtres -->
  <div class="flex flex-wrap justify-center gap-2">
    {#each categories as cat}
      <button
        on:click={() => filtered = cat}
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all {filtered === cat ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}"
      >
        {cat === 'all' ? 'Tout' : cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    {/each}
  </div>

  {#if loading}
    <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" /></div>
  {:else if filteredItems.length === 0}
    <div class="text-center py-20 text-gray-400">
      <ImageIcon size={48} class="mx-auto mb-3 opacity-50" />
      <p>Aucune image dans cette catégorie</p>
    </div>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each filteredItems as item, i}
        <button
          on:click={() => open(i)}
          class="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800"
        >
          <img
            src={item.image_url}
            alt={item.title}
            class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <div class="text-white">
              <p class="font-semibold text-sm">{item.title}</p>
              {#if item.description}<p class="text-xs text-white/80 mt-0.5">{item.description}</p>{/if}
            </div>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- Lightbox -->
{#if lightboxIndex !== null && current}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-noninteractive-element-interactions -->
  <div
    role="dialog" aria-modal="true"
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
    on:click={close}
  >
    <button
      on:click|stopPropagation={close}
      class="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
    >
      <X size={24} />
    </button>

    {#if lightboxIndex > 0}
      <button
        on:click|stopPropagation={prev}
        class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronLeft size={28} />
      </button>
    {/if}

    {#if lightboxIndex < filteredItems.length - 1}
      <button
        on:click|stopPropagation={next}
        class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronRight size={28} />
      </button>
    {/if}

    <div class="max-w-5xl max-h-[85vh] flex flex-col items-center" on:click|stopPropagation>
      <img
        src={current.image_url}
        alt={current.title}
        class="max-w-full max-h-[75vh] object-contain rounded-2xl"
      />
      <div class="text-white text-center mt-4">
        <p class="font-semibold">{current.title}</p>
        {#if current.description}<p class="text-sm text-white/70 mt-1">{current.description}</p>{/if}
      </div>
    </div>
  </div>
{/if}
