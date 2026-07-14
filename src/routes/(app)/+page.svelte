<script lang="ts">
  import { onMount } from 'svelte'
  import { getProfile, getServices, getProjects, isConfigured } from '$lib/api/supabase'
  import { ArrowRight, Mail, Phone, MapPin, Zap, Wifi, Code } from 'lucide-svelte'

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
    first_name: 'Thomas', last_name: 'Dubois',
    title: 'Électrotechnicien & Développeur',
    summary: 'Expert en installation électrique, réseaux et développement web.',
    phone: '+33 6 00 00 00 00', email: 'contact@electrodev.fr',
    address: 'Région Parisienne',
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
<section class="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950"></div>
  <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"></div>
  <div class="relative text-center max-w-3xl mx-auto">
    <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6">
      {p.first_name?.charAt(0)}{p.last_name?.charAt(0)}
    </div>
    <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-4">
      {p.first_name} <span class="gradient-text">{p.last_name}</span>
    </h1>
    <p class="text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium mb-4">{p.title}</p>
    <p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8">{p.summary}</p>
    <div class="flex flex-wrap justify-center gap-3">
      <a href="/a-propos" class="btn-primary">En savoir plus <ArrowRight size={16} /></a>
      <a href="/contact" class="btn-secondary">Me contacter</a>
    </div>
    <div class="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
      <span class="flex items-center gap-1.5"><MapPin size={14} /> {p.address}</span>
      <a href="mailto:{p.email}" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors"><Mail size={14} /> {p.email}</a>
      <a href="tel:{p.phone}" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors"><Phone size={14} /> {p.phone}</a>
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
    <div class="grid md:grid-cols-3 gap-6">
      {#each svc as s}
        <div class="card-hover text-center">
          <div class="w-12 h-12 mx-auto rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 mb-4">
            <svelte:component this={s.icon || Zap} size={24} />
          </div>
          <h3 class="text-lg font-semibold mb-2">{s.title}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{s.description}</p>
        </div>
      {/each}
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
