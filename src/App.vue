<script setup lang="ts">
import Calculator from './components/Calculator.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
themeStore.initTheme()
</script>

<template>
  <div class="app-container">
    <ThemeSwitcher />
    <Calculator />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
