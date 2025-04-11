<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">Celebrate<span>.</span></div>
      <div class="nav-links">
        <a href="#features" class="nav-link">Features</a>
        <a href="#how-it-works" class="nav-link">How It Works</a>
        <a href="#example" class="nav-link">Example</a>
      </div>
      <div class="auth-buttons">
        <app-button @click="$emit('open-modal', 'login')" variant="outline">Log In</app-button>
        <app-button @click="$emit('open-modal', 'signup')" variant="primary">Sign Up</app-button>
      </div>
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <a href="#features" class="nav-link">Features</a>
      <a href="#how-it-works" class="nav-link">How It Works</a>
      <a href="#example" class="nav-link">Example</a>
      <div class="mobile-auth-buttons">
        <app-button @click="$emit('open-modal', 'login')" variant="outline">Log In</app-button>
        <app-button @click="$emit('open-modal', 'signup')" variant="primary">Sign Up</app-button>
      </div>
    </div>
  </nav>
</template>

<script>
import AppButton from '../ui/Appbutton.vue';

export default {
  name: 'AppNavbar',
  components: {
    AppButton
  },
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: var(--landing-light-color);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--landing-primary-color);
  text-decoration: none;
  margin-right: 2rem;
}

.logo span {
  color: var(--landing-secondary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
  margin-right: auto;
}

.nav-link {
  text-decoration: none;
  color: var(--landing-dark-color);
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--landing-primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--landing-primary-color);
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-btn span {
  display: block;
  width: 25px;
  height: 2px;
  background-color: var(--landing-dark-color);
  transition: all 0.3s;
}

.mobile-menu {
  display: none;
  background-color: var(--landing-light-color);
  padding: 1rem;
  text-align: center;
}

.mobile-menu.is-open {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .nav-links, .auth-buttons {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-menu {
    display: none;
  }

  .mobile-menu.is-open {
    display: flex;
  }
}
</style>