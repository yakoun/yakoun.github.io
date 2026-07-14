<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte'

  export let images: string[] = []
  export let title = ''

  let current = 0
  let interval: ReturnType<typeof setInterval> | null = null

  function prev() { current = current > 0 ? current - 1 : images.length - 1 }
  function next() { current = current < images.length - 1 ? current + 1 : 0 }
  function go(i: number) { current = i }

  function startAuto() { interval = setInterval(next, 5000) }
  function stopAuto() { if (interval) clearInterval(interval); interval = null }

  import { onMount, onDestroy } from 'svelte'
  onMount(startAuto)
  onDestroy(() => { if (interval) clearInterval(interval) })
</script>

<div class="relative group overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800" on:mouseenter={stopAuto} on:mouseleave={startAuto}>
  <div class="aspect-video relative">
    {#each images as img, i}
      <div class="absolute inset-0 transition-all duration-700 ease-out {i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}">
        <img src={img} alt="{title} - image {i + 1}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    {/each}
  </div>

  {#if images.length > 1}
    <button on:click={prev} class="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40">
      <ChevronLeft size={22} />
    </button>
    <button on:click={next} class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40">
      <ChevronRight size={22} />
    </button>

    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
      {#each images as _, i}
        <button on:click={() => go(i)} class="w-2 h-2 rounded-full transition-all duration-300 {i === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}"></button>
      {/each}
    </div>

    <div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs">
      {current + 1} / {images.length}
    </div>
  {/if}
</div>
