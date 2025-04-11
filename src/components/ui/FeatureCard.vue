<template>
    <div class="feature-card">
      <div class="feature-icon">
        <i :class="iconClass"></i>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FeatureCard',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .feature-card {
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    transition: transform 0.3s;
    text-align: center;
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
  }
  
  .feature-icon {
    font-size: 2.5rem;
    color: var(--landing-primary-color);
    margin-bottom: 1.5rem;
  }
  
  .feature-card h3 {
    margin-bottom: 1rem;
    color: var(--landing-dark-color);
  }
  
  .feature-card p {
    color: #666;
    border: 1px solid red;
  }
  </style>