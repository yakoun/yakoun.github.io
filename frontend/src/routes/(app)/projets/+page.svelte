<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { CATEGORIES, CATEGORY_LABELS } from '$lib/types'
  import { onMount } from 'svelte'
  import { fly, scale } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import { Calendar, ArrowRight, Filter, Sparkles, Search, X, Eye } from 'lucide-svelte'

  let projects: any[] = []
  let loading = true
  let activeCategory = ''
  let searchQuery = ''
  let visible = new Set<number>()

  onMount(async () => {
    try {
      const { data } = await supabase.from('projects').select('*').order('date', { ascending: false })
      projects = data || []
    } catch (_) { /* offline */ }
    loading = false
  })

  $: categories = [...new Set(projects.map(p => p.category))].filter(Boolean)
  $: featured = projects.filter(p => p.featured)
  $: filtered = projects.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !(p.description || '').toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  $: count = projects.length

  function observeCard(el: Element, i: number) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          visible.add(i)
          visible = new Set(visible)
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1, rootMargin: '50px' })
    observer.observe(el)
    return { destroy: () => observer.disconnect() }
  }

  function tilt(e: MouseEvent, el: HTMLElement) {
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--rx', `${y * -12}deg`)
    el.style.setProperty('--ry', `${x * 12}deg`)
    el.style.setProperty('--sx', `${1 + Math.abs(x * 0.02)}`)
    el.style.setProperty('--glow-x', `${(e.clientX - rect.left) / rect.width * 100}%`)
    el.style.setProperty('--glow-y', `${(e.clientY - rect.top) / rect.height * 100}%`)
  }

  function resetTilt(el: HTMLElement) {
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--sx', '1')
  }
</script>

<svelte:head><title>Projets — Portfolio</title></svelte:head>

<!-- Hero -->
<section class="relative min-h-[50vh] flex items-center justify-center px-4 overflow-hidden pt-20">
  <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950" />
  <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"></div>

  <!-- Floating geometric shapes -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <div class="absolute top-1/4 left-[10%] w-4 h-4 rounded-full bg-primary-400/20 animate-float-slow" />
    <div class="absolute top-1/3 right-[15%] w-6 h-6 rounded-lg rotate-45 bg-purple-400/20 animate-float-slower" />
    <div class="absolute bottom-1/4 left-[20%] w-3 h-3 rounded-full bg-amber-400/20 animate-float-fast" />
    <div class="absolute top-[20%] right-[25%] w-5 h-5 rounded-full border-2 border-primary-300/30 animate-float" />
    <div class="absolute bottom-[30%] right-[10%] w-8 h-0.5 bg-gradient-to-r from-transparent via-primary-400/40 to-transparent rotate-45 animate-pulse-slow" />
    <div class="absolute top-[40%] left-[5%] w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent -rotate-30 animate-pulse" />
  </div>

  <div class="relative text-center max-w-3xl mx-auto">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium mb-6 border border-primary-200 dark:border-primary-800" in:fly={{ y: 20, duration: 600, easing: quintOut }}>
      <Sparkles size={12} /> {count} projet{count !== 1 ? 's' : ''} réalisé{count !== 1 ? 's' : ''}
    </div>
    <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-4" in:fly={{ y: 30, duration: 700, delay: 100, easing: quintOut }}>
      Mes <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-500 to-amber-500">réalisations</span>
    </h1>
    <p class="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto" in:fly={{ y: 30, duration: 700, delay: 200, easing: quintOut }}>
      De l'électricité au développement, chaque projet raconte une histoire
    </p>
  </div>
</section>

