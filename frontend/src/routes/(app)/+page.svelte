<script lang="ts">
  import { onMount } from 'svelte'
  import { getProfile, getServices, getProjects, isConfigured } from '$lib/api/supabase'
  import { ArrowRight, Mail, Phone, MapPin, Zap, Wifi, Code, Sparkles } from 'lucide-svelte'

  const iconMap: Record<string, any> = { Zap, Wifi, Code, Sparkles, ArrowRight }

  let profile: any = null
  let projects: any[] = []
  let services: any[] = []
  let loading = true

  onMount(async () => {
    if (!isConfigured) { loading = false; return }
    try {
      const [p, s, pr] = await Promise.all([
        getProfile().catch(() => null), getServices().catch(() => []), getProjects().catch(() => [])
      ])
      profile = p; services = s; projects = pr.slice(0, 6)
    } catch (_) { /* offline */ }
    loading = false
  })

  const defaultProfile = {
    first_name: 'Ouniboryabi', last_name: 'YAKOUN',
    title: 'Électrotechnicien & Développeur',
    summary: 'Expert en installation électrique, réseaux et développement web.',
    phone: '+228 97 53 33 07', email: 'sylvanoyakoun@gmail.com',
    address: 'Tsevie, Togo',
  }

  $: p = profile || defaultProfile

  const defaultServices = [
    { title: 'Installation Électrique', description: 'Tableaux, câblage, mise aux normes, dépannage.', icon: Zap },
    { title: 'Réseaux & WiFi', description: 'Installation WiFi mesh, fibre optique, câblage RJ45.', icon: Wifi },
    { title: 'Développement Web', description: 'Sites vitrine, applications, automatisaton.', icon: Code },
  ]
  $: svc = services.length > 0 ? services : defaultServices
</script>

<svelte:head><title>{p.first_name} {p.last_name} — Portfolio</title></svelte:head>

<!-- Hero -->
<section class="relative min-h-[90vh] flex items-center px-4 pt-24 md:pt-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950"></div>
  <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"></div>

  <!-- Floating shapes -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <div class="absolute top-1/4 left-[5%] w-4 h-4 rounded-full bg-primary-400/20 animate-float-slow" />
    <div class="absolute top-1/3 right-[10%] w-6 h-6 rounded-lg rotate-45 bg-purple-400/20 animate-float-slower" />
    <div class="absolute bottom-1/4 left-[15%] w-3 h-3 rounded-full bg-amber-400/20 animate-float-fast" />
  </div>

  <div class="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
    <!-- Text Column -->
    <div class="flex-1 text-center md:text-left">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium mb-6 border border-primary-200 dark:border-primary-800">
        <Sparkles size={12} /> Électrotechnicien & Développeur
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
        {p.first_name} <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-500">{p.last_name}</span>
      </h1>
      <p class="text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium mb-3">{p.title}</p>
      <p class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">{p.summary}</p>
      <div class="flex flex-wrap justify-center md:justify-start gap-3">
        <a href="/a-propos" class="btn-primary">En savoir plus <ArrowRight size={16} /></a>
        <a href="/contact" class="btn-secondary">Me contacter</a>
      </div>
      <div class="flex flex-wrap justify-center md:justify-start gap-6 mt-8 text-sm text-gray-400">
        <span class="flex items-center gap-1.5"><MapPin size={14} /> {p.address}</span>
        <a href="mailto:{p.email}" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors"><Mail size={14} /> {p.email}</a>
        <a href="tel:{p.phone}" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors"><Phone size={14} /> {p.phone}</a>
      </div>
    </div>

    <!-- Image Column -->
    <div class="flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 relative">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div class="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/20 border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 animate-float">
        <img
          src="/images/hero.webp"
          alt="Outils de test électrique"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>
      <!-- Decorative dots -->
      <div class="absolute -bottom-4 -right-4 w-24 h-24 opacity-20 dark:opacity-10" style="background-image: radial-gradient(circle, #2563eb 1.5px, transparent 1.5px); background-size: 8px 8px;" />
      <div class="absolute -top-4 -left-4 w-16 h-16 opacity-20 dark:opacity-10" style="background-image: radial-gradient(circle, #7c3aed 1.5px, transparent 1.5px); background-size: 8px 8px;" />
    </div>
  </div>
</section>

