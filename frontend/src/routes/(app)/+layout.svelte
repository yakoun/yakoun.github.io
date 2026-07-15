<script lang="ts">
  import { theme } from '$lib/stores/theme'
  import ThemeToggle from '$lib/components/ThemeToggle.svelte'
  import { Menu, X } from 'lucide-svelte'
  import { onMount } from 'svelte'
  import { supabase } from '$lib/api/supabase'

  let mobileOpen = false
  let scrolled = false
  let initials = 'ED'

  const links = [
    { href: '/', label: 'Accueil', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/a-propos', label: 'À propos', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { href: '/projets', label: 'Projets', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { href: '/galerie', label: 'Galerie', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21h15a1.5 1.5 0 001.5-1.5V15l-4.5-4.5L9 18l-3-3-3 3v3a1.5 1.5 0 001.5 1.5z' },
    { href: '/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
  ]

  function handleScroll() { scrolled = window.scrollY > 20 }
  if (typeof window !== 'undefined') window.addEventListener('scroll', handleScroll)

  onMount(async () => {
    try {
      const { data } = await supabase.from('profile_info').select('first_name,last_name').single()
      if (data) initials = (data.first_name?.charAt(0) || '') + (data.last_name?.charAt(0) || '')
    } catch (_) { /* offline */ }
  })
</script>

<div class="min-h-screen transition-colors duration-300" class:dark={$theme === 'dark'}>
  <!-- Animated background -->
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-3xl animate-pulse-slow" />
    <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl animate-pulse-slow" style="animation-delay: 2s" />
    <svg class="absolute top-1/4 left-1/4 w-8 h-8 text-primary-200/20 dark:text-primary-800/20 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    <svg class="absolute bottom-1/3 right-1/4 w-6 h-6 text-purple-200/20 dark:text-purple-800/20 animate-float" style="animation-delay: 1s; animation-duration: 6s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    <svg class="absolute top-1/3 right-1/3 w-5 h-5 text-amber-200/20 dark:text-amber-800/20 animate-float" style="animation-delay: 2s; animation-duration: 7s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  </div>

  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 {scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'}">
    <nav class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" class="text-lg font-bold tracking-tight group flex items-center gap-2">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300 group-hover:scale-105">{initials}</div>
      </a>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-1 shadow-sm border border-gray-200/50 dark:border-gray-800/50">
        {#each links as link}
          <a href={link.href} on:click={() => mobileOpen = false} class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 text-gray-600 dark:text-gray-400 active:scale-95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={link.icon} /></svg>
            {link.label}
          </a>
        {/each}
        <div class="ml-1"><ThemeToggle /></div>
      </div>

      <!-- Mobile -->
      <div class="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button on:click={() => mobileOpen = !mobileOpen} class="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {#if mobileOpen}<X size={20} />{:else}<Menu size={20} />{/if}
        </button>
      </div>
    </nav>

    {#if mobileOpen}
      <div class="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-4 py-3 space-y-1 shadow-lg animate-slideDown">
        {#each links as link}
          <a href={link.href} on:click={() => mobileOpen = false} class="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={link.icon} /></svg>
            {link.label}
          </a>
        {/each}
      </div>
    {/if}
  </header>

  <main>
    <slot />
  </main>

  <footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md py-10">
    <div class="max-w-5xl mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
            <span class="font-semibold text-sm">{initials.charAt(0) || 'E'}{initials.length > 1 ? initials.charAt(1).toLowerCase() : 'd'}.dev</span>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed">Portfolio professionnel - Électrotechnicien & Développeur</p>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Navigation</h4>
          <div class="space-y-2">
            {#each links as link}
              <a href={link.href} class="block text-xs text-gray-500 hover:text-primary-600 transition-colors">{link.label}</a>
            {/each}
          </div>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Contact</h4>
          <p class="text-xs text-gray-500">Email pro disponible sur la page contact</p>
        </div>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-800 pt-6 text-center">
        <p class="text-xs text-gray-400">&copy; 2024-2026 {initials.charAt(0) || 'P'}{initials.length > 1 ? initials.charAt(1).toLowerCase() : 'ortfolio'}. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  :global(.animate-slideDown) { animation: slideDown 0.2s ease-out; }
  :global(.animate-pulse-slow) { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
  :global(.animate-float) { animation: float 5s ease-in-out infinite; }
  @media print { header, footer { display: none !important; } }
</style>
