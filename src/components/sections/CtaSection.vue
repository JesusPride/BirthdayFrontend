<template>
    <section class="cta">
      <h2>Ready to Make Birthday Memories?</h2>
      <p>Sign up today and create your personalized birthday celebration page in minutes.</p>
      <app-button @click="$emit('open-modal', 'signup')">Create Your Birthday Page</app-button>
    </section>
  </template>
  
  <script>
  import AppButton from '../ui/Appbutton.vue';
  
  export default {
    name: 'CtaSection',
    components: {
      AppButton
    }
  }
  </script>
  
  <style scoped>
  .cta {
    padding: 5rem 5%;
    background: linear-gradient(to right, var(--landing-primary-color), var(--landing-secondary-color));
    color: white;
    text-align: center;
  }
  
  .cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .cta p {
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta .btn {
    background-color: white;
    color: var(--landing-primary-color);
    font-size: 1.2rem;
    padding: 0.75rem 2rem;
  }
  
  .cta .btn:hover {
    background-color: var(--landing-light-color);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
  </style>