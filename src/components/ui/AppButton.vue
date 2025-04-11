<template>
    <button 
      :class="['btn', variant === 'primary' ? 'btn-primary' : 'btn-outline']" 
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'AppButton',
    props: {
      variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'outline'].includes(value)
      }
    }
  }
  </script>
  
  <style scoped>
  .btn {
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
    border: none;
    font-size: 1rem;
  }
  
  .btn-primary {
    background-color: var(--landing-primary-color);
    color: white;
  }
  
  .btn-primary:hover {
    background-color: var(--landing-secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(123, 44, 191, 0.3);
  }
  
  .btn-outline {
    background-color: transparent;
    color: var(--landing-primary-color);
    border: 2px solid var(--landing-primary-color);
  }
  
  .btn-outline:hover {
    background-color: var(--landing-primary-color);
    color: white;
  }
  </style>