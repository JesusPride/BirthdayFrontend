<template>
  <div class="carousel-container">
    <div id="birthdayCarousel" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicators -->
      <div class="carousel-indicators">
        <button 
          v-for="(image, index) in images" 
          :key="`indicator-${index}`"
          type="button" 
          data-bs-target="#birthdayCarousel" 
          :data-bs-slide-to="index" 
          :class="{ active: index === 0 }"
          aria-current="true"
          :aria-label="`Slide ${index + 1}`">
        </button>
      </div>
      
      <div class="carousel-inner">
        <div v-for="(image, index) in images" 
             :key="index" 
             class="carousel-item"
             :class="{ active: index === 0 }">
          <img :src="image.src" :alt="image.alt">
        </div>
      </div>
      
      <button class="carousel-control-prev" type="button" data-bs-target="#birthdayCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#birthdayCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoCarousel',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  mounted() {
    // Initialize carousel using vanilla JavaScript (no Bootstrap dependency)
    this.initCarousel();
  },
  methods: {
    initCarousel() {
      const carousel = document.getElementById('birthdayCarousel');
      if (!carousel) return;
      
      const items = carousel.querySelectorAll('.carousel-item');
      if (items.length <= 1) return; // No need for carousel with just one item
      
      const interval = 5000; // Time between slides in ms
      let currentIndex = 0;
      let slideInterval;
      
      // Function to move to a specific slide
      const goToSlide = (index) => {
        // Remove active class from all items
        items.forEach(item => item.classList.remove('active'));
        
        // Handle index bounds
        if (index >= items.length) {
          currentIndex = 0;
        } else if (index < 0) {
          currentIndex = items.length - 1;
        } else {
          currentIndex = index;
        }
        
        // Add active class to current item
        items[currentIndex].classList.add('active');
        
        // Update indicators
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        if (indicators.length) {
          indicators.forEach(indicator => indicator.classList.remove('active'));
          indicators[currentIndex].classList.add('active');
        }
      };
      
      // Start automatic sliding
      const startSlideshow = () => {
        slideInterval = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, interval);
      };
      
      // Stop automatic sliding
      const stopSlideshow = () => {
        clearInterval(slideInterval);
      };
      
      // Previous button
      const prevButton = carousel.querySelector('.carousel-control-prev');
      if (prevButton) {
        prevButton.addEventListener('click', () => {
          stopSlideshow();
          goToSlide(currentIndex - 1);
          startSlideshow();
        });
      }
      
      // Next button
      const nextButton = carousel.querySelector('.carousel-control-next');
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          stopSlideshow();
          goToSlide(currentIndex + 1);
          startSlideshow();
        });
      }
      
      // Indicator buttons
      const indicators = carousel.querySelectorAll('.carousel-indicators button');
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          stopSlideshow();
          goToSlide(index);
          startSlideshow();
        });
      });
      
      // Start the slideshow
      startSlideshow();
      
      // Pause on hover
      carousel.addEventListener('mouseenter', stopSlideshow);
      carousel.addEventListener('mouseleave', startSlideshow);
    }
  }
}
</script>

<style scoped>
.carousel-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto 2rem;
  padding: 0 1rem;
  box-sizing: border-box;
}

.carousel-item img {
  width: 100%;
  height: clamp(200px, 50vw, 400px);
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.carousel-item img:hover {
  transform: scale(1.02);
}

.carousel-inner {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Tablet styles */
@media (max-width: 768px) {
  .carousel-container {
    margin-bottom: 1.5rem;
  }
  
  .carousel-item img {
    height: clamp(250px, 50vw, 400px);
    border-radius: 8px;
  }
  
  .carousel-inner {
    border-radius: 8px;
  }
}

/* Mobile styles */
@media (max-width: 480px) {
  .carousel-container {
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }
  
  .carousel-item img {
    height: clamp(200px, 45vw, 300px);
    border-radius: 6px;
  }
  
  .carousel-inner {
    border-radius: 6px;
  }
  
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    padding: 5px;
  }
}

/* Landscape mode on mobile */
@media (max-height: 480px) and (orientation: landscape) {
  .carousel-container {
    margin-bottom: 0.5rem;
  }
  
  .carousel-item img {
    height: clamp(170px, 60vh, 250px);
  }
}

/* Keep the remaining styles */
.carousel-control-prev,
.carousel-control-next {
  width: 10%;
  opacity: 0.7;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 10px;
}

/* Animation styles */
.carousel-item {
  transition: opacity 0.6s ease-in-out;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.carousel-item.active {
  opacity: 1;
  position: relative;
}

/* Indicator styles */
.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 2;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  margin: 0 5px;
  padding: 0;
  cursor: pointer;
}

.carousel-indicators button.active {
  background-color: #00ffcc;
  transform: scale(1.2);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 