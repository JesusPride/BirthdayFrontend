import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isLightTheme: localStorage.getItem('theme') === 'light',
    currentTheme: localStorage.getItem('currentTheme') || 'birthday'
  }),
  
  actions: {
    toggleTheme() {
      this.isLightTheme = !this.isLightTheme
      localStorage.setItem('theme', this.isLightTheme ? 'light' : 'dark')
      document.body.classList.toggle('light-theme', this.isLightTheme)
    },
    
    setTheme(theme) {
      this.currentTheme = theme
      localStorage.setItem('currentTheme', theme)
      document.body.classList.remove('birthday-theme', 'landing-theme')
      document.body.classList.add(`${theme}-theme`)
    },
    
    initializeTheme() {
      document.body.classList.toggle('light-theme', this.isLightTheme)
      document.body.classList.add(`${this.currentTheme}-theme`)
    }
  }
}) 