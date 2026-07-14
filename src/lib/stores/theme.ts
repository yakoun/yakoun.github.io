import { writable } from 'svelte/store'

const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
export const theme = writable<'light' | 'dark'>(stored === 'light' ? 'light' : 'dark')

theme.subscribe((value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', value)
    document.documentElement.classList.toggle('dark', value === 'dark')
  }
})

export function toggleTheme() {
  theme.update(t => t === 'dark' ? 'light' : 'dark')
}