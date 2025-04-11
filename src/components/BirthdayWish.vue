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
      {{ isSubmitting ? "Submitting..." : "Add Wish" }}
    </button>

    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>

    <div class="wishes-list">
      <div v-for="(wish, index) in wishes" :key="index" class="wish-card">
        <div class="wish-header">
          <div class="wisher-name">
            {{ wish.sender_name || wish.senderName || "Anonymous" }}
          </div>
          <div class="wish-date">
            {{ formatDate(wish.created_at || wish.date) }}
          </div>
        </div>
        <p>{{ wish.message }}</p>
      </div>
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
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
}

.message-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white !important;
}

.btn-custom {
  color: white;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 25px;
  cursor: pointer;
}

.wish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.wisher-name {
  font-weight: 600;
  color: #fff;
}

.wish-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.wish-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.wish-card p {
  margin: 0;
  color: #fff;
  line-height: 1.5;
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
</style>
