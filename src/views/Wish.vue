<template>
  <div v-if="wish">
    <h1>Wish for {{ wish.name }}</h1>
    <p>{{ wish.message }}</p>
  </div>
  <div v-else>
    <p>Loading wish...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wish: null
    };
  },
  mounted() {
    const id = this.$route.params.id;
    fetch(`https://birthday-db.onrender.com/api/wishes/${id}`)
      .then(response => response.json())
      .then(data => {
        this.wish = data;
      })
      .catch(error => console.error("Error fetching wish:", error));
  }
};
</script>