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

<style>
/* Component-specific styles only */

@media (max-width: 768px){
  .countdown-container{
    display: flex
;
        flex-direction: row;
        flex-wrap: wrap;
        /* background: red; */
        width: 100%;
  }
}
</style>