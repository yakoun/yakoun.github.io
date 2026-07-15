<script lang="ts">
  import { onMount } from 'svelte'
  import { toggleTheme, theme } from '$lib/stores/theme'
  import { Sun, Moon } from 'lucide-svelte'

  let mounted = false
  onMount(() => { mounted = true })
</script>

{#if mounted}
  <button
    on:click={toggleTheme}
    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110 active:scale-95"
    aria-label="Basculer le thème"
  >
    {#if $theme === 'dark'}
      <Sun size={18} class="text-yellow-400" />
    {:else}
      <Moon size={18} class="text-gray-600" />
    {/if}
  </button>
{/if}