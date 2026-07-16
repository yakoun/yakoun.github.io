<script lang="ts">
  import { scale, fade, fly } from 'svelte/transition'
  import { backOut, quintOut } from 'svelte/easing'
  import { X, ChevronLeft, ChevronRight } from 'lucide-svelte'

  export let items: any[] = []
  export let index: number = 0
  export let onClose: () => void = () => {}
  export let onNav: (i: number) => void = () => {}

  function key(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onNav(index > 0 ? index - 1 : items.length - 1)
    if (e.key === 'ArrowRight') onNav(index < items.length - 1 ? index + 1 : 0)
  }

  $: current = items[index]
</script>

<svelte:window on:keydown={key} />

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-no-noninteractive-element-interactions -->
<div
  role="dialog"
  aria-modal="true"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
  on:click={onClose}
  transition:fade={{ duration: 200 }}
>
  <button
    type="button"
    on:click|stopPropagation={onClose}
    class="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25"
    aria-label="Fermer"
  >
    <X size={22} />
  </button>

  {#if index > 0}
    <button
      type="button"
      on:click|stopPropagation={() => onNav(index - 1)}
      class="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
      aria-label="Précédent"
    >
      <ChevronLeft size={26} />
    </button>
  {/if}

  {#if index < items.length - 1}
    <button
      type="button"
      on:click|stopPropagation={() => onNav(index + 1)}
      class="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
      aria-label="Suivant"
    >
      <ChevronRight size={26} />
    </button>
  {/if}

  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-no-noninteractive-element-interactions -->
  <div class="flex max-h-[88vh] max-w-5xl flex-col items-center" on:click|stopPropagation in:scale={{ duration: 350, start: 0.92, easing: backOut }}>
    {#if current}
      <img src={current.image_url} alt={current.title || 'Image'} class="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" />
      <div class="mt-4 text-center" in:fly={{ y: 16, duration: 400, delay: 150, easing: quintOut }}>
        <p class="font-semibold text-white">{current.title}</p>
        {#if current.category}<p class="mt-1 text-xs uppercase tracking-wider text-white/50">{current.category}</p>{/if}
        {#if current.description}<p class="mt-2 max-w-md text-sm text-white/70">{current.description}</p>{/if}
        <p class="mt-3 text-xs text-white/30">{index + 1} / {items.length}</p>
      </div>
    {/if}
  </div>
</div>
