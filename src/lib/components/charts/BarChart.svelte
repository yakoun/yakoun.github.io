<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

  export let data: { label: string; value: number }[] = []
  export let title = ''
  export let horizontal = false
  export let color = 'rgba(99, 102, 241, 0.8)'

  let canvas: HTMLCanvasElement
  let chart: Chart

  function createChart() {
    if (!canvas || data.length === 0) return
    if (chart) chart.destroy()
    const sorted = [...data].sort((a, b) => b.value - a.value)
    chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: sorted.map(d => d.label),
        datasets: [{
          label: 'Niveau',
          data: sorted.map(d => d.value),
          backgroundColor: sorted.map((_, i) => {
            const alpha = 0.9 - (i / sorted.length) * 0.5
            return color.replace('0.8', String(alpha))
          }),
          borderColor: color,
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Niveau: ${ctx.parsed[horizontal ? 'x' : 'y']}/5`
            }
          }
        },
        scales: {
          x: horizontal ? {
            min: 0, max: 5,
            ticks: { stepSize: 1, font: { size: 10 } },
            grid: { color: 'rgba(0,0,0,0.06)' }
          } : {
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: { font: { size: 10 } }
          },
          y: horizontal ? {
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: { font: { size: 10 } }
          } : {
            min: 0, max: 5,
            ticks: { stepSize: 1, font: { size: 10 } },
            grid: { color: 'rgba(0,0,0,0.06)' }
          }
        }
      }
    })
  }

  $: if (canvas && data) createChart()
  onDestroy(() => chart?.destroy())
</script>

<div class="relative">
  {#if title}
    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
  {/if}
  <canvas bind:this={canvas} />
</div>
