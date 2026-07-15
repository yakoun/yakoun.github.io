<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { goto } from '$app/navigation'
  import { AlertCircle, LogIn, Eye, EyeOff, Zap } from 'lucide-svelte'

  let email = ''
  let password = ''
  let error = ''
  let loading = false
  let showPassword = false

  async function handleSubmit() {
    loading = true; error = ''
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur de connexion')
      await supabase.auth.setSession(data.session)
      goto('/admin')
    } catch (err: any) {
      error = err?.message || 'Email ou mot de passe incorrect'
    } finally { loading = false }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-gray-950 to-purple-900 p-4">
  <div class="w-full max-w-sm animate-scale-in">
    <div class="text-center mb-8">
      <div class="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
        <Zap size={32} class="text-white" />
      </div>
      <h1 class="text-2xl font-bold text-white mb-2">Espace Administrateur</h1>
      <p class="text-sm text-gray-400">Connectez-vous pour gérer votre portfolio</p>
    </div>

    <div class="card">
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <label class="label" for="email">Email</label>
          <input id="email" type="email" bind:value={email} required class="input" autocomplete="email" placeholder="admin@electrodev.fr" />
        </div>
        <div>
          <label class="label" for="password">Mot de passe</label>
          <div class="relative">
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} on:input={(e) => password = e.target.value} required class="input pr-10" autocomplete="current-password" />
            <button type="button" on:click={() => showPassword = !showPassword} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {#if showPassword}<EyeOff size={18} />{:else}<Eye size={18} />{/if}
            </button>
          </div>
        </div>

        {#if error}
          <div class="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:text-red-400 p-3 rounded-lg">
            <AlertCircle size={16} /> {error}
          </div>
        {/if}

        <button type="submit" disabled={loading} class="btn-primary w-full justify-center">
          {#if loading}<div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />{/if}
          <LogIn size={18} /> Se connecter
        </button>
      </form>

      <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <a href="/" class="text-sm text-primary-600 hover:underline">← Retour au site</a>
      </div>
    </div>
  </div>
</div>
