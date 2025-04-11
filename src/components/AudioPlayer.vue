<template>
  <div class="audio-player">
    <audio
      ref="audioPlayer"
      :src="musicSrc"
      loop
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>

    <div class="controls">
      <button
        class="btn btn-custom"
        @click="togglePlay"
        :title="isPlaying ? 'Pause Music' : 'Play Music'"
      >
        <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
      </button>

      <div class="volume-control">
        <i :class="volumeIcon"></i>
        <input
          type="range"
          min="0"
          max="100"
          v-model="volume"
          @input="onVolumeChange"
          class="volume-slider"
        />
      </div>

      <div class="song-info">
        <span class="song-title">{{ songTitle }}</span>
        <span class="song-artist">{{ songArtist }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    isBirthdayMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPlaying: false,
      volume: 50,
      countdownMusic: "/audio/happy-birthday.mp3",
      birthdayMusic: "/audio/Congratulations__Happy_Birthday_128k.mp3",
      currentTime: 0,
      duration: 0,
    };
  },
  computed: {
    volumeIcon() {
      if (this.volume === 0) return "fas fa-volume-mute";
      if (this.volume < 30) return "fas fa-volume-down";
      return "fas fa-volume-up";
    },
    musicSrc() {
      return this.isBirthdayMode ? this.birthdayMusic : this.countdownMusic;
    },
    songTitle() {
      return this.isBirthdayMode ? "Congratulations" : "Happy Birthday";
    },
    songArtist() {
      return this.isBirthdayMode ? "Happy Birthday Mix" : "Birthday Song";
    }
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.audioPlayer.pause();
      } else {
        this.$refs.audioPlayer.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    onVolumeChange() {
      this.$refs.audioPlayer.volume = this.volume / 100;
    },
    onTimeUpdate() {
      this.currentTime = this.$refs.audioPlayer.currentTime;
    },
    onLoadedMetadata() {
      this.duration = this.$refs.audioPlayer.duration;
      this.$refs.audioPlayer.volume = this.volume / 100;
    },
    onEnded() {
      this.isPlaying = false;
    },
  },
  mounted() {
    // Try to load the audio file
    this.$refs.audioPlayer.load();
  },
  watch: {
    isBirthdayMode(newValue) {
      // When switching to birthday mode, reload audio and play
      this.$refs.audioPlayer.load();
      if (newValue && !this.isPlaying) {
        // Automatically play music when birthday mode activates
        setTimeout(() => {
          this.$refs.audioPlayer.play();
          this.isPlaying = true;
        }, 1000); // Short delay to ensure audio is loaded
      }
    }
  },
};
</script>

<style scoped>
.audio-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(10, 10, 32, 0.8);
  border: 1px solid rgba(0, 255, 204, 0.3);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 255, 204, 0.2);
  backdrop-filter: blur(5px);
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-custom {
  background-color: #00ffcc;
  color: #0a0a20;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-custom:hover {
  background-color: #ff3399;
  color: #ffffff;
  transform: scale(1.1);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
}

.volume-slider {
  width: 100px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background-clip: none;
  background: #00ffcc;
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #ff3399;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.song-info {
  display: flex;
  flex-direction: column;
  color: var(--text-color);
  font-size: 0.8rem;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-title {
  font-weight: bold;
  color: #00ffcc;
}

.song-artist {
  font-size: 0.7rem;
  opacity: 0.8;
}
</style>
