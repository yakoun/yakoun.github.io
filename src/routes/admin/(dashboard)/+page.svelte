<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { onDestroy } from 'svelte'
  import { FolderKanban, BarChart3, Briefcase, Mail, Image, User, GraduationCap, Languages, Heart, Cpu, TrendingUp, Award, Bell, X, Clock } from 'lucide-svelte'
  import RadarChart from '$lib/components/charts/RadarChart.svelte'
  import BarChart from '$lib/components/charts/BarChart.svelte'
  import TimelineChart from '$lib/components/charts/TimelineChart.svelte'

  let stats: Record<string, number> = {}
  let recentMessages: any[] = []
  let loading = true

  let skills: any[] = []
  let softwareTools: any[] = []
  let experiences: any[] = []
  let newMessage: any = null
  let notification: any = null
  let notificationTimeout: any = null
  let unreadCount = 0
  let channel: any = null

  function showNotif(msg: any) {
    if (notificationTimeout) clearTimeout(notificationTimeout)
    notification = { name: msg.name, email: msg.email, message: msg.message, time: new Date().toLocaleTimeString('fr-FR') }
    notificationTimeout = setTimeout(() => { notification = null }, 6000)
    unreadCount++
    newMessage = msg
    setTimeout(() => newMessage = null, 300)
  }

  async function loadDashboard() {
    const tables = ['projects', 'skills', 'services', 'messages', 'gallery', 'profile_info', 'experience', 'education', 'languages', 'hobbies', 'software_tools', 'certifications']
    const results = await Promise.all(
      tables.map(t => supabase.from(t as any).select('*', { count: 'exact', head: true }))
    )
    tables.forEach((t, i) => stats[t] = results[i].count || 0)
    const { data: msgs } = await supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(5)
    recentMessages = msgs || []
    unreadCount = stats.messages || 0

    const [sk, sw, ex] = await Promise.all([
      supabase.from('skills').select('*').order('level', { ascending: false }).limit(10),
      supabase.from('software_tools').select('*').order('level', { ascending: false }).limit(10),
      supabase.from('experience').select('*').order('order'),
    ])
    skills = sk.data || []
    softwareTools = sw.data || []
    experiences = ex.data || []

    loading = false

    channel = supabase
      .channel('messages-realtime')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload: any) => {
          const msg = payload.new
          stats.messages = (stats.messages || 0) + 1
          recentMessages = [msg, ...recentMessages].slice(0, 5)
          showNotif(msg)
        }
      )
      .subscribe()
  }

  loadDashboard()
  onDestroy(() => { channel?.unsubscribe() })

  const catLabels: Record<string, string> = {
    electricite: 'Électricité', reseaux: 'Réseaux', wifi: 'WiFi',
    paraboles: 'Paraboles', programmation: 'Programmation',
    'dev-web': 'Développement Web', 'dev-apps': 'Apps Desktop',
    automatisation: 'Automatisation'
  }

  $: categories = Object.entries(
    skills.reduce((acc: Record<string, number[]>, s: any) => {
      if (!acc[s.category]) acc[s.category] = []
      acc[s.category].push(s.level || 0)
      return acc
    }, {})
  ).map(([key, vals]: [string, any]) => ({
    label: catLabels[key] || key,
    value: Math.round((vals.reduce((a: number, b: number) => a + b, 0) / vals.length) * 10) / 10
  }))

  $: topSkillsData = skills.map(s => ({ label: s.name, value: s.level || 0 }))
  $: topSoftwareData = softwareTools.map(s => ({ label: s.name, value: s.level || 0 }))
</script>

<svelte:head><title>Dashboard — Admin</title></svelte:head>