<div class="max-w-6xl mx-auto px-4 pb-24 -mt-8 relative z-10">

  <!-- Filter Bar -->
  <div class="sticky top-16 z-20 mb-8 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80 shadow-lg shadow-gray-200/30 dark:shadow-gray-950/30" in:fly={{ y: 30, duration: 600, delay: 300, easing: quintOut }}>
    <div class="flex flex-wrap items-center gap-2">
      <Filter size={16} class="text-gray-400 flex-shrink-0 mr-1" />
      <button on:click={() => activeCategory = ''}
        class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 {!activeCategory ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}">
        Tout
      </button>
      {#each categories as cat}
        <button on:click={() => activeCategory = cat}
          class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap {activeCategory === cat ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}">
          <span class="text-sm leading-none">{CATEGORIES.find(c => c.value === cat)?.emoji || ''}</span>
          {CATEGORY_LABELS[cat] || cat.replace('-', ' ')}
        </button>
      {/each}
      <div class="flex-1 min-w-[140px] relative mt-2 sm:mt-0 sm:ml-auto w-full sm:w-auto">
        <Search size={14} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input type="text" placeholder="Rechercher..." bind:value={searchQuery}
          class="input pl-9 pr-8 text-sm w-full rounded-full bg-gray-50 dark:bg-gray-800/50 border-0 ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 transition-all" />
        {#if searchQuery}
          <button on:click={() => searchQuery = ''} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={14} />
          </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Loading -->
  {#if loading}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each [1,2,3,4,5,6] as _}
        <div class="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div class="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div class="p-5 space-y-3">
            <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse" />
            <div class="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
            <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse" />
            <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      {/each}
    </div>

  <!-- Empty -->
  {:else if filtered.length === 0}
    <div class="text-center py-24" in:fly={{ y: 40, duration: 500 }}>
      <div class="text-7xl mb-6 opacity-20">🔍</div>
      <p class="text-xl text-gray-400 font-medium">Aucun projet trouvé</p>
      <p class="text-sm text-gray-400 mt-1">Essaie de modifier les filtres</p>
      <button on:click={() => { activeCategory = ''; searchQuery = '' }}
        class="mt-4 px-5 py-2 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25">
        Réinitialiser les filtres
      </button>
    </div>

  <!-- Results -->
  {:else}
    <!-- Featured Projects -->
    {#if featured.length > 0 && !activeCategory && !searchQuery}
      <div class="mb-14" in:fly={{ y: 40, duration: 600, delay: 200, easing: quintOut }}>
        <div class="flex items-center gap-2 mb-6">
          <div class="relative">
            <Sparkles size={18} class="text-yellow-500" />
            <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          </div>
          <h2 class="text-lg font-bold">À la une</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-5">
          {#each featured.slice(0, 2) as project, i}
            <a href="/projets/{project.slug}"
              class="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white p-8 min-h-[300px] flex flex-col justify-end transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-600/30"
              style="animation-delay: {i * 150}ms"
              in:fly={{ y: 40, duration: 600, delay: 400 + i * 150, easing: quintOut }}>
              <!-- Animated gradient border -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <!-- Background image -->
              {#if project.images?.length > 0}
                <img src={project.images[0]} alt="" class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" loading="lazy" />
              {/if}
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div class="relative">
                <div class="flex items-center gap-2 mb-3">
                  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-md border border-white/10">
                    <Sparkles size={12} /> À la une
                  </span>
                  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs backdrop-blur-md">
                    {CATEGORIES.find(c => c.value === project.category)?.emoji} {CATEGORY_LABELS[project.category] || project.category}
                  </span>
                </div>
                <h3 class="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary-200 transition-all">{project.title}</h3>
                <p class="text-white/70 text-sm line-clamp-2 mb-4 leading-relaxed">{project.description}</p>
                <div class="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:gap-3 transition-all">
                  <span>Découvrir</span>
                  <span class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all"><ArrowRight size={14} /></span>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Stats row -->
    <div class="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-400" in:fly={{ y: 20, duration: 400, easing: quintOut }}>
      <span class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
        <span class="font-semibold text-gray-700 dark:text-gray-300">{filtered.length}</span> projet{filtered.length !== 1 ? 's' : ''} affiché{filtered.length !== 1 ? 's' : ''}
      </span>
      {#each categories as cat}
        {#if projects.filter(p => p.category === cat).length > 0}
          <span class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center gap-1">
            {CATEGORIES.find(c => c.value === cat)?.emoji}
            <span class="font-semibold text-gray-700 dark:text-gray-300">{projects.filter(p => p.category === cat).length}</span>
          </span>
        {/if}
      {/each}
    </div>

    <!-- Project Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each filtered as project, i}
        <a href="/projets/{project.slug}"
          use:observeCard={i}
          class="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-transparent hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5 transition-all duration-500"
          style="transform: perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--sx,1)); --glow-x: 50%; --glow-y: 50%;"
          on:mousemove={(e) => tilt(e, e.currentTarget)}
          on:mouseleave={(e) => resetTilt(e.currentTarget)}
          in:fly={{ y: 50, duration: 600, delay: i * 80, easing: quintOut }}
          out:scale={{ duration: 200 }}>

          <!-- Glow effect on hover -->
          <div class="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-purple-500 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />

          <!-- Image -->
          <div class="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            {#if project.images?.length > 0}
              <img src={project.images[0]} alt={project.title} class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {:else}
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-6xl font-bold text-gray-300 dark:text-gray-700 group-hover:scale-110 transition-transform duration-500">{project.title?.charAt(0)?.toUpperCase()}</span>
              </div>
            {/if}
            <!-- Category badge -->
            <div class="absolute top-3 left-3 flex gap-2">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 shadow-lg flex items-center gap-1">
                {CATEGORIES.find(c => c.value === project.category)?.emoji || ''}
                {CATEGORY_LABELS[project.category] || project.category}
              </span>
              {#if project.featured && !activeCategory}
                <span class="px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium flex items-center gap-1 shadow-lg backdrop-blur-md">
                  <Sparkles size={12} />
                </span>
              {/if}
            </div>
            <!-- Image count -->
            {#if project.images?.length > 1}
              <div class="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
                <Eye size={10} /> {project.images.length}
              </div>
            {/if}
          </div>

          <!-- Content -->
          <div class="p-5 relative">
            <div class="flex items-center gap-2 mb-2">
              {#if project.date}
                <span class="text-[11px] text-gray-400 flex items-center gap-1"><Calendar size={10} />{new Date(project.date).toLocaleDateString('fr-FR', { year: 'numeric' })}</span>
              {/if}
            </div>
            <h3 class="font-bold text-[15px] leading-snug mb-1.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{project.title}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{project.description || 'Aucune description'}</p>
            {#if project.technologies}
              <div class="flex flex-wrap gap-1.5 mt-3">
                {#each project.technologies.split(',').slice(0, 3) as tech}
                  <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[11px] text-gray-600 dark:text-gray-400 font-medium border border-gray-200/50 dark:border-gray-700/50">{tech.trim()}</span>
                {/each}
                {#if project.technologies.split(',').length > 3}
                  <span class="text-[11px] text-gray-400">+{project.technologies.split(',').length - 3}</span>
                {/if}
              </div>
            {/if}
            <!-- Arrow indicator -->
            <div class="absolute bottom-5 right-5 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <ArrowRight size={12} class="text-gray-500" />
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
