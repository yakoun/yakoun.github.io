<script lang="ts">
  import { onMount } from 'svelte'
  import GalleryImage from './GalleryImage.svelte'

  export let item: any
  export let index = 0
  export let onOpen: (i: number) => void = () => {}

  let el: HTMLButtonElement
  let revealed = false

  onMount(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            revealed = true
            obs.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    )
    if (el) obs.observe(el)
    return () => obs.disconnect()
  })
</script>

<button
  bind:this={el}
  type="button"
  on:click={() => onOpen(index)}
  class="group relative block h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-black/5 dark:ring-white/5
         transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1
         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
  class:opacity-0={!revealed}
  class:translate-y-6={!revealed}
  style="transition-delay: {(index % 6) * 60}ms"
  aria-label={item.title || 'Image'}
>
  <GalleryImage src={item.image_url} alt={item.title || 'Image'} loading={index < 6 ? 'eager' : 'lazy'} />

  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  <div class="pointer-events-none absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
    <p class="truncate text-sm font-semibold text-white">{item.title}</p>
    {#if item.category}
      <p class="mt-0.5 text-xs uppercase tracking-wider text-white/60">{item.category}</p>
    {/if}
  </div>
</button>

<style>
  @media (prefers-reduced-motion: reduce) {
    button {
      transform: none !important;
      transition: opacity 0.2s ease !important;
    }
    :global(.group:hover) { transform: none !important; }
  }
</style>
