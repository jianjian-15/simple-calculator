<script setup lang="ts">
import { useThemeStore, type ThemeType } from '../stores/theme'

const themeStore = useThemeStore()

const themes: { key: ThemeType; label: string; icon: string }[] = [
  { key: 'dark', label: '深色', icon: '🌙' },
  { key: 'light', label: '浅色', icon: '☀️' },
  { key: 'glass', label: '玻璃', icon: '✨' },
  { key: 'gradient', label: '渐变', icon: '🌈' }
]
</script>

<template>
  <div class="theme-switcher">
    <button class="theme-btn" @click="themeStore.toggleMenu">
      🎨
    </button>
    <div v-if="themeStore.isMenuOpen" class="theme-menu">
      <button
        v-for="theme in themes"
        :key="theme.key"
        :class="['theme-option', { active: themeStore.currentTheme === theme.key }]"
        @click="themeStore.setTheme(theme.key)"
      >
        <span class="theme-icon">{{ theme.icon }}</span>
        <span class="theme-label">{{ theme.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.theme-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bg-secondary);
  font-size: 24px;
  box-shadow: 0 4px 15px var(--shadow);
  border: 2px solid var(--border-color);
}

.theme-btn:hover {
  transform: scale(1.1);
}

.theme-menu {
  position: absolute;
  top: 60px;
  right: 0;
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 8px 30px var(--shadow);
  border: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 8px;
  background: transparent;
  color: var(--text-primary);
  font-size: 14px;
  text-align: left;
}

.theme-option:hover {
  background: var(--button-function-hover);
}

.theme-option.active {
  background: var(--accent);
  color: white;
}

.theme-icon {
  font-size: 18px;
}

.theme-label {
  font-weight: 500;
}

@media (max-width: 480px) {
  .theme-switcher {
    top: 10px;
    right: 10px;
  }

  .theme-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .theme-menu {
    top: 50px;
  }
}
</style>
