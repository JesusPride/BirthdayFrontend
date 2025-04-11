<template>
    <section class="hero">
      <div class="hero-content">
        <h1>Make Every <span>Birthday</span> Special</h1>
        <p>Create personalized birthday celebrations that friends and family can join from anywhere. Set up your birthday page, share your link, and collect heartfelt wishes from loved ones.</p>
        <app-button @click="$emit('open-modal', 'signup')" variant="primary">Get Started</app-button>
      </div>
      <div class="hero-image">
        <img src="https://placehold.co/500x350" alt="Birthday celebration preview">
      </div>
    </section>
  </template>
  
  <script>
  import AppButton from '../ui/Appbutton.vue';
  
  export default {
    name: 'HeroSection',
    components: {
      AppButton
    }
  }
  </script>
  
  <style scoped>
  .hero {
    height: 100vh;
    display: flex;
    align-items: center;
    /* background: linear-gradient(135deg, rgba(255, 77, 109, 0.1), rgba(123, 44, 191, 0.1)); */
    background: #F5F5F5;
    background-color: #FFC6D3;
    padding: 0 5%;
    margin-top: 60px;
  }
  
  .hero-content {
    width: 50%;
    padding-right: 2rem;
    text-align: left;
  }
  
  .hero-image {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .hero-image img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
  
  .hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    color: var(--landing-dark-color);
    text-align: left;
  }
  
  .hero-content h1 span {
    color: var(--landing-primary-color);
  }
  
  .hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #333;
    text-align: left;
  }
  
  @media (max-width: 768px) {
    .hero {
      flex-direction: column;
      text-align: center;
      padding-top: 4rem;
    }
  
    .hero-content, .hero-image {
      width: 100%;
    }
  
    .hero-content {
      padding-right: 0;
      margin-bottom: 2rem;
      text-align: center;
    }
  
    .hero-content h1,
    .hero-content p {
      text-align: center;
    }
  }
  </style>