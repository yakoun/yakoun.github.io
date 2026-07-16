<script lang="ts">
  export let src: string
  export let alt = ''
  export let loading: 'lazy' | 'eager' = 'lazy'

  let loaded = false
  let error = false
</script>

<div class="relative w-full h-full overflow-hidden bg-gray-200 dark:bg-gray-800">
  {#if !loaded && !error}
    <div class="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
  {/if}

  {#if error}
    <div class="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
    </div>
  {:else}
    <img
      {src}
      {alt}
      {loading}
      decoding="async"
      on:load={() => (loaded = true)}
      on:error={() => (error = true)}
      class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 {loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}"
    />
  {/if}
</div>

<style>
  @media (prefers-reduced-motion: reduce) {
    img { transition: opacity 0.2s ease !important; }
    :global(.group:hover) img { transform: none !important; }
  }
</style>
