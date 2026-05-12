import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export type ThemeType = 'dark' | 'light' | 'glass' | 'gradient'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = useLocalStorage<ThemeType>('calculator-theme', 'dark')
  const isMenuOpen = ref(false)

  function setTheme(theme: ThemeType) {
    currentTheme.value = theme
    applyTheme(theme)
  }

  function applyTheme(theme: ThemeType) {
    document.documentElement.setAttribute('data-theme', theme)
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function initTheme() {
    applyTheme(currentTheme.value)
  }

  return {
    currentTheme,
    isMenuOpen,
    setTheme,
    toggleMenu,
    initTheme
  }
})
