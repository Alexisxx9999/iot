<template>
  <div class="dashboard">
    <div class="header">
      <h1><i class="fas fa-chart-bar"></i> Dashboard</h1>
      <p class="subtitle">Resumen general del sistema de medidores</p>
    </div>

    <LoadingSpinner v-if="loading" message="Cargando estadísticas..." />

    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>

    <div v-else class="dashboard-content">
      <!-- Tarjetas de estadísticas -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-tint"></i>
          </div>
          <div class="stat-info">
            <h3>{{ stats.totalMedidores }}</h3>
            <p>Total Medidores</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon active">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-info">
            <h3>{{ stats.medidoresActivos }}</h3>
            <p>Medidores Activos</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon maintenance">
            <i class="fas fa-tools"></i>
          </div>
          <div class="stat-info">
            <h3>{{ stats.medidoresMantenimiento }}</h3>
            <p>En Mantenimiento</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon inactive">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="stat-info">
            <h3>{{ stats.medidoresInactivos }}</h3>
            <p>Medidores Inactivos</p>
          </div>
        </div>
      </div>

      <!-- Sección de consumo total -->
      <div class="consumption-section">
        <div class="section-header">
          <h3><i class="fas fa-chart-line"></i> Consumo Total</h3>
        </div>
        <div class="consumption-card">
          <div class="consumption-value">
            <span class="value">{{ stats.consumoTotal.toFixed(2) }}</span>
            <span class="unit">m³</span>
          </div>
          <p>Consumo total registrado en todos los medidores</p>
        </div>
      </div>

      <!-- Distribución por tipo -->
      <div class="distribution-section">
        <div class="section-header">
          <h3><i class="fas fa-pie-chart"></i> Distribución por Tipo</h3>
        </div>
        <div class="distribution-grid">
          <div class="distribution-card" v-for="tipo in stats.distribucionPorTipo" :key="tipo.nombre">
            <div class="distribution-header">
              <h4>{{ tipo.nombre }}</h4>
              <span class="percentage">{{ tipo.porcentaje }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: tipo.porcentaje + '%' }"></div>
            </div>
            <p class="count">{{ tipo.cantidad }} medidores</p>
          </div>
        </div>
      </div>

      <!-- Medidores recientes -->
      <div class="recent-section">
        <div class="section-header">
          <h3><i class="fas fa-clock"></i> Medidores Recientes</h3>
          <router-link to="/medidores" class="btn btn-primary">
            Ver Todos
          </router-link>
        </div>
        <div class="recent-grid">
          <div 
            v-for="medidor in medidoresRecientes" 
            :key="medidor.id" 
            class="recent-card"
          >
            <div class="recent-header">
              <h4>{{ medidor.codigo }}</h4>
              <span :class="['status-badge', getEstadoClass(medidor.estado)]">
                {{ getEstadoText(medidor.estado) }}
              </span>
            </div>
            <div class="recent-info">
              <p><strong>Tipo:</strong> {{ getTipoText(medidor.tipo) }}</p>
              <p><strong>Consumo:</strong> {{ medidor.consumoActual }} m³</p>
              <p><strong>Última lectura:</strong> {{ formatDate(medidor.fechaLectura) }}</p>
            </div>
            <div class="recent-actions">
              <router-link :to="`/medidores/${medidor.id}`" class="btn btn-info btn-sm">
                Ver
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Información adicional del estado -->
      <div v-if="stats.medidoresMantenimiento > 0" class="maintenance-info">
        <div class="alert alert-warning">
          <h4><i class="fas fa-tools"></i> Medidores en Mantenimiento</h4>
          <p>{{ stats.medidoresMantenimiento }} medidor(es) están actualmente en mantenimiento. Las lecturas pueden no estar disponibles durante este período.</p>
        </div>
      </div>

      <div v-if="stats.medidoresInactivos > 0" class="inactive-info">
        <div class="alert alert-danger">
          <h4><i class="fas fa-exclamation-triangle"></i> Medidores Inactivos</h4>
          <p>{{ stats.medidoresInactivos }} medidor(es) están inactivos y no están registrando lecturas. Contacte al administrador para más información.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import medidorService from '../services/medidorService'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const medidores = ref([])
