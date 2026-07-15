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
  let mobileNavOpen = false

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

  const quickItems = navItems.slice(0, 5)
</script>

{#if loading}
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div class="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" />
  </div>
{:else if session}
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex pb-16 lg:pb-0">
    {#if sidebarOpen}
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <div role="presentation" class="fixed inset-0 z-30 bg-black/50 lg:hidden" on:click={() => sidebarOpen = false} />
    {/if}

    <!-- Desktop sidebar -->
    <aside class="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform hidden lg:block">
      <div class="h-16 flex items-center gap-3 px-6 border-b border-gray-200 dark:border-gray-800">
        <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white text-sm font-bold">ED</div>
        <span class="font-semibold text-sm">ElectroDev Admin</span>
      </div>

      <nav class="p-4 space-y-1 overflow-y-auto" style="max-height: calc(100vh - 8rem);">
        {#each navItems as item}
          <a
            href={item.href}
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

    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    {#if mobileNavOpen}
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
      <div role="presentation" class="fixed inset-0 z-40 lg:hidden" on:click={() => mobileNavOpen = false}>
        <div class="absolute inset-0 bg-black/50" />
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
        <div role="dialog" aria-modal="true" class="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl max-h-[70vh] overflow-y-auto p-4 shadow-xl" on:click|stopPropagation>
          <div class="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4" />
          <div class="space-y-1">
            {#each navItems as item}
              <a
                href={item.href}
                on:click={() => mobileNavOpen = false}
                class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors {$page.url.pathname === item.href ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}"
              >
                <svelte:component this={item.icon} size={18} />
                {item.label}
              </a>
            {/each}
            <hr class="my-2 border-gray-200 dark:border-gray-700" />
            <button on:click={handleLogout} class="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors">
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </div>
      </div>
    {/if}

    <div class="lg:pl-64 flex-1 min-w-0">
      <header class="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
        <button on:click={() => sidebarOpen = !sidebarOpen} class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu size={20} />
        </button>
        <div class="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 font-medium text-xs">
            {session.user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>
      </header>

      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>

    <!-- Mobile bottom tab bar -->
    <nav class="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-around px-1 safe-area-bottom">
      {#each quickItems as item}
        <a
          href={item.href}
          class="flex flex-col items-center gap-0.5 py-2 px-2 text-[10px] font-medium {$page.url.pathname === item.href ? 'text-primary-600' : 'text-gray-400'} transition-colors"
        >
          <svelte:component this={item.icon} size={18} />
          <span class="truncate max-w-12 text-center leading-tight">{item.label}</span>
        </a>
      {/each}
      <button
        on:click={() => mobileNavOpen = !mobileNavOpen}
        class="flex flex-col items-center gap-0.5 py-2 px-2 text-[10px] font-medium text-gray-400 transition-colors"
      >
        <Menu size={18} />
        <span>Plus</span>
      </button>
    </nav>
  </div>
{/if}
