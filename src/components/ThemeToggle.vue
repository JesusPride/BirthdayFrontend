<template>
  <button class="theme-toggle" @click="themeStore.toggleTheme()">
    <i :class="themeStore.isLightTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
  </button>
</template>

<script>
import { useThemeStore } from '../stores/themeStore'

export default {
  name: 'ThemeToggle',
  setup() {
    const themeStore = useThemeStore()
    return { themeStore }
  }
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.1);
}
</style> 