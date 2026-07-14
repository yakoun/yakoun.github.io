<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'

  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)

  export let experiences: { role: string; company: string; start_date: string; end_date?: string; current?: boolean }[] = []
  export let title = ''

  let canvas: HTMLCanvasElement
  let chart: Chart

  function parseYear(d: string) {
    if (!d) return 0
    const y = parseInt(d.slice(0, 4))
    const m = parseInt(d.slice(5, 7)) || 6
    return y + (m - 1) / 12
  }

  function createChart() {
    if (!canvas || experiences.length === 0) return
    if (chart) chart.destroy()

    const now = parseYear('2026-07-01')
    const minYear = Math.min(...experiences.map(e => parseYear(e.start_date))) - 1
    const items = experiences.map(e => ({
      label: `${e.role} — ${e.company}`,
      start: parseYear(e.start_date),
      end: e.current ? now : parseYear(e.end_date)
    }))

    chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: items.map(i => i.label),
        datasets: [{
          data: items.map(i => i.end - i.start),
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const item = items[ctx.dataIndex]
                const yrs = Math.floor(item.end - item.start)
                const mos = Math.round((item.end - item.start - yrs) * 12)
                return `${yrs}a ${mos}m`
              }
            }
          }
        },
        scales: {
          x: {
            min: Math.floor(minYear),
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: {
              font: { size: 10 },
              callback: (v) => String(Math.floor(Number(v)))
            }
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 10 } }
          }
        }
      }
    })
  }

  $: if (canvas && experiences) createChart()
  onDestroy(() => chart?.destroy())
</script>

<div class="relative">
  {#if title}
    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
  {/if}
  <canvas bind:this={canvas} />
</div>
