<template>
    <div class="modal" :class="{ active: isActive }">
      <div class="modal-content">
        <span class="close-modal" @click="closeModal">&times;</span>
        
        <div class="modal-tabs">
          <div 
            class="modal-tab" 
            :class="{ active: activeTab === 'login' }" 
            @click="activeTab = 'login'"
          >
            Log In
          </div>
          <div 
            class="modal-tab" 
            :class="{ active: activeTab === 'signup' }" 
            @click="activeTab = 'signup'"
          >
            Sign Up
          </div>
        </div>
        
        <form 
          class="modal-form" 
          :class="{ active: activeTab === 'login' }" 
          id="login-form"
          @submit.prevent="handleLoginSubmit"
        >
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" v-model="loginForm.email" required>
            <span class="error-message" v-if="loginErrors.email">{{ loginErrors.email }}</span>
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <div class="password-input">
              <input 
                :type="showLoginPassword ? 'text' : 'password'" 
                id="login-password" 
                v-model="loginForm.password" 
                required
              >
              <i 
                :class="showLoginPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click="showLoginPassword = !showLoginPassword"
                class="password-toggle"
              ></i>
            </div>
            <span class="error-message" v-if="loginErrors.password">{{ loginErrors.password }}</span>
          </div>
          <app-button type="submit" variant="primary" style="width: 100%;">Log In</app-button>
          <div class="form-footer">
            <p>Don't have an account? <a href="#" @click.prevent="activeTab = 'signup'">Sign up</a></p>
          </div>
          <div class="success-message" :class="{ show: loginSuccess }">Successfully logged in!</div>
        </form>
        
        <form 
          class="modal-form" 
          :class="{ active: activeTab === 'signup' }" 
          id="signup-form"
          @submit.prevent="handleSignupSubmit"
        >
          <div class="form-group">
            <label for="signup-name">Full Name</label>
            <input type="text" id="signup-name" v-model="signupForm.name" required>
            <span class="error-message" v-if="signupErrors.name">{{ signupErrors.name }}</span>
          </div>
          <div class="form-group">
            <label for="signup-email">Email</label>
            <input type="email" id="signup-email" v-model="signupForm.email" required>
            <span class="error-message" v-if="signupErrors.email">{{ signupErrors.email }}</span>
          </div>
          <div class="form-group">
            <label for="signup-password">Password</label>
            <div class="password-input">
              <input 
                :type="showSignupPassword ? 'text' : 'password'" 
                id="signup-password" 
                v-model="signupForm.password" 
                required
              >
              <i 
                :class="showSignupPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click="showSignupPassword = !showSignupPassword"
                class="password-toggle"
              ></i>
            </div>
            <span class="error-message" v-if="signupErrors.password">{{ signupErrors.password }}</span>
          </div>
          <div class="form-group">
            <label for="birthday-date">Your Birthday</label>
            <input type="date" id="birthday-date" v-model="signupForm.birthday" required>
            <span class="error-message" v-if="signupErrors.birthday">{{ signupErrors.birthday }}</span>
          </div>
          <app-button type="submit" variant="primary" style="width: 100%;">Sign Up</app-button>
          <div class="form-footer">
            <p>Already have an account? <a href="#" @click.prevent="activeTab = 'login'">Log in</a></p>
          </div>
          <div class="success-message" :class="{ show: signupSuccess }">Account created successfully!</div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import AppButton from './Appbutton.vue';
  import { api } from '../../services/api';
  
  export default {
    name: 'AppModal',
    components: {
      AppButton
    },
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      initialTab: {
        type: String,
        default: 'login'
      }
    },
    data() {
      return {
        activeTab: this.initialTab,
        loginForm: {
          email: '',
          password: ''
        },
        signupForm: {
          name: '',
          email: '',
          password: '',
          birthday: ''
        },
        loginSuccess: false,
        signupSuccess: false,
        loginErrors: {
          email: '',
          password: ''
        },
        signupErrors: {
          name: '',
          email: '',
          password: '',
          birthday: ''
        },
        showLoginPassword: false,
        showSignupPassword: false
      };
    },
    watch: {
      initialTab(newVal) {
        this.activeTab = newVal;
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      },
      validatePassword(password) {
        // Password must be at least 8 characters long and contain at least one number and one letter
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
      },
      validateLoginForm() {
        let isValid = true;
        this.loginErrors = { email: '', password: '' };

        if (!this.loginForm.email) {
          this.loginErrors.email = 'Email is required';
          isValid = false;
        } else if (!this.validateEmail(this.loginForm.email)) {
          this.loginErrors.email = 'Please enter a valid email';
          isValid = false;
        }

        if (!this.loginForm.password) {
          this.loginErrors.password = 'Password is required';
          isValid = false;
        }

        return isValid;
      },
      validateSignupForm() {
        let isValid = true;
        this.signupErrors = { name: '', email: '', password: '', birthday: '' };

        if (!this.signupForm.name) {
          this.signupErrors.name = 'Name is required';
          isValid = false;
        }

        if (!this.signupForm.email) {
          this.signupErrors.email = 'Email is required';
          isValid = false;
        } else if (!this.validateEmail(this.signupForm.email)) {
          this.signupErrors.email = 'Please enter a valid email';
          isValid = false;
        }

        if (!this.signupForm.password) {
          this.signupErrors.password = 'Password is required';
          isValid = false;
        } else if (!this.validatePassword(this.signupForm.password)) {
          this.signupErrors.password = 'Password must be at least 8 characters long and contain at least one number and one letter';
          isValid = false;
        }

        if (!this.signupForm.birthday) {
          this.signupErrors.birthday = 'Birthday is required';
          isValid = false;
        }

        return isValid;
      },
      async handleLoginSubmit() {
        if (this.validateLoginForm()) {
          try {
            const response = await api.loginAdmin({
              email: this.loginForm.email,
              password: this.loginForm.password
            });

            if (response.status === 'success') {
              localStorage.setItem('isAuthenticated', 'true');
              localStorage.setItem('currentUser', JSON.stringify(response.data.admin));
              localStorage.setItem('uniqueRoute', response.data.unique_route);
              
              this.loginSuccess = true;
              setTimeout(() => {
                this.loginSuccess = false;
                this.$router.push('/dashboard');
                this.closeModal();
              }, 1500);
            } else {
              this.loginErrors.email = 'Invalid email or password';
              this.loginErrors.password = 'Invalid email or password';
            }
          } catch (error) {
            this.loginErrors.email = 'An error occurred. Please try again.';
            this.loginErrors.password = 'An error occurred. Please try again.';
          }
        }
      },
      async handleSignupSubmit() {
        if (this.validateSignupForm()) {
          try {
            const response = await api.registerAdmin({
              name: this.signupForm.name,
              email: this.signupForm.email,
              password: this.signupForm.password
            });

            if (response.status === 'success') {
              // Save birthday date to localStorage
              localStorage.setItem('birthdayDate', this.signupForm.birthday);
              // Save name to localStorage
              localStorage.setItem('userName', this.signupForm.name);
              
              this.signupSuccess = true;
              setTimeout(() => {
                this.signupSuccess = false;
                this.activeTab = 'login';
                // Pre-fill login form with registered email
                this.loginForm.email = this.signupForm.email;
                // Clear signup form
                this.signupForm = {
                  name: '',
                  email: '',
                  password: '',
                  birthday: ''
                };
              }, 1500);
            } else {
              this.signupErrors.email = 'Registration failed. Please try again.';
            }
          } catch (error) {
            this.signupErrors.email = 'An error occurred. Please try again.';
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    position: relative;
  }
  
  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: #777;
  }
  
  .close-modal:hover {
    color: var(--dark-color);
  }
  
  .modal-tabs {
    display: flex;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .modal-tab {
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    color: #333;
  }
  
  .modal-tab.active {
    color: var(--landing-primary-color);
    border-bottom: 2px solid var(--landing-primary-color);
  }
  
  .modal-form {
    display: none;
  }
  
  .modal-form.active {
    display: block;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-align: left;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: var(--landing-font-main);
  }
  
  .form-footer {
    margin-top: 1.5rem;
    text-align: center;
    color: #333;
  }
  
  .form-footer a {
    color: var(--landing-primary-color);
    text-decoration: none;
  }
  
  .success-message {
    color: var(--landing-success-color);
    text-align: center;
    margin-top: 1rem;
    display: none;
  }
  
  .success-message.show {
    display: block;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  .form-group input:focus {
    border-color: var(--landing-primary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(var(--landing-primary-color), 0.2);
  }
  
  .form-group input.error {
    border-color: #dc3545;
  }
  
  .password-input {
    position: relative;
  }
  
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
    transition: color 0.3s;
  }
  
  .password-toggle:hover {
    color: var(--landing-primary-color);
  }
  
  .form-group input {
    padding-right: 35px;
  }
  </style>