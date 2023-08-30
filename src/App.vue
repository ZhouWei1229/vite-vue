<template>
  <nav class="navbar">
    <div class="navbar-logo">hello-world</div>
    <ul class="navbar-links">
      <li><router-link to="/">Q1</router-link></li>
      <li><router-link to="/q2">Q2</router-link></li>
      <li><router-link to="/q3">Q3</router-link></li>
      <li><router-link to="/q4">Q4</router-link></li>
    </ul>
  </nav>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(140deg, #f6d365 10%, #fda085 95%)
}

.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(10deg, #f6d365, #f6c665, #fda085);
  padding: 10px 20px;
  color: white;
}

.navbar:before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 20px;
  background: linear-gradient(transparent, rgba(246, 211, 101, 0.8));
  pointer-events: none;
  z-index: -1;
}

.navbar-logo {
  font-size: 24px;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar-links li {
  padding: 5px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}

.navbar-links a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #e76f51;
  bottom: -4px;
  left: 0;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.navbar-links a:hover {
  color: #e76f51;
}

.navbar-links a:hover:before {
  transform: scaleX(1);
  transform-origin: left;
}
</style>
