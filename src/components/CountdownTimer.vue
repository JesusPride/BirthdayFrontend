Countdowntimer.vue 

<template>
  <div class="countdown-container">
    <div class="countdown-unit">
      <div class="countdown-value">{{ countdown.days }}</div>
      <div class="countdown-label">Days</div>
    </div>
    <div class="countdown-unit">
      <div class="countdown-value">{{ countdown.hours }}</div>
      <div class="countdown-label">Hours</div>
    </div>
    <div class="countdown-unit">
      <div class="countdown-value">{{ countdown.minutes }}</div>
      <div class="countdown-label">Minutes</div>
    </div>
    <div class="countdown-unit">
      <div class="countdown-value">{{ countdown.seconds }}</div>
      <div class="countdown-label">Seconds</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
  props: {
    birthday: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  },
  mounted() {
    this.startCountdown()
  },
  methods: {
    startCountdown() {
      const updateCountdown = () => {
        const now = new Date().getTime()
        const birthdayTime = this.birthday.getTime()
        const distance = birthdayTime - now

        if (distance <= 0) {
          this.countdown = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          }
          this.$emit('birthday-reached')
          return
        }

        this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24))
        this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000)
      }

      // Update immediately
      updateCountdown()
      // Then update every second
      setInterval(updateCountdown, 1000)
    }
  }
}
</script>

<style scoped>
.countdown-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.countdown-unit {
  background: rgba(0, 0, 0, 0.2);
  padding: clamp(0.5rem, 2vw, 1.5rem);
  border-radius: 10px;
  margin: 0;
  min-width: clamp(60px, 15vw, 120px);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.countdown-unit:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.countdown-value {
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: bold;
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  margin-bottom: 0.5rem;
}

.countdown-label {
  font-size: clamp(0.8rem, 2vw, 1rem);
  color: white;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Mobile styles */
@media (max-width: 480px) {
  .countdown-container {
    gap: 0.5rem;
  }
  
  .countdown-unit {
    padding: 0.5rem;
    min-width: 60px;
  }
  
  .countdown-value {
    font-size: 1.5rem;
    margin-bottom: 0.2rem;
  }
  
  .countdown-label {
    font-size: 0.7rem;
  }
}

/* Tablet styles */
@media (min-width: 481px) and (max-width: 768px) {
  .countdown-container {
    gap: 1rem;
  }
  
  .countdown-unit {
    min-width: 80px;
  }
}

/* Landscape mode on mobile */
@media (max-height: 480px) and (orientation: landscape) {
  .countdown-container {
    margin-top: 0.5rem;
  }
  
  .countdown-unit {
    padding: 0.3rem 0.5rem;
    min-width: 50px;
  }
  
  .countdown-value {
    font-size: 1.2rem;
    margin-bottom: 0.1rem;
  }
  
  .countdown-label {
    font-size: 0.6rem;
  }
}
</style>