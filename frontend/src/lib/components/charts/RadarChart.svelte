<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

  Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

  export let data: { label: string; value: number }[] = []
  export let title = ''

  let canvas: HTMLCanvasElement
  let chart: Chart

  function createChart() {
    if (!canvas || data.length === 0) return
    if (chart) chart.destroy()
    chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          label: 'Niveau moyen',
          data: data.map(d => d.value),
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 0.8)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Niveau: ${ctx.parsed.r}/5`
            }
          }
        },
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: { stepSize: 1, font: { size: 10 }, backdropColor: 'transparent' },
            grid: { color: 'rgba(0,0,0,0.08)' },
            angleLines: { color: 'rgba(0,0,0,0.08)' },
            pointLabels: { font: { size: 11, weight: '500' } }
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