const loading = ref(true)
const error = ref(null)

// Obtener medidores al cargar el componente
onMounted(async () => {
  await loadMedidores()
})

const loadMedidores = async () => {
  try {
    loading.value = true
    medidores.value = await medidorService.getAllMedidores()
  } catch (err) {
    error.value = 'Error al cargar los medidores: ' + err.message
  } finally {
    loading.value = false
  }
}

// Estadísticas calculadas
const stats = computed(() => {
  const total = medidores.value.length
  const activos = medidores.value.filter(m => m.estado === 'activo').length
  const mantenimiento = medidores.value.filter(m => m.estado === 'mantenimiento').length
  const inactivos = medidores.value.filter(m => m.estado === 'inactivo').length
  const consumoTotal = medidores.value.reduce((sum, m) => sum + m.consumoActual, 0)

  // Distribución por tipo
  const tipos = ['residencial', 'comercial', 'industrial', 'municipal']
  const distribucionPorTipo = tipos.map(tipo => {
    const cantidad = medidores.value.filter(m => m.tipo === tipo).length
    return {
      nombre: getTipoText(tipo),
      cantidad,
      porcentaje: total > 0 ? Math.round((cantidad / total) * 100) : 0
    }
  })

  return {
    totalMedidores: total,
    medidoresActivos: activos,
    medidoresMantenimiento: mantenimiento,
    medidoresInactivos: inactivos,
    consumoTotal,
    distribucionPorTipo
  }
})

// Medidores más recientes (últimos 5)
const medidoresRecientes = computed(() => {
  return medidores.value
    .sort((a, b) => new Date(b.fechaLectura) - new Date(a.fechaLectura))
    .slice(0, 5)
})

// Funciones de utilidad
const getEstadoClass = (estado) => {
  switch (estado) {
    case 'activo': return 'estado-activo'
    case 'mantenimiento': return 'estado-mantenimiento'
    case 'inactivo': return 'estado-inactivo'
    default: return 'estado-default'
  }
}

const getEstadoText = (estado) => {
  switch (estado) {
    case 'activo': return 'Activo'
    case 'mantenimiento': return 'En Mantenimiento'
    case 'inactivo': return 'Inactivo'
    default: return 'Desconocido'
  }
}

const getTipoText = (tipo) => {
  switch (tipo) {
    case 'residencial': return 'Residencial'
    case 'comercial': return 'Comercial'
    case 'industrial': return 'Industrial'
    case 'municipal': return 'Municipal'
    default: return tipo
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES')
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.subtitle {
  color: #666;
  font-size: 18px;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Tarjetas de estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.active {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.stat-icon.maintenance {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
}

.stat-icon.inactive {
  background: linear-gradient(135deg, #dc3545 0%, #e83e8c 100%);
}

.stat-info h3 {
  font-size: 2rem;
  margin: 0;
  color: #2c3e50;
}

.stat-info p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 14px;
}

/* Sección de consumo */
.consumption-section {
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.consumption-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}

.consumption-value {
  margin-bottom: 15px;
}

.consumption-value .value {
  font-size: 3rem;
  font-weight: bold;
  color: #007bff;
}

.consumption-value .unit {
  font-size: 1.5rem;
  color: #666;
  margin-left: 10px;
}

/* Distribución por tipo */
.distribution-section {
  margin-bottom: 30px;
}

.distribution-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.distribution-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.distribution-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.distribution-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 16px;
}

.percentage {
  font-weight: bold;
  color: #007bff;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.count {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* Medidores recientes */
.recent-section {
  margin-bottom: 30px;
}

.recent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.recent-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.recent-header h4 {
  margin: 0;
  color: #2c3e50;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.estado-activo {
  background-color: #d4edda;
  color: #155724;
}

.estado-mantenimiento {
  background-color: #fff3cd;
  color: #856404;
}

.estado-inactivo {
  background-color: #f8d7da;
  color: #721c24;
}

.recent-info p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}

.recent-actions {
  margin-top: 15px;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

/* Alertas */
.alert {
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.alert h4 {
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.alert p {
  margin: 0;
  line-height: 1.5;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

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

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .distribution-grid {
    grid-template-columns: 1fr;
  }
  
  .recent-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
}
</style> 