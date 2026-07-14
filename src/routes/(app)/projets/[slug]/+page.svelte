<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { ArrowLeft, Calendar, ExternalLink, Github, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-svelte'
  import { CATEGORY_LABELS } from '$lib/types'

  let project: any = null
  let related: any[] = []
  let loading = true
  let currentImage = 0
  let copied = false

  onMount(async () => {
    try {
      const { data } = await supabase.from('projects').select('*').eq('slug', $page.params.slug).single()
      project = data
      if (project) {
        const { data: rel } = await supabase.from('projects').select('*').eq('category', project.category).neq('id', project.id).limit(3)
        related = rel || []
      }
    } catch (e) { console.error(e) }
    finally { loading = false }
  })

  function prevImage() {
    if (!project?.images?.length) return
    currentImage = currentImage > 0 ? currentImage - 1 : project.images.length - 1
  }
  function nextImage() {
    if (!project?.images?.length) return
    currentImage = currentImage < project.images.length - 1 ? currentImage + 1 : 0
  }

  async function shareProject() {
    if (!navigator.share) {
      await navigator.clipboard.writeText(window.location.href)
      copied = true; setTimeout(() => copied = false, 2000)
      return
    }
    navigator.share({ title: project.title, url: window.location.href })
  }
</script>

<svelte:head>
  <title>{project?.title || 'Projet'} — Portfolio</title>
  {#if project}
    <meta name="description" content={project.description?.slice(0, 160)} />
    <meta property="og:title" content={project.title} />
    <meta property="og:description" content={project.description?.slice(0, 160)} />
    {#if project.images?.length > 0}<meta property="og:image" content={project.images[0]} />{/if}
  {/if}
</svelte:head>

<section class="pt-20 pb-16 px-4">
  <div class="max-w-5xl mx-auto">
    <!-- Back -->
    <a href="/projets" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-6 group">
      <ArrowLeft size={16} class="group-hover:-translate-x-1 transition-transform" /> Retour aux projets
    </a>

    {#if loading}
      <div class="animate-pulse space-y-6">
        <div class="aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800" />
        <div class="space-y-3 max-w-3xl">
          <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
          <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
          <div class="h-32 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>
    {:else if !project}
      <div class="text-center py-20">
        <p class="text-6xl mb-4 opacity-30">🔍</p>
        <p class="text-lg text-gray-500">Projet introuvable</p>
        <a href="/projets" class="text-primary-600 text-sm mt-2 inline-block hover:underline">Voir tous les projets</a>
      </div>
    {:else}
      <!-- Hero Image / Carousel -->
      {#if project.images?.length > 0}
        <div class="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8 group/image">
          <!-- Main image -->
          <div class="aspect-[21/9] relative">
            {#each project.images as img, i}
              <div class="absolute inset-0 transition-all duration-500 ease-out {i === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}">
                <img src={img} alt="{project.title} - Image {i + 1}" class="w-full h-full object-cover" />
              </div>
            {/each}
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>

          <!-- Navigation -->
          {#if project.images.length > 1}
            <button on:click={prevImage} class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover/image:opacity-100 transition-all hover:bg-white/40">
              <ChevronLeft size={24} />
            </button>
            <button on:click={nextImage} class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover/image:opacity-100 transition-all hover:bg-white/40">
              <ChevronRight size={24} />
            </button>
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {#each project.images as _, i}
                <button on:click={() => currentImage = i} class="w-2.5 h-2.5 rounded-full transition-all duration-300 {i === currentImage ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}" />
              {/each}
            </div>
            <div class="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-sm">
              {currentImage + 1} / {project.images.length}
            </div>
          {/if}

          <!-- Thumbnails -->
          {#if project.images.length > 1}
            <div class="flex gap-2 p-3 bg-gray-50 dark:bg-gray-900 overflow-x-auto">
              {#each project.images as img, i}
                <button on:click={() => currentImage = i} class="w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all {i === currentImage ? 'ring-2 ring-primary-500 opacity-100' : 'opacity-60 hover:opacity-100'}">
                  <img src={img} alt="" class="w-full h-full object-cover" />
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {:else}
        <div class="aspect-[21/9] rounded-2xl bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20 mb-8 flex items-center justify-center">
          <div class="text-center">
            <span class="text-7xl font-bold text-primary-200 dark:text-primary-800">{project.title?.charAt(0)?.toUpperCase()}</span>
            <p class="text-primary-300 dark:text-primary-700 text-sm mt-2">Aucune image</p>
          </div>
        </div>
      {/if}

      <!-- Project Content -->
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium capitalize">
                {CATEGORY_LABELS[project.category] || project.category?.replace('-', ' ')}
              </span>
              {#if project.date}
                <span class="flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar size={14} />
                  {new Date(project.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                </span>
              {/if}
            </div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{project.title}</h1>
          </div>
          <button on:click={shareProject} class="btn-ghost border border-gray-300 dark:border-gray-600 gap-2 text-sm flex-shrink-0">
            {#if copied}<Check size={16} class="text-green-500" /> Lien copié{:else}<Share2 size={16} /> Partager{/if}
          </button>
        </div>

        <!-- Description -->
        <div class="prose prose-gray dark:prose-invert max-w-none mb-10">
          <div class="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap text-lg">{project.description}</div>
        </div>

        <!-- Tech Stack -->
        {#if project.technologies}
          <div class="mb-10 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h3 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Technologies utilisées</h3>
            <div class="flex flex-wrap gap-2">
              {#each project.technologies.split(',').map(t => t.trim()).filter(Boolean) as tech}
                <span class="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-shadow">
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Links -->
        <div class="flex flex-wrap gap-3 pt-8 border-t border-gray-200 dark:border-gray-800">
          {#if project.github_repo}
            <a href="https://github.com/{project.github_repo}" target="_blank" rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-lg shadow-gray-900/20">
              <Github size={18} /> Voir sur GitHub
            </a>
          {/if}
          {#if project.live_url}
            <a href={project.live_url} target="_blank" rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
              <ExternalLink size={18} /> Voir le site live
            </a>
          {/if}
        </div>

        <!-- Related Projects -->
        {#if related.length > 0}
          <div class="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
            <h2 class="text-2xl font-bold mb-6">Projets similaires</h2>
            <div class="grid sm:grid-cols-3 gap-4">
              {#each related as r}
                <a href="/projets/{r.slug}"
                  class="group relative rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg">
                  <div class="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                    {#if r.images?.length > 0}
                      <img src={r.images[0]} alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    {:else}
                      <div class="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-300">{r.title?.charAt(0)}</div>
                    {/if}
                  </div>
                  <div class="p-4">
                    <span class="badge-primary text-xs">{CATEGORY_LABELS[r.category] || r.category}</span>
                    <h3 class="font-semibold text-sm mt-1 group-hover:text-primary-600 transition-colors">{r.title}</h3>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>
