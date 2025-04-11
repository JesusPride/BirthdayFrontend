<template>
  <div v-if="isLoading && isBirthdayCountdown" class="loading">
    <div class="loading-spinner"></div>
    <div>Preparing Esther's Special Day...</div>
  </div>
  <div v-else class="app-container">
    <AppNavbar v-if="!isDashboard && !isBirthdayCountdown" @open-modal="openModal" />
    <ThemeToggle v-if="isBirthdayCountdown" />
    <AudioPlayer v-if="isBirthdayCountdown" />
    <AppModal 
      :is-active="isModalActive" 
      :initial-tab="activeTab"
      @close="closeModal"
    />
    <router-view @open-modal="openModal" />
  </div>
</template>

<script>
import ThemeToggle from './components/ThemeToggle.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import AppNavbar from './components/ui/AppNavbar.vue'
import AppModal from './components/ui/AppModal.vue'
import { useThemeStore } from './stores/themeStore'

export default {
  name: 'App',
  components: {
    ThemeToggle,
    AudioPlayer,
    AppNavbar,
    AppModal
  },
  data() {
    return {
      isLoading: true,
      isModalActive: false,
      activeTab: 'login'
    }
  },
  computed: {
    isDashboard() {
      return this.$route.path.startsWith('/dashboard')
    },
    isBirthdayCountdown() {
      return this.$route.path.startsWith('/birthday')
    }
  },
  setup() {
    const themeStore = useThemeStore()
    return { themeStore }
  },
  methods: {
    openModal(tab) {
      this.activeTab = tab
      this.isModalActive = true
    },
    closeModal() {
      this.isModalActive = false
    }
  },
  mounted() {
    // Initialize theme
    this.themeStore.initializeTheme()
    
    // Set theme based on route
    if (this.isDashboard) {
      this.themeStore.setTheme('landing')
    } else {
      this.themeStore.setTheme('birthday')
    }

    // Simulate loading time
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  },
  watch: {
    '$route'(to) {
      // Update theme when route changes
      if (to.path.startsWith('/dashboard')) {
        this.themeStore.setTheme('landing')
      } else {
        this.themeStore.setTheme('birthday')
      }
    }
  }
}
</script>

<style>
/* Global styles are now in main.css */
</style>