<div class="max-w-5xl mx-auto px-4 pb-20 space-y-24">

  <!-- Services -->
  <section>
    <div class="text-center mb-12">
      <h2 class="section-title">Mes Services</h2>
      <p class="section-subtitle">Des solutions complètes pour vos projets électriques et numériques</p>
    </div>
    <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      <!-- Image panel -->
      <div class="w-full lg:w-96 xl:w-[420px] flex-shrink-0">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-amber-500/20 rounded-3xl blur-2xl animate-pulse-slow" />
          <div class="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/15 border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900">
            <img
              src="/images/electrical-set.jpg"
              alt="Éléments électriques"
              class="w-full h-64 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div class="absolute -bottom-3 -right-3 w-20 h-20 opacity-15 dark:opacity-10" style="background-image: radial-gradient(circle, #2563eb 1.5px, transparent 1.5px); background-size: 8px 8px;" />
        </div>
      </div>
      <!-- Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 flex-1 w-full">
        {#each svc as s, i}
          <div class="card-hover text-center {i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}" style="animation-delay: {i * 100}ms">
            <div class="w-12 h-12 mx-auto rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 mb-4">
              <svelte:component this={iconMap[s.icon] || Zap} size={24} />
            </div>
            <h3 class="text-lg font-semibold mb-2">{s.title}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{s.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Expertise Banner -->
  <section class="relative rounded-2xl lg:rounded-3xl overflow-hidden min-h-[300px] lg:min-h-[350px] flex items-center">
    <img
      src="/images/pylon.jpg"
      alt="Pylône haute tension"
      class="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/70 to-gray-950/40 dark:from-gray-950/90 dark:via-gray-950/70 dark:to-gray-950/30" />
    <div class="relative w-full px-8 md:px-12 py-10 md:py-14">
      <div class="max-w-2xl">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-medium mb-4 border border-primary-500/20">
          <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-ping" /> Expert en électricité
        </span>
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">Électricité, Réseaux & Digital</h2>
        <p class="text-gray-300 leading-relaxed max-w-lg mb-6">
          De l'installation électrique aux solutions digitales, je maîtrise toute la chaîne technique pour vos projets.
        </p>
        <div class="grid grid-cols-3 gap-6 md:gap-10">
          <div>
            <p class="text-2xl md:text-3xl font-bold text-white">5+</p>
            <p class="text-xs md:text-sm text-gray-400">Années d'expérience</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-bold text-white">30+</p>
            <p class="text-xs md:text-sm text-gray-400">Projets réalisés</p>
          </div>
          <div>
            <p class="text-2xl md:text-3xl font-bold text-white">100%</p>
            <p class="text-xs md:text-sm text-gray-400">Clients satisfaits</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Projets récents -->
  <section>
    <div class="flex items-end justify-between mb-8">
      <div>
        <h2 class="section-title">Projets Récents</h2>
        <p class="section-subtitle text-left mx-0">Quelques réalisations récentes</p>
      </div>
      <a href="/projets" class="btn-secondary text-sm hidden sm:inline-flex">Voir tout <ArrowRight size={14} /></a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each projects as project}
        <a href="/projets/{project.slug}" class="group card-hover p-0 overflow-hidden">
          {#if project.images?.length}
            <div class="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img src={project.images[0]} alt={project.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          {:else}
            <div class="aspect-video bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <span class="text-2xl font-bold text-primary-300 dark:text-primary-700">{project.title?.charAt(0) || 'P'}</span>
            </div>
          {/if}
          <div class="p-4">
            <h3 class="font-semibold text-sm group-hover:text-primary-600 transition-colors">{project.title}</h3>
            <p class="text-xs text-gray-400 mt-1 capitalize">{project.category?.replace('-', ' ')}</p>
          </div>
        </a>
      {/each}
    </div>
    <div class="text-center mt-6 sm:hidden">
      <a href="/projets" class="btn-secondary text-sm">Voir tout <ArrowRight size={14} /></a>
    </div>
  </section>

  <!-- CTA Contact -->
  <section class="rounded-2xl bg-gradient-to-br from-primary-600 to-purple-600 p-8 md:p-12 text-center text-white">
    <h2 class="text-2xl md:text-3xl font-bold mb-4">Prêt à concrétiser votre projet ?</h2>
    <p class="text-white/80 mb-6 max-w-lg mx-auto">Discutons de vos besoins. Devis gratuit et sans engagement.</p>
    <div class="flex flex-wrap justify-center gap-3">
      <a href="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-gray-100 transition-colors">Me contacter</a>
      <a href="tel:{p.phone}" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 rounded-xl font-medium hover:bg-white/10 transition-colors"><Phone size={16} /> {p.phone}</a>
    </div>
  </section>
</div>
