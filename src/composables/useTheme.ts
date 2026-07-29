import { ref, watch } from 'vue'
type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

export function useTheme() {
  const stored = localStorage.getItem('theme') as Theme | null
  const theme = ref<Theme>(stored ?? 'light')

  applyTheme(theme.value)

  watch(theme, (value) => applyTheme(value))

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggleTheme }
}
