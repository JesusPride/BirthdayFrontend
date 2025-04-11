<template>
  <div class="dashboard">
    <nav class="dashboard-nav">
      <div class="logo">
        <h1>Admin Dashboard</h1>
      </div>
      <div class="nav-links">
        <router-link to="/dashboard" class="active">Overview</router-link>
        <router-link to="/dashboard/birthdays">Birthdays</router-link>
        <router-link to="/dashboard/users">Users</router-link>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </nav>

    <main class="dashboard-content">
      <div class="dashboard-header">
        <h2>Welcome to your Dashboard</h2>
        <p>Manage your birthday celebrations and user data from here.</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Birthdays</h3>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h3>Active Users</h3>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h3>Total Wishes</h3>
          <p class="stat-number">0</p>
        </div>
      </div>

      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          <p class="no-activity">No recent activity to show</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: var(--landing-light-color);
}

.dashboard-nav {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo h1 {
  font-size: 1.5rem;
  color: var(--landing-primary-color);
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--landing-dark-color);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-links a.active {
  background-color: var(--landing-primary-color);
  color: white;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #c82333;
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h2 {
  font-size: 2rem;
  color: var(--landing-dark-color);
  margin-bottom: 0.5rem;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-card h3 {
  color: var(--landing-dark-color);
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--landing-primary-color);
}

.recent-activity {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.recent-activity h3 {
  color: var(--landing-dark-color);
  margin-bottom: 1rem;
}

.no-activity {
  color: #666;
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .dashboard-nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
  }

  .nav-links a {
    width: 100%;
    text-align: center;
  }

  .dashboard-content {
    padding: 1rem;
  }
}
</style> 