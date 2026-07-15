<script lang="ts">
  import { page } from '$app/stores'
  import { ArrowLeft, Home } from 'lucide-svelte'
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-8">
  <div class="text-center max-w-md">
    <div class="text-8xl font-black text-gray-200 dark:text-gray-800 mb-4">
      {$page.status}
    </div>
    <h1 class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
      {#if $page.status === 404}
        Page introuvable
      {:else}
        Erreur serveur
      {/if}
    </h1>
    <p class="text-gray-500 mb-8">
      {#if $page.status === 404}
        La page que vous cherchez n'existe pas ou a été déplacée.
      {:else}
        Une erreur inattendue s'est produite. Réessayez plus tard.
      {/if}
    </p>
    <div class="flex items-center justify-center gap-3">
      <button on:click={() => history.back()} class="btn-ghost border border-gray-300 dark:border-gray-600 gap-2">
        <ArrowLeft size={16} /> Retour
      </button>
      <a href="/" class="btn-primary gap-2">
        <Home size={16} /> Accueil
      </a>
    </div>
  </div>
</div>

<style>
  :global(body) { margin: 0; }
</style>
