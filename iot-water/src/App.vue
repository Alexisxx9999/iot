<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Asegurar que la aplicación siempre tenga una ruta válida
onMounted(() => {
  // Si estamos en la raíz, redirigir a la lista de medidores
  if (router.currentRoute.value.path === '/') {
    router.push('/medidores')
  }
})
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/medidores" class="nav-brand">
          <i class="fas fa-tint"></i>
          Sistema de Medidores IoT
        </router-link>
        <div class="nav-menu">
          <router-link to="/medidores" class="nav-link">
            <i class="fas fa-list"></i> Medidores
          </router-link>
          <router-link to="/medidores/crear" class="nav-link">
            <i class="fas fa-plus"></i> Crear
          </router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath" />
      </transition>
    </main>

    <footer class="footer">
      <p>&copy; 2024 Sistema de Medidores IoT. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #2c3e50;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-brand:hover {
  color: #f8f9fa;
}

.nav-menu {
  display: flex;
  gap: 15px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255,255,255,0.2);
  font-weight: 600;
}

.main-content {
  flex: 1;
  padding: 20px 0;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

/* Transiciones para las vistas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos globales para botones */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-menu {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 13px;
  }
}
</style>
