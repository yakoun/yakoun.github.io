<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from '$lib/api/supabase'
  import Gallery from '$lib/components/gallery/Gallery.svelte'

  let items: any[] = []
  let loading = true

  onMount(async () => {
    try {
      const { data } = await supabase.from('gallery').select('*').order('order')
      items = data ?? []
    } catch {
      items = []
    }
    loading = false
  })
</script>

<svelte:head><title>Galerie — ElectroDev</title></svelte:head>

<div class="min-h-screen bg-[#FAFAFA] px-4 py-16 dark:bg-gray-950 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <header class="mb-10 text-center">
      <h1 class="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
        Galerie
      </h1>
      <p class="mx-auto mt-3 max-w-md text-gray-500 dark:text-gray-400">
        Réalisations, chantiers et installations en images.
      </p>
    </header>

    <Gallery {items} {loading} />
  </div>
</div>
