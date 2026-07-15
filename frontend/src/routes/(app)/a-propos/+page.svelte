<script lang="ts">
  import { onMount } from 'svelte'
  import { getProfile, getExperiences, getEducation, getSkills, getLanguages, getHobbies, getSoftwareTools, getCertifications, getImageUrl, isConfigured } from '$lib/api/supabase'
  import { MapPin, Mail, Phone, Calendar, Download, Award, BookOpen, Cpu, Globe, Heart, Eye, Printer, Code, Zap, Wifi, Satellite, Network, GraduationCap, ShieldCheck } from 'lucide-svelte'

  let profile: any = null
  let experiences: any[] = []
  let education: any[] = []
  let skills: any[] = []
  let languages: any[] = []
  let hobbies: any[] = []
  let softwareTools: any[] = []
  let certifications: any[] = []
  let loading = true
  let showPreview = false
  let visible: Record<string, boolean> = {}

  onMount(async () => {
    if (!isConfigured) { loading = false; return }
    try {
      const [p, exp, edu, sk, lang, hob, soft, cert] = await Promise.all([
        getProfile().catch(() => null), getExperiences().catch(() => []),
        getEducation().catch(() => []), getSkills().catch(() => []),
        getLanguages().catch(() => []), getHobbies().catch(() => []),
        getSoftwareTools().catch(() => []),
        getCertifications()
      ])
      profile = p; experiences = exp; education = edu
      skills = sk; languages = lang; hobbies = hob; softwareTools = soft
      certifications = cert
    } catch (_) { /* offline */ }
    loading = false
  })

  $: p = profile || {
    first_name: 'Ouniboryabi', last_name: 'YAKOUN',
    title: 'Électrotechnicien',
    summary: "Passionné par les technologies électriques, les réseaux télécom et le développement web, je possède une expertise en installation et maintenance des systèmes électriques, configuration des infrastructures réseau et création d'applications web. Rigoureux et polyvalent, je mets mes compétences au service de solutions innovantes et performantes, tout en respectant les normes de sécurité et de qualité.",
    address: 'Tsévié, Togo', phone: '+22897533307',
    email: 'yakounouniboryabi@gmail.com', birth_date: '1999-05-04'
  }

  function formatDate(d: string) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
  }

  function observe(el: Element, name: string) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { visible = { ...visible, [name]: true }; observer.unobserve(el) } })
    }, { threshold: 0.2 })
    observer.observe(el)
  }

  const catIcons: Record<string, any> = { electricite: Zap, reseaux: Network, wifi: Wifi, paraboles: Satellite, 'dev-web': Code }

  async function generatePDF() {
    const el = document.getElementById('cv-content')
    if (!el) return
    const { default: html2canvas } = await import('html2canvas')
    const { default: jsPDF } = await import('jspdf')
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfW = pdf.internal.pageSize.getWidth()
    const pdfH = (canvas.height * pdfW) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH)
    pdf.save('CV-YAKOUN-Ouniboryabi.pdf')
  }

  function printCV() {
    const el = document.getElementById('cv-content')
    if (!el) return
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`<html><head><title>CV - ${p.first_name} ${p.last_name}</title>
      <style>
        body{margin:0;padding:15mm;font-family:Inter,sans-serif;color:#333;font-size:11pt;line-height:1.5}
        @media print{body{padding:10mm}@page{margin:10mm}}
        h2{font-size:14pt;border-bottom:2px solid #333;padding-bottom:3px;margin-top:15px}
        h3{font-size:12pt;margin:5px 0}
        .no-print{display:none!important}
        .cv-section{margin-bottom:12px}
        .print-grid{display:grid;grid-template-columns:1fr 2fr;gap:20px}
        .sidebar{background:#1a1a2e;color:#fff;padding:15px;border-radius:4px}
        .sidebar h3{font-size:10pt;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(255,255,255,.2);padding-bottom:4px;margin-top:10px}
        .sidebar p,.sidebar div{font-size:9pt;color:rgba(255,255,255,.85)}
        .main-content{padding:5px 0}
        .badge{display:inline-block;background:#f0f0f0;padding:2px 8px;border-radius:3px;font-size:9pt;margin:2px}
        .exp-item{border-left:2px solid #ddd;padding-left:10px;margin-bottom:10px}
        .resp-item{font-size:9.5pt;color:#555;margin:1px 0}
        ul{margin:2px 0;padding-left:16px}
        li{font-size:9.5pt;color:#555}
      </style></head><body>${el.innerHTML}</body></html>`)
    win.document.close()
    setTimeout(() => { win.print(); win.close() }, 500)
  }
