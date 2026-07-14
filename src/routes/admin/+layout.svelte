<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { theme } from '$lib/stores/theme'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import {
    LayoutDashboard, FolderKanban, BarChart3, Briefcase, Mail, Settings,
    LogOut, Menu, X, Image, User, GraduationCap, BriefcaseBusiness,
    Languages, Heart, Cpu, BookOpen, Award
  } from 'lucide-svelte'
  import ThemeToggle from '$lib/components/ThemeToggle.svelte'

  let sidebarOpen = false
  let session: any = null
  let loading = true

  onMount(async () => {
    const { data: { session: s } } = await supabase.auth.getSession()
    session = s
    loading = false
    if (!s) goto('/login')
  })

  async function handleLogout() {
    await supabase.auth.signOut()
    goto('/login')
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/profil', label: 'Profil', icon: User },
    { href: '/admin/experiences', label: 'Expériences', icon: BriefcaseBusiness },
    { href: '/admin/education', label: 'Formations', icon: GraduationCap },
    { href: '/admin/skills', label: 'Compétences', icon: BarChart3 },
    { href: '/admin/languages', label: 'Langues', icon: Languages },
    { href: '/admin/hobbies', label: 'Loisirs', icon: Heart },
    { href: '/admin/software', label: 'Logiciels', icon: Cpu },
    { href: '/admin/certifications', label: 'Certifications', icon: Award },
    { href: '/admin/projects', label: 'Projets', icon: FolderKanban },
    { href: '/admin/services', label: 'Services', icon: Briefcase },
    { href: '/admin/gallery', label: 'Galerie', icon: Image },
    { href: '/admin/messages', label: 'Messages', icon: Mail },
    { href: '/admin/settings', label: 'Paramètres', icon: Settings },
  ]
</script>

{#if loading}
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div class="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" />
  </div>
{:else if session}
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
    {#if sidebarOpen}
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <div role="presentation" class="fixed inset-0 z-30 bg-black/50 lg:hidden" on:click={() => sidebarOpen = false} />
    {/if}
    <aside class="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0">
      <div class="h-16 flex items-center gap-3 px-6 border-b border-gray-200 dark:border-gray-800">
        <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white text-sm font-bold">ED</div>
        <span class="font-semibold text-sm">ElectroDev Admin</span>
      </div>

      <nav class="p-4 space-y-1 overflow-y-auto" style="max-height: calc(100vh - 8rem);">
        {#each navItems as item}
          <a
            href={item.href}
            on:click={() => sidebarOpen = false}
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors {$page.url.pathname === item.href ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}"
          >
            <svelte:component this={item.icon} size={18} />
            {item.label}
          </a>
        {/each}
      </nav>

      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <button on:click={handleLogout} class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 w-full transition-colors">
          <LogOut size={18} /> Déconnexion
        </button>
      </div>
    </aside>

    <div class="lg:pl-64 flex-1">
      <header class="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-8">
        <button on:click={() => sidebarOpen = !sidebarOpen} class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          {#if sidebarOpen}<X size={20} />{:else}<Menu size={20} />{/if}
        </button>
        <div class="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 font-medium text-xs">
            {session.user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>
      </header>

      <main class="p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
{/if}
