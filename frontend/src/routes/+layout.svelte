<script lang="ts">
  import '../app.css'
  import SEO from '$lib/components/SEO.svelte'
  import { theme } from '$lib/stores/theme'
</script>

<SEO />

<div class="min-h-screen transition-colors duration-300" class:dark={$theme === 'dark'}>
  <slot />
</div>
