<template>
    <section class="example" id="example">
      <div class="section-title">
        <h2>See It In Action</h2>
        <p>Preview what your birthday celebration page could look like</p>
      </div>
      <div class="example-preview">
        <div class="example-card">
          <div class="example-header">
            <h3>Happy Birthday Emma!</h3>
            <div class="example-countdown">
              <div class="countdown-item" v-for="(item, index) in countdownItems" :key="index">
                <span>{{ item.value }}</span>
                <p>{{ item.label }}</p>
              </div>
            </div>
          </div>
          <div class="example-body">
            <div class="example-carousel">
              <i class="fas fa-images fa-3x"></i>
            </div>
            <div class="wishes-form">
              <h4>Leave a Birthday Wish</h4>
              <div class="form-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" v-model="wishForm.name" placeholder="Enter your name">
              </div>
              <div class="form-group">
                <label for="message">Your Message</label>
                <textarea id="message" v-model="wishForm.message" placeholder="Write your birthday wish here..."></textarea>
              </div>
              <app-button @click="sendWish" variant="primary">Send Wish</app-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import AppButton from '../ui/AppButton.vue';
  
  export default {
    name: 'ExampleSection',
    components: {
      'app-button': AppButton
    },
    data() {
      return {
        countdownItems: [
          { value: '05', label: 'Days' },
          { value: '12', label: 'Hours' },
          { value: '34', label: 'Minutes' },
          { value: '22', label: 'Seconds' }
        ],
        wishForm: {
          name: '',
          message: ''
        }
      };
    },
    methods: {
      sendWish() {
        // Here you would handle sending the wish
        alert('Your wish has been sent!');
        this.wishForm.name = '';
        this.wishForm.message = '';
      }
    }
  }
  </script>
  
  <style scoped>
  .example {
    padding: 5rem 5%;
    background-color: white;
    text-align: center;
  }
  
  .example-preview {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }
  
  .example-card {
    width: 80%;
    max-width: 800px;
    background-color: var(--landing-light-color);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    padding: 5rem 5%;
    background-color: white;
    text-align: center;
  }

  .example-header {
    background: linear-gradient(to right, var(--landing-primary-color), var(--landing-secondary-color));
    padding: 2rem;
    color: white;
    text-align: center;
  }

  .example-header h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .example-countdown {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
  }

  .countdown-item {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    min-width: 70px;
  }

  .countdown-item span {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .example-body {
    padding: 2rem;
  }

  .example-carousel {
    background-color: var(--landing-dark-color);
    height: 200px;
    margin-bottom: 1.5rem;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .wishes-form {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 5px;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-align: left;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: var(--landing-font-main);
  }

  .form-group textarea {
    min-height: 100px;
    resize: vertical;
  }
</style>