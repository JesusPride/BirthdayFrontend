<template>
  <div class="carousel-container">
    <div class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div class="carousel-inner">
        <div v-for="(image, index) in images" 
             :key="index" 
             class="carousel-item"
             :class="{ active: index === 0 }">
          <img :src="image.src" :alt="image.alt">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
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
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

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

/* Tablet styles */
@media (max-width: 768px) {
  .carousel-container {
    margin-bottom: 1.5rem;
  }
  
  .carousel-item img {
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
    height: clamp(150px, 40vw, 200px);
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
    height: clamp(120px, 30vh, 150px);
  }
}
</style> 