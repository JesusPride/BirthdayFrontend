<template>
  <div class="container-fluid">
    <ConfettiEffect ref="confettiCanvas" />
    <div class="bg-animation" ref="bgAnimation"></div>

    <div v-if="!isBirthday" class="main-content">
      <div class="headline">
        <span class="birthday-emoji">✨</span>
        Get Ready for Esther's Big Day!
        <span class="birthday-emoji">✨</span>
      </div>

      <div id="birthdayDate">
        April 14<span class="blinking-dot">.....</span>
      </div>

      <CountdownTimer
        :birthday="birthday"
        @birthday-reached="onBirthdayReached"
      />

      <!-- <div
        class="time-display"
        :class="{ blinking: isBlinking }"
        @click="toggleBlinking"
      >
        14 | 04
      </div>
      <p class="text-white blinking-note">Click to toggle blinking</p> -->
    </div>

    <div v-else class="birthday-content">
      <PhotoCarousel :images="birthdayImages" />

      <div class="birthday-message">
        <h2>Happy Birthday Esther! 🎂</h2>
        <p>
          Today is all about celebrating the amazing person you are! Wishing you
          joy, love, and exciting tech adventures in the coming year and always!
          🚀💖
        </p>
      </div>
    </div>

    <BirthdayWish
      :wishes="wishes"
      :unique-route="uniqueRoute"
      @add-wish="addWish"
    />
    
    <!-- Mobile Audio Player (only visible on mobile) -->
    <div class="mobile-player-container">
      <MobileAudioPlayer :is-birthday-mode="isBirthday" />
    </div>
  </div>
</template>

<script>
import { useThemeStore } from "../stores/themeStore";
import ConfettiEffect from "./ConfettiEffect.vue";
import PhotoCarousel from "./PhotoCarousel.vue";
import CountdownTimer from "./CountdownTimer.vue";
import BirthdayWish from "./BirthdayWish.vue";
import MobileAudioPlayer from "./MobileAudioPlayer.vue";

export default {
  name: "BirthdayCountdown",
  components: {
    ConfettiEffect,
    PhotoCarousel,
    CountdownTimer,
    BirthdayWish,
    MobileAudioPlayer
  },
  setup() {
    const themeStore = useThemeStore();
    themeStore.initializeTheme();
    return { themeStore };
  },
  data() {
    const birthday = new Date("2025-04-09T15:54:00");
    console.log("Birthday date initialized:", birthday.toISOString());

    // Load photos from localStorage
    const uniqueRoute =
      this.$route.params.uniqueRoute || localStorage.getItem("uniqueRoute");
    const savedPhotos = localStorage.getItem(`photos_${uniqueRoute}`);
    const birthdayImages = savedPhotos
      ? JSON.parse(savedPhotos).map((photo) => ({
          src: photo,
          alt: "Birthday photo",
        }))
      : [
          { src: "/images/birthday-1.JPG", alt: "Happy Birthday Esther!" },
          { src: "/images/birthday-2.jpg", alt: "Celebrating Your Special Day" },
          { src: "/images/birthday-3.JPG", alt: "Best Wishes For You" },
          { src: "/images/IMG_3951 2.jpg", alt: "Special Moments" },
          { src: "/images/IMG_3755.jpg", alt: "Beautiful Memories" },
          { src: "/images/IMG_4324.jpg", alt: "Joyful Celebrations" },
          { src: "/images/IMG_4325_2.jpg", alt: "Wonderful Times" },
          { src: "/images/IMG_7013_2.jpg", alt: "Birthday Joy" },
          { src: "/images/IMG_2614.jpg", alt: "Cherished Memories" },
          { src: "/images/WhatsApp Image 2025-04-13 at 17.49.34 (1).jpeg", alt: "Special Day" },
          { src: "/images/WhatsApp Image 2025-04-13 at 17.49.35 (1).jpeg", alt: "Celebration Time" },
          { src: "/images/WhatsApp Image 2025-04-13 at 17.49.37.jpeg", alt: "Memorable Moments" },
          { src: "/images/WhatsApp Image 2025-04-13 at 17.49.36 (8).jpeg", alt: "Birthday Cheer" },
          { src: "/images/WhatsApp Image 2025-04-13 at 17.49.36 (9).jpeg", alt: "Happy Celebrations" }
        ];

    return {
      birthday,
      isBirthday: false,
      isBlinking: false,
      wishes: [
        {
          name: "The Team",
          message:
            "Happy Birthday Esther! You bring so much joy to everyone around you!",
        },
      ],
      birthdayImages,
      uniqueRoute,
    };
  },
  mounted() {
    console.log(this.birthday);
    this.createStars();
    // Initialize confetti canvas
    if (
      this.$refs.confettiCanvas &&
      this.$refs.confettiCanvas.initializeCanvas
    ) {
      this.$refs.confettiCanvas.initializeCanvas();
    }
  },
  methods: {
    createStars() {
      const bgAnimation = this.$refs.bgAnimation;
      if (!bgAnimation) return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Clear any existing stars
      bgAnimation.innerHTML = '';

      // Divide screen into 4 quadrants for even distribution
      for (let quadrant = 0; quadrant < 4; quadrant++) {
        // Create stars for each quadrant (15 per quadrant = 60 total)
        for (let i = 0; i < 15; i++) {
          const star = document.createElement("div");
          star.classList.add("star");
          
          // Calculate quadrant boundaries
          const startX = (quadrant % 2) * (screenWidth / 2);
          const startY = Math.floor(quadrant / 2) * (screenHeight / 2);
          
          // Position within quadrant
          star.style.left = `${startX + Math.random() * (screenWidth / 2)}px`;
          star.style.top = `${startY + Math.random() * (screenHeight / 2)}px`;
          
          // More varied animation timing
          star.style.animationDelay = `${Math.random() * 10}s`;
          star.style.animationDuration = `${4 + Math.random() * 6}s`;
          
          // All stars have the same color
          star.style.backgroundColor = "#00ffcc";
          star.style.boxShadow = "0 0 2px rgba(0, 255, 204, 0.6)";
          
          // Make stars smaller by default
          star.style.width = '1px';
          star.style.height = '1px';
          
          // Fewer large stars
          if (Math.random() > 0.85) {
            star.style.width = '2px';
            star.style.height = '2px';
          }
          if (Math.random() > 0.95) {
            star.style.width = '3px';
            star.style.height = '3px';
          }
          
          bgAnimation.appendChild(star);
        }
      }
    },
    onBirthdayReached() {
      this.isBirthday = true;
      // Emit event to parent to switch music
      this.$emit('birthday-reached');
      if (this.$refs.confettiCanvas) {
        this.$refs.confettiCanvas.launchConfetti();
      }
    },
    toggleBlinking() {
      this.isBlinking = !this.isBlinking;
    },
    addWish(wish) {
      this.wishes.unshift(wish);
    },
  },
};
</script>


