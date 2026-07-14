<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { Zap } from 'lucide-svelte'

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      goto('/admin')
    } else {
      // écouter le hash fragment
      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        if (session) goto('/admin')
      })
      // timeout sécurité
      setTimeout(() => goto('/login'), 10000)
    }
  })
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-gray-950 to-purple-900">
  <div class="text-center animate-pulse-glow">
    <div class="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
      <Zap size={32} class="text-white animate-pulse" />
    </div>
    <p class="text-gray-400">Connexion en cours...</p>
  </div>
</div>
