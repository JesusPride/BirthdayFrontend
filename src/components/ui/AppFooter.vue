<template>
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>Celebrate</h3>
          <p>Make every birthday special with personalized celebration pages that connect you with loved ones.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="footer-section">
          <h3>Links</h3>
          <ul class="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#example">Example</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <ul class="footer-links">
            <li><i class="fas fa-envelope"></i> support@celebrate.com</li>
            <li><i class="fas fa-phone"></i> (123) 456-7890</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Celebrate. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter'
  }
  </script>
  
  <style scoped>
  footer {
    background-color: #1a1a1a;
    color: white;
    padding: 3rem 5%;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: left;
  }
  
  .footer-section {
    width: 30%;
    margin-bottom: 2rem;
  }
  
  .footer-section h3 {
    margin-bottom: 1.5rem;
    color: #FFC6D3;
  }
  
  .footer-links {
    list-style: none;
    padding-left: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.5rem;
    color: white;
  }
  
  .footer-links a {
    color: #ddd;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-links a:hover {
    color: var(--landing-primary-color);
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .social-links a {
    color: white;
    background-color: rgba(255,255,255,0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
  }
  
  .social-links a:hover {
    background-color: var(--landing-primary-color);
    transform: translateY(-3px);
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    margin-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    color: white;
  }
  
  @media (max-width: 768px) {
    .footer-section {
      width: 100%;
    }
  }
  </style>