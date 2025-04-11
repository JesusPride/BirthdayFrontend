<template>
    <section class="features" id="features">
      <div class="section-title">
        <h2>Amazing Features</h2>
        <p>Everything you need to create memorable birthday celebrations</p>
      </div>
      <div class="features-grid">
        <feature-card 
          v-for="(feature, index) in features" 
          :key="index"
          :icon-class="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </section>
  </template>
  
  <script>
  import FeatureCard from '../ui/FeatureCard.vue';
  
  export default {
    name: 'FeaturesSection',
    components: {
      FeatureCard
    },
    data() {
      return {
        features: [
          {
            icon: 'fas fa-clock',
            title: 'Countdown Timer',
            description: 'Build excitement with a customizable countdown timer showing days, hours, minutes and seconds until the big day.'
          },
          {
            icon: 'fas fa-images',
            title: 'Photo Carousel',
            description: 'Upload your favorite photos to create a beautiful slideshow of memories for your birthday page.'
          },
          {
            icon: 'fas fa-music',
            title: 'Birthday Music',
            description: 'Add a personal touch with birthday music that plays when visitors open your celebration page.'
          },
          {
            icon: 'fas fa-comment-dots',
            title: 'Birthday Wishes',
            description: 'Friends can leave heartfelt birthday messages that you\'ll cherish forever.'
          },
          {
            icon: 'fas fa-share-alt',
            title: 'Easy Sharing',
            description: 'Generate a unique link to share with friends and family across social media and messaging apps.'
          },
          {
            icon: 'fas fa-paint-brush',
            title: 'Customizable Themes',
            description: 'Choose from light or dark mode and personalize colors to match your style.'
          }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .features {
    padding: 5rem 5%;
    background-color: white;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .section-title h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  .section-title p {
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.6;
    font-weight: 400;
    border: 1px solid red;
  }

  .section-title description {
    color: black;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .section-title h2 {
      font-size: 2rem;
    }
    
    .section-title p {
      font-size: 1rem;
      padding: 0 1rem;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>