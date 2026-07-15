<script lang="ts">
  import { onMount } from 'svelte'
  import { sendMessage, getProfile, getSettings, isConfigured } from '$lib/api/supabase'
  import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-svelte'

  let profile: any = null

  let name = ''
  let email = ''
  let phone = ''
  let message = ''
  let sent = false
  let sending = false
  let error = ''

  onMount(async () => {
    if (!isConfigured) return
    try { profile = await getProfile() } catch (_) { /* offline */ }
  })

  $: p = profile || {
    first_name: 'Thomas', last_name: 'Dubois',
    phone: '+33 6 00 00 00 00', email: 'contact@electrodev.fr',
    address: 'Région Parisienne',
  }

  async function handleSubmit() {
    if (!name || !email || !message) return
    sending = true; error = ''
    const err = await sendMessage(name, email, message)
    if (err) {
      error = "Erreur lors de l'envoi. Réessayez plus tard."
    } else {
      sent = true
    }
    sending = false
  }
</script>

<svelte:head><title>Contact — Portfolio</title></svelte:head>

<section class="pt-24 pb-16 px-4">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">Contact</h1>
      <p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Vous avez un projet ? Discutons-en autour d'un café</p>
    </div>

    <div class="grid lg:grid-cols-5 gap-8">
      <!-- Contact Info -->
      <div class="lg:col-span-2 space-y-4">
        <div class="card">
          <h2 class="font-semibold mb-4">Mes coordonnées</h2>
          <div class="space-y-4">
            <a href="tel:{p.phone}" class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
              <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 shrink-0"><Phone size={18} /></div>
              <div><div class="font-medium text-gray-900 dark:text-gray-100">Téléphone</div>{p.phone}</div>
            </a>
            <a href="mailto:{p.email}" class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
              <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 shrink-0"><Mail size={18} /></div>
              <div><div class="font-medium text-gray-900 dark:text-gray-100">Email</div>{p.email}</div>
            </a>
            <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 shrink-0"><MapPin size={18} /></div>
              <div><div class="font-medium text-gray-900 dark:text-gray-100">Localisation</div>{p.address}</div>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="font-semibold mb-3">WhatsApp</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Réponse rapide sous 24h</p>
          <a href="https://wa.me/{p.phone?.replace(/\s+/g, '')}" target="_blank" rel="noopener" class="btn-whatsapp w-full justify-center">
            <MessageCircle size={16} /> Écrire sur WhatsApp
          </a>
        </div>

        <div class="card">
          <h2 class="font-semibold mb-3">Disponibilité</h2>
          <div class="flex items-center gap-2 text-sm text-green-600">
            <Clock size={14} /> Réponse sous 24h
          </div>
          <p class="text-xs text-gray-400 mt-2">Devis gratuit et sans engagement</p>
        </div>
      </div>

      <!-- Form -->
      <div class="lg:col-span-3">
        {#if sent}
          <div class="card text-center py-12">
            <div class="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 class="text-xl font-bold mb-2">Message envoyé !</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Je vous répondrai dans les plus brefs délais.</p>
            <button on:click={() => { sent = false; name = ''; email = ''; phone = ''; message = '' }} class="btn-secondary mt-6 text-sm">
              Envoyer un autre message
            </button>
          </div>
        {:else}
          <div class="card">
            <h2 class="font-semibold mb-6">Envoyez-moi un message</h2>
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="label">Nom complet *</label>
                  <input id="name" type="text" bind:value={name} required class="input" placeholder="Votre nom" />
                </div>
                <div>
                  <label for="email" class="label">Email *</label>
                  <input id="email" type="email" bind:value={email} required class="input" placeholder="votre@email.com" />
                </div>
              </div>
              <div>
                <label for="phone" class="label">Téléphone</label>
                <input id="phone" type="tel" bind:value={phone} class="input" placeholder="+33 6 00 00 00 00" />
              </div>
              <div>
                <label for="message" class="label">Message *</label>
                <textarea id="message" rows={6} bind:value={message} required class="input resize-none" placeholder="Décrivez votre projet..."></textarea>
              </div>
              {#if error}
                <p class="text-sm text-red-500 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> {error}
                </p>
              {/if}
              <button type="submit" disabled={sending} class="btn-primary w-full justify-center">
                {sending ? 'Envoi en cours...' : 'Envoyer le message'} <Send size={16} />
              </button>
            </form>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
