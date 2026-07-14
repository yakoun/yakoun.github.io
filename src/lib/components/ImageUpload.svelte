<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { X, Upload } from 'lucide-svelte'

  export let images: string[] = []
  export let projectId = ''

  let uploading = false
  let uploadError = ''

  async function upload(e: Event) {
    const input = e.target as HTMLInputElement
    if (!input.files?.length) return
    uploading = true; uploadError = ''
    const files = Array.from(input.files)
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const path = `${projectId || 'new'}/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('folio').upload(path, file)
      if (error) {
        uploadError = error.message === 'The resource was not found'
          ? 'Bucket "folio" introuvable. Crée-le dans Supabase Dashboard > Storage.'
          : error.message
        console.error(error); continue
      }
      const { data } = supabase.storage.from('folio').getPublicUrl(path)
      if (data?.publicUrl) images = [...images, data.publicUrl]
    }
    uploading = false
    input.value = ''
  }

  function remove(i: number) {
    images = images.filter((_, idx) => idx !== i)
  }
</script>

<div class="space-y-3">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">Images</label>
  {#if uploadError}
    <div class="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{uploadError}</div>
  {/if}
  <div class="grid grid-cols-4 gap-2">
    {#each images as url, i}
      <div class="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group">
        <img src={url} alt="" class="w-full h-full object-cover" />
        <button on:click={() => remove(i)} class="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <X size={14} />
        </button>
      </div>
    {/each}
    <label class="aspect-video rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary-500 transition-colors {uploading ? 'opacity-50 pointer-events-none' : ''}">
      {#if uploading}
        <div class="animate-spin rounded-full h-5 w-5 border-2 border-primary-500 border-t-transparent" />
      {:else}
        <Upload size={20} class="text-gray-400" />
        <span class="text-xs text-gray-400">Ajouter</span>
      {/if}
      <input type="file" accept="image/*" multiple on:change={upload} class="hidden" />
    </label>
  </div>
</div>
