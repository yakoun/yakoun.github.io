<script lang="ts">
  // Composant SEO injecté dans <head> via svelte:head
  export let title = 'ElectroDev Pro - Électrotechnicien & Développeur'
  export let description = 'Installation électrique, réseaux WiFi, paraboles satellites et développement web. Solutions professionnelles pour particuliers et entreprises.'
  export let image = ''
  export let url = ''
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="électricien, installation électrique, wifi, parabole, réseau, développement web, Svelte, électrotechnicien" />
  <meta name="author" content="ElectroDev Pro" />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {#if image}<meta property="og:image" content={image} />{/if}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {#if image}<meta name="twitter:image" content={image} />{/if}

  <!-- Canonical -->
  <link rel="canonical" href={url || 'https://electrodev.fr'} />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "ElectroDev Pro",
      "jobTitle": "Électrotechnicien & Développeur",
      "description": description,
      "url": "https://electrodev.fr",
      "telephone": "+33600000000",
      "email": "contact@electrodev.fr",
      "knowsAbout": ["Électricité", "Réseaux", "WiFi", "Paraboles", "Développement web"],
    })}
  </script>

  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>