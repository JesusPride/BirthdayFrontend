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
  margin: 2rem auto;
}

.carousel-item img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}
</style> 