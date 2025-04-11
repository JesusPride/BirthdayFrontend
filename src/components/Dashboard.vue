<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">Celebrate<span>.</span></div>
        <div class="user-info">
          <div class="user-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="user-name">{{ currentUser?.name || "User" }}</div>
        </div>
      </div>
      <div class="sidebar-menu">
        <a
          href="#"
          class="menu-item"
          :class="{ active: activeSection === 'dashboard' }"
          @click="activeSection = 'dashboard'"
        >
          <i class="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
        <a
          href="#"
          class="menu-item"
          :class="{ active: activeSection === 'wishes' }"
          @click="activeSection = 'wishes'"
        >
          <i class="fas fa-comment-dots"></i>
          <span>Wishes</span>
        </a>
        <a
          href="#"
          class="menu-item"
          :class="{ active: activeSection === 'photos' }"
          @click="activeSection = 'photos'"
        >
          <i class="fas fa-image"></i>
          <span>Photos</span>
        </a>
        <a
          href="#"
          class="menu-item"
          :class="{ active: activeSection === 'settings' }"
          @click="activeSection = 'settings'"
        >
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </a>
        <a href="#" class="menu-item" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Dashboard Section -->
      <div v-if="activeSection === 'dashboard'" class="dashboard-section">
        <div class="dashboard-header">
          <h1 class="page-title">My Birthday Dashboard</h1>
          <button class="btn btn-primary" @click="saveAllChanges">
            Save All Changes
          </button>
        </div>

        <!-- Dashboard Metrics -->
        <div class="dashboard-metrics">
          <div class="metric-card">
            <div class="metric-label">Days Until Birthday</div>
            <div class="metric-value">{{ daysUntilBirthday }}</div>
            <div>{{ formattedBirthdayDate }}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Birthday Wishes</div>
            <div class="metric-value">{{ totalWishes }}</div>
            <div>From friends & family</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Page Views</div>
            <div class="metric-value">{{ pageViews }}</div>
            <div>Last 30 days</div>
          </div>
        </div>

        <!-- Birthday Configuration Section -->
        <div class="section-header">
          <h2 class="section-title">Birthday Page Configuration</h2>
          <button class="btn btn-secondary" @click="previewBirthdayPage">
            Preview Birthday Page
          </button>
        </div>

        <div class="config-panels">
          <!-- Main Configuration Panel -->
          <div class="panel">
            <form @submit.prevent="saveConfig">
              <div class="form-row">
                <div class="form-group">
                  <label for="full-name">Your Name</label>
                  <input
                    type="text"
                    id="full-name"
                    v-model="config.name"
                    readonly
                  />
                </div>
                <div class="form-group">
                  <label for="birthday-date">Birthday Date</label>
                  <input
                    type="date"
                    id="birthday-date"
                    v-model="config.birthdayDate"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="birthday-message">Birthday Message</label>
                <textarea
                  id="birthday-message"
                  v-model="config.message"
                  rows="3"
                  placeholder="Custom message to display on your birthday page"
                ></textarea>
              </div>

              <h3 style="margin: 1.5rem 0 1rem 0">Photo Gallery</h3>
              <p>Add photos to your birthday carousel (up to 5)</p>

              <div class="photo-upload">
                <div
                  v-for="(photo, index) in config.photos"
                  :key="index"
                  class="photo-item"
                >
                  <img :src="photo" alt="Birthday photo" />
                  <div class="photo-remove" @click="removePhoto(index)">
                    <i class="fas fa-times"></i>
                  </div>
                </div>
                <div
                  v-if="config.photos.length < 5"
                  class="photo-upload-btn"
                  @click="addPhoto"
                >
                  <i class="fas fa-plus"></i>
                  <span>Add Photo</span>
                </div>
              </div>

              <h3 style="margin: 1.5rem 0 1rem 0">Birthday Music</h3>
              <div class="form-group">
                <label for="music-option">Choose Birthday Music</label>
                <select id="music-option" v-model="config.music">
                  <option value="happy-birthday">
                    Happy Birthday Song (Traditional)
                  </option>
                  <option value="birthday-pop">Birthday Pop Remix</option>
                  <option value="celebration">
                    Celebration - Kool & The Gang
                  </option>
                  <option value="none">No Music</option>
                </select>
              </div>
            </form>
          </div>

          <!-- Share Panel -->
          <div class="panel">
            <h3>Share Your Birthday Page</h3>
            <p style="margin-top: 0.5rem">
              Generate a link to share with friends and family
            </p>

            <div class="share-link">
              <input
                type="text"
                class="link-input"
                :value="shareLink"
                readonly
              />
              <button class="copy-btn" @click="copyLink">
                <i class="fas fa-copy"></i>
              </button>
            </div>

            <p style="margin-top: 1rem">Or share directly to:</p>
            <div class="share-options">
              <div class="share-option share-facebook" @click="shareToFacebook">
                <i class="fab fa-facebook-f"></i>
              </div>
              <div class="share-option share-twitter" @click="shareToTwitter">
                <i class="fab fa-twitter"></i>
              </div>
              <div class="share-option share-whatsapp" @click="shareToWhatsApp">
                <i class="fab fa-whatsapp"></i>
              </div>
              <div class="share-option share-email" @click="shareToEmail">
                <i class="fas fa-envelope"></i>
              </div>
            </div>

            <h3 style="margin-top: 2rem">Page Analytics</h3>
            <div
              style="
                background-color: var(--light-gray-color);
                height: 200px;
                border-radius: 5px;
                margin-top: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <span>Traffic chart will appear here</span>
            </div>
          </div>
        </div>

        <!-- Birthday Wishes Section -->
        <div class="wishes-section">
          <div class="section-header">
            <h2 class="section-title">Birthday Wishes</h2>
          </div>

          <div class="wishes-list">
            <div v-for="wish in wishes" :key="wish.id" class="wish-card">
              <div class="wish-header">
                <div class="wisher-name">
                  {{ wish.sender_name || wish.senderName || "Anonymous" }}
                </div>
                <div class="wish-date">
                  {{ formatDate(wish.created_at || wish.date) }}
                </div>
              </div>
              <div class="wish-message">
                {{ wish.message }}
              </div>
              <div class="wish-actions">
                <button @click="toggleFavorite(wish)">
                  <i
                    class="fas fa-heart"
                    :class="{ 'text-red': wish.isFavorite }"
                  ></i>
                  Favorite
                </button>
                <button @click="replyToWish(wish)">
                  <i class="fas fa-reply"></i> Reply
                </button>
                <button @click="deleteWish(wish)">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wishes Section -->
      <div v-if="activeSection === 'wishes'" class="wishes-section">
        <div class="section-header">
          <h2 class="section-title">Birthday Wishes</h2>
          <div class="wishes-stats">
            <span class="total-wishes">{{ totalWishes }} Wishes</span>
          </div>
        </div>

        <div class="wishes-filters">
          <div class="filter-group">
            <button
              class="filter-btn"
              :class="{ active: filter === 'all' }"
              @click="filter = 'all'"
            >
              All
            </button>
            <button
              class="filter-btn"
              :class="{ active: filter === 'favorites' }"
              @click="filter = 'favorites'"
            >
              Favorites
            </button>
          </div>
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search wishes..."
              class="search-input"
            />
            <i class="fas fa-search"></i>
          </div>
        </div>

        <div class="wishes-list">
          <div v-if="filteredWishes.length === 0" class="empty-wishes">
            <i class="fas fa-comment-slash"></i>
            <p>No wishes found</p>
          </div>
          <div v-for="wish in filteredWishes" :key="wish.id" class="wish-card">
            <div class="wish-header">
              <div class="wisher-info">
                <div class="wisher-name">{{ wish.senderName }}</div>
                <div class="wish-date">{{ formatDate(wish.date) }}</div>
              </div>
              <div class="wish-actions">
                <button
                  class="action-btn"
                  @click="toggleFavorite(wish)"
                  :class="{ active: wish.isFavorite }"
                >
                  <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn" @click="deleteWish(wish)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div class="wish-message">
              {{ wish.message }}
            </div>
          </div>
        </div>
      </div>

      <!-- Photos Section -->
      <div v-if="activeSection === 'photos'" class="photos-section">
        <div class="section-header">
          <h2 class="section-title">Photo Gallery</h2>
          <button
            class="btn btn-primary"
            @click="addPhoto"
            v-if="config.photos.length < 5"
          >
            <i class="fas fa-plus"></i> Add Photo
          </button>
        </div>

        <div class="photos-grid">
          <div
            v-for="(photo, index) in config.photos"
            :key="index"
            class="photo-card"
          >
            <img
              :src="photo"
              :alt="'Photo ' + (index + 1)"
              class="photo-preview"
              @click="viewPhoto(photo)"
            />
            <div class="photo-actions">
              <button class="btn btn-danger" @click="removePhoto(index)">
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
          <div v-if="config.photos.length === 0" class="empty-photos">
            <i class="fas fa-images"></i>
            <p>No photos added yet</p>
            <button class="btn btn-primary" @click="addPhoto">
              <i class="fas fa-plus"></i> Add Your First Photo
            </button>
          </div>
        </div>
      </div>

      <!-- Settings Section -->
      <div v-if="activeSection === 'settings'" class="settings-section">
        <div class="section-header">
          <h2 class="section-title">Settings</h2>
        </div>

        <div class="settings-panels">
          <!-- Account Settings -->
          <div class="panel">
            <h3>Account Settings</h3>
            <div class="form-group">
              <label for="display-name">Display Name</label>
              <input
                type="text"
                id="display-name"
                v-model="currentUser.name"
                placeholder="Your display name"
              />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="currentUser.email"
                placeholder="Your email address"
                disabled
              />
              <small class="text-muted">Email cannot be changed</small>
            </div>
            <button class="btn btn-primary" @click="updateAccountSettings">
              Update Account
            </button>
          </div>

          <!-- Notification Settings -->
          <div class="panel">
            <h3>Notification Preferences</h3>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="settings.notifications.email" />
                Email notifications for new wishes
              </label>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="settings.notifications.favorites"
                />
                Notify when someone favorites your wishes
              </label>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="settings.notifications.replies"
                />
                Notify when someone replies to your wishes
              </label>
            </div>
            <button class="btn btn-primary" @click="updateNotificationSettings">
              Save Preferences
            </button>
          </div>

          <!-- Privacy Settings -->
          <div class="panel">
            <h3>Privacy Settings</h3>
            <div class="form-group">
              <label>Who can see your birthday page?</label>
              <select v-model="settings.privacy.visibility">
                <option value="public">Everyone (Public)</option>
                <option value="private">Only people with the link</option>
                <option value="restricted">Only approved users</option>
              </select>
            </div>
            <div class="form-group">
              <label>Who can leave wishes?</label>
              <select v-model="settings.privacy.wishes">
                <option value="everyone">Everyone</option>
                <option value="registered">Only registered users</option>
                <option value="approved">Only approved users</option>
              </select>
            </div>
            <button class="btn btn-primary" @click="updatePrivacySettings">
              Update Privacy
            </button>
          </div>

          <!-- Security Settings -->
          <div class="panel">
            <h3>Security</h3>
            <div class="form-group">
              <label for="current-password">Current Password</label>
              <input
                type="password"
                id="current-password"
                v-model="password.current"
                placeholder="Enter current password"
              />
            </div>
            <div class="form-group">
              <label for="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                v-model="password.new"
                placeholder="Enter new password"
              />
            </div>
            <div class="form-group">
              <label for="confirm-password">Confirm New Password</label>
              <input
                type="password"
                id="confirm-password"
                v-model="password.confirm"
                placeholder="Confirm new password"
              />
            </div>
            <button
              class="btn btn-primary"
              @click="updatePassword"
              :disabled="!isPasswordValid"
            >
              Change Password
            </button>
          </div>

          <!-- Danger Zone -->
          <div class="panel danger-zone">
            <h3>Danger Zone</h3>
            <div class="danger-actions">
              <div class="danger-action">
                <h4>Delete Account</h4>
                <p>Permanently delete your account and all associated data</p>
                <button class="btn btn-danger" @click="confirmDeleteAccount">
                  Delete Account
                </button>
              </div>
              <div class="danger-action">
                <h4>Delete All Wishes</h4>
                <p>Remove all wishes from your birthday page</p>
                <button class="btn btn-danger" @click="confirmDeleteWishes">
                  Delete All Wishes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <div class="toast" :class="{ active: showToast }">{{ toastMessage }}</div>

  <!-- Image Viewer Modal -->
  <div
    class="image-viewer-modal"
    v-if="selectedPhoto"
    @click="closeImageViewer"
  >
    <div class="modal-content" @click.stop>
      <button class="close-modal" @click="closeImageViewer">
        <i class="fas fa-times"></i>
      </button>
      <img :src="selectedPhoto" alt="Selected photo" class="modal-image" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "../services/api";