</script>

<svelte:head><title>À propos — {p.first_name} {p.last_name}</title></svelte:head>

<section class="pt-24 pb-16 px-4">
  <div class="max-w-5xl mx-auto">

    <div class="text-center mb-12 animate-fadeIn">
      <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-primary-500/30">
        {p.first_name?.charAt(0)}{p.last_name?.charAt(0)}
      </div>
      <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient">{p.first_name} {p.last_name}</h1>
      <p class="text-xl text-gray-500 dark:text-gray-400 mb-6">{p.title}</p>
      <div class="flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        {#if p.email}<a href="mailto:{p.email}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:text-primary-600 transition-colors"><Mail size={14} /> {p.email}</a>{/if}
        {#if p.phone}<a href="tel:{p.phone}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:text-primary-600 transition-colors"><Phone size={14} /> {p.phone}</a>{/if}
        {#if p.address}<span class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800"><MapPin size={14} /> {p.address}</span>{/if}
      </div>
    </div>

    {#if p.summary}
      <div class="max-w-3xl mx-auto mb-16 animate-slideUp">
        <div class="relative p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 border border-primary-100 dark:border-primary-900/30">
          <div class="absolute -top-3 -left-3 w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic">{p.summary}</p>
        </div>
      </div>
    {/if}

    {#if loading}
      <div class="animate-pulse space-y-6">
        {#each [1,2,3] as i}<div key={i} class="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>{/each}
      </div>
    {:else}

      <!-- Skills -->
      <div class="mb-16" use:observe={'skills'}>
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30"><Award size={20} /></div>
          <h2 class="text-2xl font-bold">Compétences</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          {#each skills as s, i}
            <div class="group p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-500" style="transition-delay: {i * 50}ms; transform: translateY({visible['skills'] ? '0' : '20px'}); opacity: {visible['skills'] ? '1' : '0'};">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <svelte:component this={catIcons[s.category] || Code} size={16} class="text-primary-600" />
                  <span class="font-medium text-sm">{s.name}</span>
                </div>
                <span class="text-xs font-bold text-primary-600">{s.level}/5</span>
              </div>
              {#if s.description}<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{s.description}</p>{/if}
              <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-1000 ease-out" style="width: {visible['skills'] ? s.level * 20 : 0}%" />
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Software + Languages -->
      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <div use:observe={'software'}>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30"><Cpu size={20} /></div>
            <h2 class="text-xl font-bold">Logiciels & Langages</h2>
          </div>
          <div class="space-y-3">
            {#each softwareTools as sw, i}
              <div class="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all duration-500" style="transition-delay: {i * 80}ms; opacity: {visible['software'] ? '1' : '0'}; transform: translateX({visible['software'] ? '0' : '-20px'});">
                <div class="flex items-center justify-between mb-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 font-mono text-[10px]">{sw.category?.slice(0, 8)}</span>
                    <span class="text-sm font-medium">{sw.name}</span>
                  </div>
                  <span class="text-xs text-gray-400">{sw.level}/5</span>
                </div>
                <div class="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000" style="width: {visible['software'] ? sw.level * 20 : 0}%" />
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div use:observe={'languages'}>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30"><Globe size={20} /></div>
            <h2 class="text-xl font-bold">Langues</h2>
          </div>
          <div class="space-y-4">
            {#each languages as l, i}
              <div class="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all duration-500" style="transition-delay: {i * 100}ms; opacity: {visible['languages'] ? '1' : '0'};">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-semibold">{l.name}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">{['Débutant','Intermédiaire','Avancé','Courant','Natif'][l.level - 1]}</span>
                </div>
                <svg viewBox="0 0 100 6" class="w-full">
                  <rect x="0" y="0" width="100" height="6" rx="3" class="fill-gray-200 dark:fill-gray-700" />
                  <rect x="0" y="0" rx="3" class="fill-green-500 transition-all duration-1000" width={visible['languages'] ? l.level * 20 : 0} height="6" />
                </svg>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="mb-16" use:observe={'experience'}>
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <h2 class="text-2xl font-bold">Expériences</h2>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500" />
          {#each experiences as exp, i}
            <div class="relative pb-8 last:pb-0 transition-all duration-700" style="transition-delay: {i * 150}ms; opacity: {visible['experience'] ? '1' : '0'}; transform: translateX({visible['experience'] ? '0' : '-30px'});">
              <div class="absolute left-[-22px] top-1 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <div class="w-2 h-2 rounded-full bg-white" />
              </div>
              <div class="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <p class="text-xs text-gray-500 mb-1">{formatDate(exp.start_date)} — {exp.current ? 'Actuel' : formatDate(exp.end_date)}</p>
                <h3 class="font-bold text-lg">{exp.role}</h3>
                <p class="text-sm text-primary-600 font-medium mb-2">{exp.company}</p>
                {#if exp.description}<p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{exp.description}</p>{/if}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Education -->
      <div class="mb-16" use:observe={'education'}>
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30"><BookOpen size={20} /></div>
          <h2 class="text-2xl font-bold">Formations</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          {#each education as edu, i}
            <div class="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500" style="transition-delay: {i * 100}ms; opacity: {visible['education'] ? '1' : '0'}; transform: translateY({visible['education'] ? '0' : '20px'});">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0"><GraduationCap size={18} /></div>
                <div>
                  <h3 class="font-semibold">{edu.degree}</h3>
                  <p class="text-xs text-primary-600">{edu.institution}</p>
                </div>
              </div>
              <p class="text-xs text-gray-500 mb-2">{formatDate(edu.start_date)} — {formatDate(edu.end_date) || 'Présent'}</p>
              {#if edu.field}<p class="text-sm text-gray-500">{edu.field}</p>{/if}
            </div>
          {/each}
        </div>
      </div>

      <!-- Certifications -->
      {#if certifications.length > 0}
        <div class="mb-16" use:observe={'certifications'}>
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30"><ShieldCheck size={20} /></div>
            <h2 class="text-2xl font-bold">Certifications</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            {#each certifications as cert, i}
              <div class="group p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-500" style="transition-delay: {i * 100}ms; opacity: {visible['certifications'] ? '1' : '0'}; transform: translateY({visible['certifications'] ? '0' : '20px'});">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 shrink-0"><Award size={18} /></div>
                  <div>
                    <h3 class="font-semibold">{cert.title}</h3>
                    <p class="text-xs text-primary-600">{cert.organization}</p>
                    {#if cert.date}<p class="text-xs text-gray-400 mt-1">Obtenue en {cert.date}</p>{/if}
                    {#if cert.description}<p class="text-xs text-gray-500 mt-2">{cert.description}</p>{/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Hobbies -->
      {#if hobbies.length > 0}
        <div class="mb-16" use:observe={'hobbies'}>
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30"><Heart size={20} /></div>
            <h2 class="text-2xl font-bold">Centres d'intérêt</h2>
          </div>
          <div class="flex flex-wrap gap-3">
            {#each hobbies as h, i}
              <div class="group px-5 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style="transition-delay: {i * 80}ms; opacity: {visible['hobbies'] ? '1' : '0'};">
                <span class="text-sm font-medium group-hover:text-red-500 transition-colors">{h.name}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <div class="text-center">
        <button on:click={() => showPreview = true} class="btn-primary px-8 py-3 text-base gap-2 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow">
          <Eye size={18} /> Aperçu du CV
        </button>
      </div>

    {/if}
  </div>
</section>

<!-- Modal -->
{#if showPreview}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-noninteractive-element-interactions -->
  <div role="dialog" aria-modal="true" class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" on:click={() => showPreview = false} on:keydown={(e) => e.key === 'Escape' && (showPreview = false)}>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" on:click|stopPropagation>
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <h2 class="font-bold">Aperçu du CV</h2>
        <div class="flex items-center gap-2">
          <button on:click={printCV} class="btn-ghost border border-gray-300 text-sm"><Printer size={16} /> Imprimer</button>
          <button on:click={generatePDF} class="btn-primary text-sm"><Download size={16} /> Télécharger PDF</button>
          <button on:click={() => showPreview = false} class="btn-ghost text-sm">Fermer</button>
        </div>
      </div>
      <div class="p-6" id="cv-content">
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-[30%] bg-primary-700 text-white p-6">
            <div class="text-center mb-6">
              <div class="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-3">{p.first_name?.charAt(0)}{p.last_name?.charAt(0)}</div>
              <h2 class="font-bold text-lg">{p.first_name} {p.last_name}</h2>
              <p class="text-white/80 text-sm">{p.title}</p>
            </div>
            <div class="space-y-2 text-sm">
              {#if p.address}<p class="flex items-center gap-2 text-white/80"><MapPin size={14} /> {p.address}</p>{/if}
              {#if p.email}<p class="flex items-center gap-2 text-white/80"><Mail size={14} /> {p.email}</p>{/if}
              {#if p.phone}<p class="flex items-center gap-2 text-white/80"><Phone size={14} /> {p.phone}</p>{/if}
              {#if p.birth_date}<p class="flex items-center gap-2 text-white/80"><Calendar size={14} /> {formatDate(p.birth_date)}</p>{/if}
            </div>
            <hr class="border-white/20 my-4" />
            <h3 class="text-sm font-bold uppercase tracking-wider mb-3">Compétences</h3>
            <div class="space-y-2">{#each skills as s}<div><div class="flex justify-between text-xs mb-0.5"><span>{s.name}</span>{#if s.level}<span class="opacity-70">{s.level}/5</span>{/if}</div>{#if s.level}<div class="h-1.5 rounded-full bg-white/20"><div class="h-full rounded-full bg-white" style="width: {s.level * 20}%"></div></div>{/if}</div>{/each}</div>
            <hr class="border-white/20 my-4" />
            <h3 class="text-sm font-bold uppercase tracking-wider mb-3">Langues</h3>
            <div class="space-y-1">{#each languages as l}<div class="flex justify-between text-xs"><span>{l.name}</span>{#if l.level}<span class="opacity-70">{['Débutant','Intermédiaire','Avancé','Courant','Natif'][l.level - 1]}</span>{/if}</div>{/each}</div>
          </div>
          <div class="w-full md:w-[70%] p-6">
            {#if p.summary}<div class="mb-6"><h3 class="text-xs font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1 rounded mb-2 inline-block">Profil</h3><p class="text-sm text-gray-700 leading-relaxed">{p.summary}</p></div>{/if}
            <div class="mb-6">
              <h3 class="text-xs font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1 rounded mb-3 inline-block">Expériences</h3>
              <div class="space-y-3">{#each experiences as exp}<div class="border-l-2 border-gray-300 pl-3"><p class="text-xs text-gray-500">{formatDate(exp.start_date)} — {exp.current ? 'Actuel' : formatDate(exp.end_date)}</p><h4 class="font-semibold text-sm">{exp.role}</h4><p class="text-xs text-primary-600 font-medium">{exp.company}</p>{#if exp.description}<p class="text-xs text-gray-600 mt-1">{exp.description}</p>{/if}</div>{/each}</div>
            </div>
            <div>
              <h3 class="text-xs font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1 rounded mb-3 inline-block">Formations</h3>
              <div class="space-y-3">{#each education as edu}<div class="border-l-2 border-gray-300 pl-3"><p class="text-xs text-gray-500">{formatDate(edu.start_date)} — {formatDate(edu.end_date) || 'Présent'}</p><h4 class="font-semibold text-sm">{edu.degree}</h4><p class="text-xs text-primary-600 font-medium">{edu.institution}{#if edu.field} · {edu.field}{/if}</p></div>{/each}</div>
            </div>
            {#if certifications.length > 0}
              <div class="mt-4">
                <h3 class="text-xs font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-1 rounded mb-3 inline-block">Certifications</h3>
                <div class="space-y-2">{#each certifications as cert}<div class="border-l-2 border-gray-300 pl-3"><h4 class="font-semibold text-sm">{cert.title}</h4><p class="text-xs text-primary-600">{cert.organization}{#if cert.date} · {cert.date}{/if}</p>{#if cert.description}<p class="text-xs text-gray-600">{cert.description}</p>{/if}</div>{/each}</div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}