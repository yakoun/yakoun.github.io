<script lang="ts">
  import { flip } from 'svelte/animate'
  import GalleryItem from './GalleryItem.svelte'
  import GallerySkeleton from './GallerySkeleton.svelte'
  import GalleryLightbox from './GalleryLightbox.svelte'
  import { assignSizes, SIZE_CLASS } from '$lib/utils/galleryLayout'
  import { Search, ImageOff } from 'lucide-svelte'

  export let items: any[] = []
  export let loading = true

  let query = ''
  let category = 'all'
  let lightboxIndex: number | null = null

  $: categories = ['all', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))]

  $: filtered = items.filter((i) => {
    const okCat = category === 'all' || i.category === category
    const q = query.trim().toLowerCase()
    const okQuery =
      !q ||
      (i.title || '').toLowerCase().includes(q) ||
      (i.description || '').toLowerCase().includes(q) ||
      (i.category || '').toLowerCase().includes(q)
    return okCat && okQuery
  })

  // Recompute the designer layout whenever the visible set changes.
  $: sizes = assignSizes(filtered.length)

  function open(i: number) {
    lightboxIndex = i
    document.body.style.overflow = 'hidden'
  }
  function close() {
    lightboxIndex = null
    document.body.style.overflow = ''
  }
  function nav(i: number) {
    lightboxIndex = i
  }
</script>

<div class="space-y-8">
  <!-- Toolbar -->
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="relative w-full sm:max-w-xs">
      <Search size={16} class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        bind:value={query}
        placeholder="Rechercher une image…"
        class="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-700 outline-none transition-all focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
      />
    </div>

    <div class="flex flex-wrap gap-2">
      {#each categories as cat}
        <button
          type="button"
          on:click={() => (category = cat)}
          class="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 active:scale-95 {category === cat
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
            : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800'}"
        >
          {cat === 'all' ? 'Tout' : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      {/each}
    </div>
  </div>

  <!-- Grid -->
  {#if loading}
    <GallerySkeleton />
  {:else if filtered.length === 0}
    <div class="flex flex-col items-center justify-center py-24 text-gray-400">
      <ImageOff size={48} class="mb-3 opacity-50" />
      <p class="text-lg">Aucune image ne correspond</p>
    </div>
  {:else}
    <div
      class="grid grid-cols-2 gap-4 [grid-auto-flow:dense] md:grid-cols-8 md:gap-5 lg:grid-cols-12 lg:gap-6
             auto-rows-[140px] md:auto-rows-[120px] lg:auto-rows-[110px]"
    >
      {#each filtered as item, i (item.id)}
        <div class="h-full {SIZE_CLASS[sizes[i]]}" animate:flip={{ duration: 450, easing: (t) => 1 - Math.pow(1 - t, 3) }}>
          <GalleryItem {item} index={i} onOpen={open} />
        </div>
      {/each}
    </div>

    <p class="text-center text-sm text-gray-400">{filtered.length} image{filtered.length > 1 ? 's' : ''}</p>
  {/if}
</div>

{#if lightboxIndex !== null}
  <GalleryLightbox items={filtered} index={lightboxIndex ?? 0} onClose={close} onNav={nav} />
{/if}
