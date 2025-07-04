<template>
  <div class="medidor-list">
    <div class="header">
      <h1><i class="fas fa-list"></i> Lista de Medidores</h1>
      <router-link to="/medidores/crear" class="btn btn-primary">
        <i class="fas fa-plus"></i> Nuevo Medidor
      </router-link>
    </div>

    <LoadingSpinner v-if="loading" message="Cargando medidores..." />

    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>

    <div v-else class="content">
      <!-- Filtros y búsqueda -->
      <div class="filters-section">
        <div class="search-box">
          <input 
            v-model="filtros.codigo" 
            type="text" 
            placeholder="Buscar por código..."
            class="search-input"
          >
          <i class="fas fa-search search-icon"></i>
        </div>

        <div class="filter-controls">
          <select v-model="filtros.tipo" class="filter-select">
            <option value="">Todos los tipos</option>
            <option v-for="tipo in tiposMedidores" :key="tipo.value" :value="tipo.value">
              {{ tipo.label }}
            </option>
          </select>

          <select v-model="filtros.estado" class="filter-select">
            <option value="">Todos los estados</option>
            <option v-for="estado in estadosMedidores" :key="estado.value" :value="estado.value">
              {{ estado.label }}
            </option>
          </select>

          <select v-model="ordenamiento" class="filter-select">
            <option value="codigo">Ordenar por Código</option>
            <option value="tipo">Ordenar por Tipo</option>
            <option value="estado">Ordenar por Estado</option>
            <option value="consumoActual">Ordenar por Consumo</option>
            <option value="fechaLectura">Ordenar por Fecha</option>
          </select>

          <button @click="limpiarFiltros" class="btn btn-secondary">
            <i class="fas fa-times"></i> Limpiar
          </button>
        </div>
      </div>

      <!-- Estadísticas rápidas -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-label">Total:</span>
          <span class="stat-value">{{ medidoresFiltrados.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Activos:</span>
          <span class="stat-value active">{{ medidoresActivos }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Mantenimiento:</span>
          <span class="stat-value maintenance">{{ medidoresMantenimiento }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Inactivos:</span>
          <span class="stat-value inactive">{{ medidoresInactivos }}</span>
        </div>
      </div>

      <!-- Tabla de medidores -->
      <div class="table-container">
        <table class="medidores-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Tipo</th>
              <th>Consumo Actual (m³)</th>
              <th>Estado</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Última Lectura</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="medidor in medidoresOrdenados" :key="medidor.id" class="medidor-row">
              <td class="codigo-cell">
                <strong>{{ medidor.codigo }}</strong>
              </td>
              <td>
                <span class="tipo-badge">{{ getTipoText(medidor.tipo) }}</span>
              </td>
              <td class="consumo-cell">
                <span class="consumo-value">{{ medidor.consumoActual.toFixed(2) }}</span>
              </td>
              <td>
                <span :class="['status-badge', getEstadoClass(medidor.estado)]">
                  {{ getEstadoText(medidor.estado) }}
                </span>
                <div v-if="medidor.mensajeMantenimiento" class="mensaje-mantenimiento">
                  <i class="fas fa-info-circle"></i>
                  {{ medidor.mensajeMantenimiento }}
                </div>
              </td>
              <td>{{ medidor.marca }}</td>
              <td>{{ medidor.modelo }}</td>
              <td>{{ formatDate(medidor.fechaLectura) }}</td>
              <td class="actions-cell">
                <div class="action-buttons">
                  <router-link :to="`/medidores/${medidor.id}`" class="btn btn-info btn-sm">
                    <i class="fas fa-eye"></i>
                  </router-link>
                  <router-link :to="`/medidores/${medidor.id}/editar`" class="btn btn-warning btn-sm">
                    <i class="fas fa-edit"></i>
                  </router-link>
                  <button @click="confirmarEliminar(medidor)" class="btn btn-danger btn-sm">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mensaje cuando no hay resultados -->
        <div v-if="medidoresFiltrados.length === 0" class="no-results">
          <i class="fas fa-search"></i>
          <p>No se encontraron medidores con los filtros aplicados</p>
          <button @click="limpiarFiltros" class="btn btn-primary">Limpiar filtros</button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="cancelarEliminar">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3><i class="fas fa-exclamation-triangle"></i> Confirmar Eliminación</h3>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que quieres eliminar el medidor <strong>{{ medidorAEliminar?.codigo }}</strong>?</p>
          <p class="warning-text">Esta acción no se puede deshacer.</p>
        </div>
        <div class="modal-footer">
          <button @click="cancelarEliminar" class="btn btn-secondary">Cancelar</button>
          <button @click="eliminarMedidor" class="btn btn-danger">
            <i class="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import medidorService from '../services/medidorService'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const router = useRouter()
const medidores = ref([])
const loading = ref(true)
const error = ref(null)
const showDeleteModal = ref(false)
const medidorAEliminar = ref(null)

// Filtros y ordenamiento
const filtros = ref({
  codigo: '',
  tipo: '',
  estado: ''
})
const ordenamiento = ref('codigo')

// Obtener opciones de filtros
const tiposMedidores = medidorService.getTiposMedidores()
const estadosMedidores = medidorService.getEstadosMedidores()

// Cargar medidores al montar el componente
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

// Medidores filtrados
const medidoresFiltrados = computed(() => {
  let resultados = [...medidores.value]

  if (filtros.value.codigo) {
    resultados = resultados.filter(m => 
      m.codigo.toLowerCase().includes(filtros.value.codigo.toLowerCase())
    )
  }

  if (filtros.value.tipo) {
    resultados = resultados.filter(m => m.tipo === filtros.value.tipo)
  }

  if (filtros.value.estado) {
    resultados = resultados.filter(m => m.estado === filtros.value.estado)
  }

  return resultados
})

// Medidores ordenados
const medidoresOrdenados = computed(() => {
  const ordenados = [...medidoresFiltrados.value]
  
  ordenados.sort((a, b) => {
    switch (ordenamiento.value) {
      case 'codigo':
        return a.codigo.localeCompare(b.codigo)
      case 'tipo':
        return a.tipo.localeCompare(b.tipo)
      case 'estado':
        return a.estado.localeCompare(b.estado)
      case 'consumoActual':
        return b.consumoActual - a.consumoActual
      case 'fechaLectura':
        return new Date(b.fechaLectura) - new Date(a.fechaLectura)
      default:
        return 0
    }
  })

  return ordenados
})

// Estadísticas de medidores filtrados
const medidoresActivos = computed(() => 
  medidoresFiltrados.value.filter(m => m.estado === 'activo').length
)
const medidoresMantenimiento = computed(() => 
  medidoresFiltrados.value.filter(m => m.estado === 'mantenimiento').length
)
const medidoresInactivos = computed(() => 
  medidoresFiltrados.value.filter(m => m.estado === 'inactivo').length
)

// Funciones de utilidad
const getTipoText = (tipo) => {
  const tipoObj = tiposMedidores.find(t => t.value === tipo)
  return tipoObj ? tipoObj.label : tipo
}

const getEstadoText = (estado) => {
  const estadoObj = estadosMedidores.find(e => e.value === estado)
  return estadoObj ? estadoObj.label : estado
}

const getEstadoClass = (estado) => {
  switch (estado) {
    case 'activo': return 'estado-activo'
    case 'mantenimiento': return 'estado-mantenimiento'
    case 'inactivo': return 'estado-inactivo'
    default: return 'estado-default'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const limpiarFiltros = () => {
  filtros.value = {
    codigo: '',
    tipo: '',
    estado: ''
  }
  ordenamiento.value = 'codigo'
}

// Funciones de eliminación
const confirmarEliminar = (medidor) => {
  medidorAEliminar.value = medidor
  showDeleteModal.value = true
}

const cancelarEliminar = () => {
  showDeleteModal.value = false
  medidorAEliminar.value = null
}

const eliminarMedidor = async () => {
  if (!medidorAEliminar.value) return

  try {
    await medidorService.deleteMedidor(medidorAEliminar.value.id)
    await loadMedidores() // Recargar la lista
    cancelarEliminar()
  } catch (err) {
    console.error('Error al eliminar medidor:', err)
  }
}
</script>

<style scoped>
.medidor-list {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Filtros y búsqueda */
.filters-section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.filter-controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  min-width: 150px;
}

/* Estadísticas rápidas */
.stats-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stat-item {
  background: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.stat-value {
  font-weight: bold;
  font-size: 18px;
  color: #2c3e50;
}

.stat-value.active {
  color: #28a745;
}

.stat-value.maintenance {
  color: #ffc107;
}

.stat-value.inactive {
  color: #dc3545;
}

/* Tabla */
.table-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.medidores-table {
  width: 100%;
  border-collapse: collapse;
}

.medidores-table th {
  background: #f8f9fa;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e9ecef;
}

.medidores-table td {
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.medidor-row:hover {
  background-color: #f8f9fa;
}

.codigo-cell {
  font-weight: 600;
}

.consumo-cell {
  text-align: center;
}

.consumo-value {
  font-weight: bold;
  color: #007bff;
}

.tipo-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 5px;
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

.mensaje-mantenimiento {
  font-size: 11px;
  color: #856404;
  margin-top: 5px;
}

.actions-cell {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.btn-sm {
  padding: 6px 10px;
  font-size: 12px;
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

/* Sin resultados */
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-results i {
  font-size: 48px;
  margin-bottom: 20px;
  color: #ddd;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-body {
  padding: 20px;
}

.warning-text {
  color: #dc3545;
  font-weight: 500;
  margin-top: 10px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .filter-controls {
    flex-direction: column;
  }
  
  .stats-bar {
    flex-direction: column;
  }
  
  .medidores-table {
    font-size: 14px;
  }
  
  .medidores-table th,
  .medidores-table td {
    padding: 10px 8px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 3px;
  }
}
</style> 