<style scoped>
.container-fluid {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 1;
  pointer-events: none;
}

.star {
  position: absolute;
  background-color: #00ffcc;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  animation: twinkle 5s infinite;
  box-shadow: 0 0 2px rgba(0, 255, 204, 0.6);
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

.main-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
}

/* .headline {
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 3s ease infinite;
} */

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.birthday-emoji {
  margin: 0 0.5rem;
  animation: float 3s ease-in-out infinite;
  display: inline-block;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

#birthdayDate {
  font-family: 'Share Tech Mono', monospace;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #ff3399;
  margin: 2rem auto;
  background-color: rgba(255, 51, 153, 0.1);
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 0 15px rgba(255, 51, 153, 0.3);
}

.blinking-dot {
  animation: blink 1s infinite;
  color: #ff3399;
  margin: 0 0.2rem;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.time-display {
  font-size: 4rem;
  margin: 2rem 0;
  cursor: pointer;
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  transition: all 0.3s ease;
  font-weight: bold;
  letter-spacing: 2px;
}

.time-display:hover {
  transform: scale(1.05);
  text-shadow: 0 0 15px rgba(0, 255, 204, 0.7);
}

.blinking {
  animation: blink 1s infinite;
}

.blinking-note {
  font-size: 1rem;
  opacity: 0.7;
  color: #00ffcc;
  margin-top: 0.5rem;
}

.birthday-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.birthday-message {
  margin-top: 2rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(5px);
}

.birthday-message h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  color: #00ffcc;
}

.birthday-message p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  color: #ffffff;
}

@media (max-width: 768px) {
  .headline {
    font-size: 2rem;
  }

  .time-display {
    font-size: 3rem;
  }

  .birthday-message h2 {
    font-size: 2rem;
  }

  .birthday-message p {
    font-size: 1rem;
  }
}

/* Mobile Audio Player Container */
.mobile-player-container {
  display: none;
}

@media (max-width: 768px) {
  .mobile-player-container {
    display: block;
    margin-top: 1rem;
  }
}
</style>