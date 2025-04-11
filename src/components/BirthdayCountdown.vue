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

      <div
        class="time-display"
        :class="{ blinking: isBlinking }"
        @click="toggleBlinking"
      >
        14 | 04
      </div>
      <p class="text-white blinking-note">Click to toggle blinking</p>
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
  </div>
</template>

<script>
import { useThemeStore } from "../stores/themeStore";
import ConfettiEffect from "./ConfettiEffect.vue";
import PhotoCarousel from "./PhotoCarousel.vue";
import CountdownTimer from "./CountdownTimer.vue";
import BirthdayWish from "./BirthdayWish.vue";

export default {
  name: "BirthdayCountdown",
  components: {
    ConfettiEffect,
    PhotoCarousel,
    CountdownTimer,
    BirthdayWish,
  },
  setup() {
    const themeStore = useThemeStore();
    themeStore.initializeTheme();
    return { themeStore };
  },
  data() {
    const birthday = new Date("2025-04-14T15:54:00");
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
          { src: "/images/birthday-1.jpg", alt: "Happy Esther Day" },
          { src: "/images/birthday-2.jpg", alt: "Birthday Smiles" },
          { src: "/images/birthday-3.jpg", alt: "Best Moments" },
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

      console.log(this.birthday);

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${Math.random() * screenWidth}px`;
        star.style.top = `${Math.random() * screenHeight}px`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        bgAnimation.appendChild(star);
      }
    },
    onBirthdayReached() {
      this.isBirthday = true;
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.3;
}

.star {
  position: absolute;
  background-color: #ff6b6b;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  animation: twinkle 5s infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
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
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #ff6b6b;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  font-weight: 500;
  box-shadow: 0 0 15px rgba(255, 51, 153, 0.3);

}

.blinking-dot {
  animation: blink 1s infinite;
  color: #ff6b6b;
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
  color: #ff6b6b;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  font-weight: bold;
  letter-spacing: 2px;
}

.time-display:hover {
  transform: scale(1.05);
  text-shadow: 0 0 15px rgba(255, 107, 107, 0.7);
}

.blinking {
  animation: blink 1s infinite;
}

.blinking-note {
  font-size: 1rem;
  opacity: 0.7;
  color: #ff6b6b;
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
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  color: #ff6b6b;
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
</style>