export default {
  name: "Dashboard",
  setup() {
    const router = useRouter();
    const currentUser = ref(JSON.parse(localStorage.getItem("currentUser")));
    const uniqueRoute = ref(localStorage.getItem("uniqueRoute"));
    const showToast = ref(false);
    const toastMessage = ref("");
    const wishes = ref([]);
    const pageViews = ref(0);
    const activeSection = ref("dashboard");
    const filter = ref("all");
    const searchQuery = ref("");

    const config = ref({
      name: localStorage.getItem("userName") || currentUser.value?.name || "",
      birthdayDate: localStorage.getItem("birthdayDate") || "",
      message: "",
      theme: "light",
      primaryColor: "#FF4D6D",
      secondaryColor: "#7B2CBF",
      photos: [],
      music: "happy-birthday",
    });

    const settings = ref({
      notifications: {
        email: true,
        favorites: true,
        replies: true,
      },
      privacy: {
        visibility: "public",
        wishes: "everyone",
      },
    });

    const password = ref({
      current: "",
      new: "",
      confirm: "",
    });

    const isPasswordValid = computed(() => {
      return (
        password.value.new &&
        password.value.new === password.value.confirm &&
        password.value.new.length >= 8
      );
    });

    const daysUntilBirthday = computed(() => {
      if (!config.value.birthdayDate) return 0;
      const today = new Date();
      const birthday = new Date(config.value.birthdayDate);
      const diffTime = birthday - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    });

    const formattedBirthdayDate = computed(() => {
      if (!config.value.birthdayDate) return "";
      return new Date(config.value.birthdayDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    });

    const totalWishes = computed(() => wishes.value.length);
    const shareLink = computed(
      () => `${window.location.origin}/birthday/${uniqueRoute.value}`
    );
    const backendApiEndpoint = computed(
      () => `https://birthday-db.onrender.com/api/wishes/${uniqueRoute.value}`
    );

    const showNotification = (message) => {
      toastMessage.value = message;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    const loadSavedPhotos = () => {
      const savedPhotos = localStorage.getItem(`photos_${uniqueRoute.value}`);
      if (savedPhotos) {
        try {
          const parsedPhotos = JSON.parse(savedPhotos);
          if (Array.isArray(parsedPhotos)) {
            config.value.photos = parsedPhotos;
          }
        } catch (error) {
          console.error("Error loading saved photos:", error);
          config.value.photos = [];
        }
      }
    };

    const addPhoto = () => {
      if (config.value.photos.length >= 5) {
        showNotification("Maximum 5 photos allowed");
        return;
      }

      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            config.value.photos.push(e.target.result);
            // Save photos to localStorage immediately after adding
            localStorage.setItem(
              `photos_${uniqueRoute.value}`,
              JSON.stringify(config.value.photos)
            );
            showNotification("Photo added successfully!");
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    };

    const removePhoto = (index) => {
      config.value.photos.splice(index, 1);
      // Update localStorage immediately after removing
      localStorage.setItem(
        `photos_${uniqueRoute.value}`,
        JSON.stringify(config.value.photos)
      );
      showNotification("Photo removed successfully!");
    };

    const saveAllChanges = async () => {
      try {
        // Save configuration to localStorage
        localStorage.setItem("birthdayDate", config.value.birthdayDate);
        localStorage.setItem("userName", config.value.name);
        localStorage.setItem(
          `photos_${uniqueRoute.value}`,
          JSON.stringify(config.value.photos)
        );

        // Save configuration to API
        const response = await api.updateConfig(uniqueRoute.value, {
          name: config.value.name,
          birthdayDate: config.value.birthdayDate,
          message: config.value.message,
          photos: config.value.photos,
          music: config.value.music,
        });

        if (response && response.status === "success") {
          showNotification("All changes saved successfully!");
        } else {
          showNotification("Changes saved successfully!");
        }
      } catch (error) {
        console.error("Error saving changes:", error);
        showNotification("Error saving changes. Please try again.");
      }
    };

    const previewBirthdayPage = () => {
      router.push("/birthday");
    };

    const copyLink = () => {
      navigator.clipboard.writeText(shareLink.value);
      showNotification("Link copied to clipboard!");
    };

    const handleLogout = () => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("uniqueRoute");
      router.push("/");
    };

    const formatDate = (date) => {
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
    };

    const toggleFavorite = async (wish) => {
      try {
        await api.toggleFavorite(uniqueRoute.value, wish.id);
        wish.isFavorite = !wish.isFavorite;
        showNotification(
          wish.isFavorite ? "Added to favorites" : "Removed from favorites"
        );
      } catch (error) {
        showNotification("Failed to update favorite status");
      }
    };

    const replyToWish = (wish) => {
      // Implement reply functionality
    };

    const deleteWish = async (wish) => {
      if (confirm("Are you sure you want to delete this wish?")) {
        try {
          await api.deleteWish(uniqueRoute.value, wish.id);
          wishes.value = wishes.value.filter((w) => w.id !== wish.id);
          showNotification("Wish deleted successfully");
        } catch (error) {
          showNotification("Failed to delete wish");
        }
      }
    };

    const shareToFacebook = () => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareLink.value
        )}`,
        "_blank"
      );
    };

    const shareToTwitter = () => {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareLink.value
        )}`,
        "_blank"
      );
    };

    const shareToWhatsApp = () => {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(shareLink.value)}`,
        "_blank"
      );
    };

    const shareToEmail = () => {
      window.location.href = `mailto:?subject=My Birthday Page&body=Check out my birthday page: ${shareLink.value}`;
    };

    const filteredWishes = computed(() => {
      let filtered = wishes.value;

      // Apply filter
      if (filter.value === "favorites") {
        filtered = filtered.filter((wish) => wish.isFavorite);
      }

      // Apply search
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (wish) =>
            wish.senderName.toLowerCase().includes(query) ||
            wish.message.toLowerCase().includes(query)
        );
      }

      return filtered;
    });

    const fetchWishes = async () => {
      try {
        const response = await api.getWishes(uniqueRoute.value);
        wishes.value = response.data;
        console.log(wishes.value);
      } catch (error) {
        showNotification("Failed to fetch wishes");
      }
    };

    const updateAccountSettings = async () => {
      try {
        await api.updateUser(currentUser.value.id, {
          name: currentUser.value.name,
        });
        showNotification("Account updated successfully");
      } catch (error) {
        showNotification("Failed to update account");
      }
    };

    const updateNotificationSettings = async () => {
      try {
        await api.updateSettings(uniqueRoute.value, {
          notifications: settings.value.notifications,
        });
        showNotification("Notification preferences saved");
      } catch (error) {
        showNotification("Failed to update notification settings");
      }
    };

    const updatePrivacySettings = async () => {
      try {
        await api.updateSettings(uniqueRoute.value, {
          privacy: settings.value.privacy,
        });
        showNotification("Privacy settings updated");
      } catch (error) {
        showNotification("Failed to update privacy settings");
      }
    };

    const updatePassword = async () => {
      if (!isPasswordValid.value) return;

      try {
        await api.updatePassword(currentUser.value.id, {
          currentPassword: password.value.current,
          newPassword: password.value.new,
        });
        showNotification("Password updated successfully");
        password.value = { current: "", new: "", confirm: "" };
      } catch (error) {
        showNotification("Failed to update password");
      }
    };

    const confirmDeleteAccount = () => {
      if (
        confirm(
          "Are you sure you want to delete your account? This action cannot be undone."
        )
      ) {
        deleteAccount();
      }
    };

    const deleteAccount = async () => {
      try {
        await api.deleteAccount(currentUser.value.id);
        handleLogout();
      } catch (error) {
        showNotification("Failed to delete account");
      }
    };

    const confirmDeleteWishes = () => {
      if (
        confirm(
          "Are you sure you want to delete all wishes? This action cannot be undone."
        )
      ) {
        deleteAllWishes();
      }
    };

    const deleteAllWishes = async () => {
      try {
        await api.deleteAllWishes(uniqueRoute.value);
        wishes.value = [];
        showNotification("All wishes deleted successfully");
      } catch (error) {
        showNotification("Failed to delete wishes");
      }
    };

    const selectedPhoto = ref(null);

    const viewPhoto = (photo) => {
      selectedPhoto.value = photo;
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    };

    const closeImageViewer = () => {
      selectedPhoto.value = null;
      document.body.style.overflow = ""; // Restore scrolling
    };

    onMounted(async () => {
      if (!currentUser.value || !uniqueRoute.value) {
        router.push("/");
        return;
      }
      await fetchWishes();
      loadSavedPhotos(); // Load saved photos
    });

    return {
      currentUser,
      config,
      daysUntilBirthday,
      formattedBirthdayDate,
      totalWishes,
      pageViews,
      wishes,
      shareLink,
      showToast,
      toastMessage,
      saveAllChanges,
      previewBirthdayPage,
      copyLink,
      addPhoto,
      removePhoto,
      handleLogout,
      formatDate,
      toggleFavorite,
      replyToWish,
      deleteWish,
      shareToFacebook,
      shareToTwitter,
      shareToWhatsApp,
      shareToEmail,
      activeSection,
      filter,
      searchQuery,
      filteredWishes,
      fetchWishes,
      settings,
      password,
      isPasswordValid,
      updateAccountSettings,
      updateNotificationSettings,
      updatePrivacySettings,
      updatePassword,
      confirmDeleteAccount,
      confirmDeleteWishes,
      selectedPhoto,
      viewPhoto,
      closeImageViewer,
    };
  },
};
</script>

<style>
:root {
  --primary-color: #ff4d6d;
  --secondary-color: #7b2cbf;
  --accent-color: #ffc6d3;
  --dark-color: #1e1e24;
  --light-color: #f5f5f5;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --danger-color: #f44336;
  --gray-color: #888;
  --light-gray-color: #eee;
  --font-main: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-main);
  line-height: 1.6;
  color: var(--dark-color);
  background-color: var(--light-color);
  margin: 0;
  padding: 0;
}

.dashboard .container-fluid,
.dashboard {
  padding: 0;
  margin: 0;
  max-width: none;
}

.dashboard {
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
}

.sidebar {
  width: 250px;
  background-color: var(--dark-color);
  color: white;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 0.25rem;
}

.sidebar-header {
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.sidebar-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.75rem;
}

.user-name {
  font-weight: 500;
}

.sidebar-menu {
  margin-top: 1.5rem;
}

.menu-item {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  color: #ddd;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.menu-item.active {
  background-color: rgba(255, 77, 109, 0.2);
  color: var(--primary-color);
  border-left: 3px solid var(--primary-color);
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.menu-item i {
  margin-right: 0.75rem;
  width: 20px;
  text-align: center;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 1.75rem;
}

.dashboard-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: var(--primary-color);
}

.metric-label {
  color: var(--gray-color);
  font-weight: 500;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.config-panels {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.panel {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light-gray-color);
  border-radius: 5px;
  font-family: var(--font-main);
}

input[type="color"] {
  height: 40px;
  padding: 2px;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #ff3057;
}

.btn-secondary {
  background-color: var(--light-gray-color);
  color: var(--dark-color);
}

.btn-secondary:hover {
  background-color: #ddd;
}

.photo-upload {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.photo-item {
  position: relative;
  height: 150px;
  background-color: var(--light-gray-color);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-item .photo-remove {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.photo-item:hover .photo-remove {
  opacity: 1;
}

.photo-upload-btn {
  height: 150px;
  background-color: var(--light-gray-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px dashed #ccc;
  transition: all 0.3s;
}

.photo-upload-btn:hover {
  background-color: #e0e0e0;
}

.photo-upload-btn i {
  font-size: 2rem;
  color: var(--gray-color);
  margin-bottom: 0.5rem;
}

.share-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.link-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--light-gray-color);
  border-radius: 5px 0 0 5px;
  font-family: var(--font-main);
  background-color: #f8f8f8;
  cursor: text;
}

.copy-btn {
  background-color: var(--secondary-color);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.copy-btn:hover {
  background-color: #6a1ba9;
}

.share-options {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.share-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: transform 0.3s;
}

.share-option:hover {
  transform: translateY(-3px);
}

.share-facebook {
  background-color: #3b5998;
}

.share-twitter {
  background-color: #1da1f2;
}

.share-whatsapp {
  background-color: #25d366;
}

.share-email {
  background-color: #dd4b39;
}

.wishes-section {
  padding: 0;
}

.wishes-list {
  margin-top: 1rem;
}

.wish-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}

.wish-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.wisher-name {
  font-weight: 600;
}

.wish-date {
  color: var(--gray-color);
  font-size: 0.9rem;
}

.wish-message {
  margin-top: 0.5rem;
}

.wish-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.wish-actions button {
  background-color: transparent;
  border: none;
  color: var(--gray-color);
  cursor: pointer;
  transition: color 0.3s;
}

.wish-actions button:hover {
  color: var(--dark-color);
}

.text-red {
  color: var(--primary-color);
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--success-color);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  display: none;
  z-index: 1000;
}

.toast.active {
  display: block;
  animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.theme-preview {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.theme-option {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 2px solid transparent;
}

.theme-option.active {
  border-color: var(--primary-color);
}

.theme-header {
  height: 30px;
}

.theme-body {
  flex: 1;
}

.light-theme .theme-header {
  background-color: var(--primary-color);
}

.light-theme .theme-body {
  background-color: var(--light-color);
}

.dark-theme .theme-header {
  background-color: var(--secondary-color);
}

.dark-theme .theme-body {
  background-color: var(--dark-color);
}

.custom-theme .theme-header {
  background-color: v-bind("config.primaryColor");
}

.custom-theme .theme-body {
  background-color: v-bind("config.secondaryColor");
}

@media (max-width: 1024px) {
  .config-panels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
  }

  .main-content {
    margin-left: 0;
  }

  .dashboard-metrics {
    grid-template-columns: 1fr;
  }

  .photo-upload {
    grid-template-columns: repeat(2, 1fr);
  }
}

.photos-section {
  padding: 0;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.photo-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.photo-preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-actions {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
}

.empty-photos {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.empty-photos i {
  font-size: 3rem;
  color: var(--gray-color);
  margin-bottom: 1rem;
}

.empty-photos p {
  color: var(--gray-color);
  margin-bottom: 1.5rem;
}

.btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.btn-danger:hover {
  background-color: #d32f2f;
}

.wishes-stats {
  color: var(--gray-color);
  font-size: 0.9rem;
}

.wishes-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
}

.filter-group {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--light-gray-color);
  border-radius: 5px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.search-box {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid var(--light-gray-color);
  border-radius: 5px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-color);
}

.wish-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.wish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.wisher-info {
  flex: 1;
}

.wisher-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.wish-date {
  color: var(--gray-color);
  font-size: 0.9rem;
}

.wish-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--light-gray-color);
  color: var(--gray-color);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--primary-color);
  color: white;
}

.action-btn.active {
  background: var(--primary-color);
  color: white;
}

.wish-message {
  color: var(--dark-color);
  line-height: 1.6;
}

.empty-wishes {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.empty-wishes i {
  font-size: 3rem;
  color: var(--gray-color);
  margin-bottom: 1rem;
}

.empty-wishes p {
  color: var(--gray-color);
}

.settings-section {
  padding: 0;
}

.settings-panels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.text-muted {
  color: var(--gray-color);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.danger-zone {
  grid-column: 1 / -1;
  border: 1px solid var(--danger-color);
}

.danger-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}

.danger-action {
  padding: 1rem;
  background-color: rgba(244, 67, 54, 0.05);
  border-radius: 5px;
}

.danger-action h4 {
  color: var(--danger-color);
  margin-bottom: 0.5rem;
}

.danger-action p {
  color: var(--gray-color);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .settings-panels {
    grid-template-columns: 1fr;
  }

  .danger-actions {
    grid-template-columns: 1fr;
  }
}

/* Image Viewer Modal Styles */
.image-viewer-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
}

.close-modal {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.photo-preview {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.photo-preview:hover {
  transform: scale(1.02);
}

.dashboard-section {
  padding: 0;
}
</style>
