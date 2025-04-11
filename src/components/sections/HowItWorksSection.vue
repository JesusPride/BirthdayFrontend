<template>
    <section class="how-it-works" id="how-it-works">
      <div class="section-title">
        <h2>How It Works</h2>
        <p>Create your birthday celebration in just a few simple steps</p>
      </div>
      <div class="steps">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'HowItWorksSection',
    data() {
      return {
        steps: [
          {
            title: 'Sign Up',
            description: 'Create an account and set your birthday date.'
          },
          {
            title: 'Customize',
            description: 'Upload photos, choose your theme, and personalize your page.'
          },
          {
            title: 'Share',
            description: 'Copy your unique link and share it with friends and family.'
          },
          {
            title: 'Celebrate',
            description: 'Receive birthday wishes and enjoy your special day!'
          }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .how-it-works {
    padding: 5rem 5%;
    background-color: var(--landing-light-color);
  }
  
  .steps {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
  }
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 25%;
  }
  
  .step-number {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--landing-primary-color);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  
  .step h3 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .section-title h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .section-title p {
    color: #333;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .step p {
    color: #333;
  }
  
  @media (max-width: 768px) {
    .steps {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
  
    .step {
      width: 100%;
      max-width: 300px;
    }
  }
  </style>