<!-- Notification toast -->
{#if notification}
  <div class="fixed top-4 right-4 z-50 max-w-sm animate-slideDown" style="animation: slideDown 0.3s ease-out">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-primary-200 dark:border-primary-800 p-4 flex items-start gap-3">
      <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
        <Bell size={16} />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-2">
          <p class="text-sm font-semibold">{notification.name}</p>
          <button on:click={() => { notification = null; if (notificationTimeout) clearTimeout(notificationTimeout) }} class="text-gray-400 hover:text-gray-600 shrink-0"><X size={14} /></button>
        </div>
        <p class="text-xs text-gray-500">{notification.email}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">{notification.message}</p>
        <p class="text-[10px] text-gray-400 mt-1">{notification.time}</p>
      </div>
    </div>
  </div>
{/if}

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Dashboard</h1>
  {#if unreadCount > 0}
    <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-xs font-medium">
      <Bell size={14} />
      {stats.messages} message{stats.messages > 1 ? 's' : ''}
    </div>
  {/if}
</div>

{#if loading}
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-8">
    {#each [1,2,3,4,5,6,7,8,9,10,11,12] as i}
      <div key={i} class="card p-4 animate-pulse h-20" />
    {/each}
  </div>
  <div class="grid lg:grid-cols-2 gap-6">
    {#each [1,2,3] as i}
      <div key={i} class="card animate-pulse h-64" />
    {/each}
  </div>
{:else}
  <!-- Stat cards -->
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-8">
    <a href="/admin/profil" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0"><User size={18} /></div>
      <div><p class="text-lg font-bold">{stats.profile_info || 0}</p><p class="text-xs text-gray-500">Profil</p></div>
    </a>
    <a href="/admin/experiences" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center text-white shrink-0"><Briefcase size={18} /></div>
      <div><p class="text-lg font-bold">{stats.experience || 0}</p><p class="text-xs text-gray-500">Expériences</p></div>
    </a>
    <a href="/admin/education" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center text-white shrink-0"><GraduationCap size={18} /></div>
      <div><p class="text-lg font-bold">{stats.education || 0}</p><p class="text-xs text-gray-500">Formations</p></div>
    </a>
    <a href="/admin/skills" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center text-white shrink-0"><BarChart3 size={18} /></div>
      <div><p class="text-lg font-bold">{stats.skills || 0}</p><p class="text-xs text-gray-500">Compétences</p></div>
    </a>
    <a href="/admin/certifications" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0"><Award size={18} /></div>
      <div><p class="text-lg font-bold">{stats.certifications || 0}</p><p class="text-xs text-gray-500">Certifications</p></div>
    </a>
    <a href="/admin/languages" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-purple-500 flex items-center justify-center text-white shrink-0"><Languages size={18} /></div>
      <div><p class="text-lg font-bold">{stats.languages || 0}</p><p class="text-xs text-gray-500">Langues</p></div>
    </a>
    <a href="/admin/hobbies" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center text-white shrink-0"><Heart size={18} /></div>
      <div><p class="text-lg font-bold">{stats.hobbies || 0}</p><p class="text-xs text-gray-500">Loisirs</p></div>
    </a>
    <a href="/admin/software" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center text-white shrink-0"><Cpu size={18} /></div>
      <div><p class="text-lg font-bold">{stats.software_tools || 0}</p><p class="text-xs text-gray-500">Logiciels</p></div>
    </a>
    <a href="/admin/projects" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0"><FolderKanban size={18} /></div>
      <div><p class="text-lg font-bold">{stats.projects || 0}</p><p class="text-xs text-gray-500">Projets</p></div>
    </a>
    <a href="/admin/services" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0"><Briefcase size={18} /></div>
      <div><p class="text-lg font-bold">{stats.services || 0}</p><p class="text-xs text-gray-500">Services</p></div>
    </a>
    <a href="/admin/gallery" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center text-white shrink-0"><Image size={18} /></div>
      <div><p class="text-lg font-bold">{stats.gallery || 0}</p><p class="text-xs text-gray-500">Galerie</p></div>
    </a>
    <a href="/admin/messages" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div class="w-9 h-9 rounded-lg bg-rose-500 flex items-center justify-center text-white shrink-0"><Mail size={18} /></div>
      <div><p class="text-lg font-bold">{stats.messages || 0}</p><p class="text-xs text-gray-500">Messages</p></div>
    </a>
  </div>

  <!-- Charts row 1 -->
  <div class="grid lg:grid-cols-2 gap-6 mb-6">
    <div class="card p-5">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600"><BarChart3 size={16} /></div>
        <h2 class="font-semibold text-sm">Compétences par catégorie</h2>
      </div>
      {#if categories.length > 0}
        <div class="max-w-sm mx-auto">
          <RadarChart data={categories} title="" />
        </div>
      {:else}
        <p class="text-sm text-gray-400 text-center py-8">Aucune compétence</p>
      {/if}
    </div>

    <div class="card p-5">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600"><TrendingUp size={16} /></div>
        <h2 class="font-semibold text-sm">Top compétences</h2>
      </div>
      {#if topSkillsData.length > 0}
        <BarChart data={topSkillsData} title="" horizontal={true} color="rgba(99, 102, 241, 0.8)" />
      {:else}
        <p class="text-sm text-gray-400 text-center py-8">Aucune compétence</p>
      {/if}
    </div>
  </div>

  <!-- Charts row 2 -->
  <div class="grid lg:grid-cols-2 gap-6 mb-6">
    <div class="card p-5">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600"><Cpu size={16} /></div>
        <h2 class="font-semibold text-sm">Top logiciels</h2>
      </div>
      {#if topSoftwareData.length > 0}
        <BarChart data={topSoftwareData} title="" horizontal={true} color="rgba(6, 182, 212, 0.8)" />
      {:else}
        <p class="text-sm text-gray-400 text-center py-8">Aucun logiciel</p>
      {/if}
    </div>

    <div class="card p-5">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600"><Clock size={16} /></div>
        <h2 class="font-semibold text-sm">Timeline expériences</h2>
      </div>
      {#if experiences.length > 0}
        <TimelineChart {experiences} title="" />
      {:else}
        <p class="text-sm text-gray-400 text-center py-8">Aucune expérience</p>
      {/if}
    </div>
  </div>

  <!-- Messages -->
  <div class="card p-5">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600"><Mail size={16} /></div>
        <h2 class="font-semibold text-sm">Derniers messages</h2>
      </div>
      <a href="/admin/messages" class="text-sm text-primary-600 hover:underline">Voir tout</a>
    </div>
    {#if recentMessages.length === 0}
      <p class="text-sm text-gray-400 py-8 text-center">Aucun message</p>
    {:else}
      <div class="space-y-2">
        {#each recentMessages as msg, i}
          <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors {i === 0 && newMessage ? 'ring-2 ring-green-400 dark:ring-green-600' : ''}">
            <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 text-sm font-medium shrink-0">
              {msg.name?.charAt(0).toUpperCase()}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-medium text-sm">{msg.name}</span>
                <span class="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString('fr-FR')}</span>
                {#if i === 0 && newMessage}<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 font-medium">Nouveau</span>{/if}
              </div>
              <p class="text-sm text-gray-500 truncate">{msg.message}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}
