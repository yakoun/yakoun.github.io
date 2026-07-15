<script lang="ts">
  // Skeleton composed like the real grid while images load.
  const spans = [
    'col-span-2 row-span-2 md:col-span-6 md:row-span-4 lg:col-span-6 lg:row-span-4',
    'col-span-1 row-span-2 md:col-span-3 md:row-span-2 lg:col-span-3 lg:row-span-2',
    'col-span-1 row-span-2 md:col-span-3 md:row-span-2 lg:col-span-3 lg:row-span-2',
    'col-span-2 row-span-2 md:col-span-5 md:row-span-2 lg:col-span-6 lg:row-span-2',
    'col-span-1 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2',
    'col-span-1 row-span-2 md:col-span-3 md:row-span-3 lg:col-span-3 lg:row-span-3',
    'col-span-1 row-span-2 md:col-span-3 md:row-span-2 lg:col-span-3 lg:row-span-2',
    'col-span-2 row-span-2 md:col-span-4 md:row-span-3 lg:col-span-4 lg:row-span-3',
  ]
</script>

<div class="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-4 lg:gap-6 [grid-auto-flow:dense] auto-rows-[130px] md:auto-rows-[120px] lg:auto-rows-[110px]">
  {#each spans as s}
    <div class="rounded-2xl bg-gray-200 dark:bg-gray-800 {s} animate-pulse" />
  {/each}
</div>
