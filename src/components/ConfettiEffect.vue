<template>
  <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
</template>

<script>
import confetti from 'canvas-confetti'

export default {
  name: 'ConfettiEffect',
  data() {
    return {
      confettiInstance: null
    }
  },
  mounted() {
    this.initConfetti()
  },
  methods: {
    initConfetti() {
      const canvas = this.$refs.confettiCanvas
      this.confettiInstance = confetti.create(canvas, {
        resize: true,
        useWorker: true
      })
    },
    launchConfetti() {
      const duration = 15 * 1000
      const end = Date.now() + duration

      const frame = () => {
        this.confettiInstance({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        })
        
        this.confettiInstance({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()

      setTimeout(() => {
        this.confettiInstance({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.6 }
        })
      }, 1000)
    }
  }
}
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}
</style> 