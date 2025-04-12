<template>
  <div class="wishes-section">
    <h3 class="mb-4">Leave a Birthday Wish for Esther</h3>
    <div class="mb-3">
      <input
        type="text"
        class="form-control message-input mb-2"
        v-model="newWish.name"
        placeholder="Your Name"
      />
      <textarea
        class="form-control message-input"
        v-model="newWish.message"
        rows="3"
        placeholder="Your Birthday Message"
      ></textarea>
    </div>
    <button
      class="btn btn-custom mb-4"
      @click="addWish"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? "Submitting..." : "Send Wish" }}
    </button>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import { api } from "../services/api";

export default {
  name: "BirthdayWish",
  props: {
    wishes: {
      type: Array,
      required: true,
    },
    uniqueRoute: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newWish: {
        name: "",
        message: "",
      },
      isSubmitting: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return "No date";
      try {
        return new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
      }
    },
    async addWish() {
      if (!this.newWish.message.trim()) return;

      this.isSubmitting = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const wishData = {
          name: this.newWish.name.trim() || "Anonymous",
          message: this.newWish.message.trim(),
        };

        const response = await api.submitWish(this.uniqueRoute, wishData);

        if (response && (response.status === "success" || response.success)) {
          this.wishes.unshift({
            name: wishData.name,
            message: wishData.message,
            date: new Date().toISOString(),
          });

          this.newWish.name = "";
          this.newWish.message = "";
          
          // Show success notification
          this.successMessage = "Your birthday wish has been sent successfully!";
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = "";
          }, 5000);

          this.$emit("add-wish", wishData);
        } else {
          this.errorMessage =
            response.message || "Failed to submit wish. Please try again.";
          console.error("Failed to submit wish:", response);
        }
      } catch (error) {
        if (error.message === "Failed to fetch") {
          this.errorMessage =
            "Unable to connect to the server. Please check your internet connection.";
        } else {
          this.errorMessage =
            error.message ||
            "An error occurred while submitting your wish. Please try again.";
        }
        console.error("Error submitting wish:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.wishes-section {
  max-width: 800px;
  margin: 2rem auto;
  padding: clamp(1rem, 5vw, 2rem);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  width: 90%;
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 1;
}

.message-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white !important;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.message-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
  opacity: 1;
}

.message-input:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #00ffcc;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 255, 204, 0.2);
}

.btn-custom {
  background-color: #00ffcc;
  color: #05051a;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
}

.btn-custom:hover, .btn-custom:active {
  background-color: #ff3399;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 51, 153, 0.4);
}

.alert-danger {
  background-color: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.2);
  color: #dc3545;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  text-align: center;
}

.alert-success {
  background-color: rgba(0, 255, 204, 0.1);
  border: 1px solid rgba(0, 255, 204, 0.2);
  color: #00ffcc;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  text-align: center;
  animation: fadeInOut 5s forwards;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

/* Tablet styles */
@media (max-width: 768px) {
  .wishes-section {
    margin: 1.5rem auto;
    padding: 1.5rem;
    width: 95%;
  }

  .message-input {
    padding: 0.6rem;
    font-size: 0.95rem;
  }

  .btn-custom {
    padding: 0.5rem 1.5rem;
    max-width: 180px;
  }
}

/* Mobile styles */
@media (max-width: 480px) {
  .wishes-section {
    width: 95%;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 8px;
  }

  .message-input {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .btn-custom {
    padding: 0.4rem 1.2rem;
    max-width: 160px;
    font-size: 0.9rem;
  }
  
  h3 {
    font-size: 1.2rem;
  }
}

/* Landscape mode on mobile */
@media (max-height: 480px) and (orientation: landscape) {
  .wishes-section {
    margin: 0.8rem auto;
    padding: 0.8rem;
  }
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem !important;
  }
  
  .mb-3, .mb-4 {
    margin-bottom: 0.5rem !important;
  }
  
  textarea.message-input {
    rows: 2;
  }
}
</style>