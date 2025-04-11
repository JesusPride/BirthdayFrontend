<template>
  <div class="home">
    <hero-section @open-modal="openModal" />
    <features-section />
    <how-it-works-section />
    <example-section />
    <cta-section @open-modal="openModal" />
    <app-footer />
  </div>
</template>

<script>
import HeroSection from '../components/sections/HeroSection.vue';
import FeaturesSection from '../components/sections/FeaturesSection.vue';
import HowItWorksSection from '../components/sections/HowItWorksSection.vue';
import ExampleSection from '../components/sections/ExampleSection.vue';
import CtaSection from '../components/sections/CtaSection.vue';
import AppFooter from '../components/ui/AppFooter.vue';

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    FeaturesSection,
    HowItWorksSection,
    ExampleSection,
    CtaSection,
    AppFooter
  },
  methods: {
    openModal(tab) {
      this.$emit('open-modal', tab);
    }
  }
}
</script>