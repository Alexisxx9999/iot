<template>
  <div class="reportes">
    <div class="header">
      <h1><i class="fas fa-file-alt"></i> Reportes</h1>
      <p class="subtitle">Generar y visualizar reportes del sistema</p>
    </div>

    <div class="reportes-content">
      <!-- Tipos de reportes -->
      <div class="report-types">
        <div class="section-header">
          <h2>Tipos de Reportes</h2>
        </div>
        
        <div class="report-grid">
          <div class="report-card" @click="generarReporte('consumo')">
            <div class="report-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Reporte de Consumo</h3>
            <p>Análisis detallado del consumo de agua por medidor y período</p>
            <div class="report-features">
              <span class="feature">📊 Gráficos</span>
              <span class="feature">📅 Por fechas</span>
              <span class="feature">📈 Tendencias</span>
            </div>
          </div>

          <div class="report-card" @click="generarReporte('estado')">
            <div class="report-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <h3>Reporte de Estados</h3>
            <p>Estado actual de todos los medidores del sistema</p>
            <div class="report-features">
              <span class="feature">🟢 Activos</span>
              <span class="feature">🟡 Mantenimiento</span>
              <span class="feature">🔴 Inactivos</span>
            </div>
          </div>

          <div class="report-card" @click="generarReporte('mantenimiento')">
            <div class="report-icon">
              <i class="fas fa-tools"></i>
            </div>
            <h3>Reporte de Mantenimiento</h3>
            <p>Medidores que requieren mantenimiento o reparación</p>
            <div class="report-features">
              <span class="feature">🔧 Reparaciones</span>
              <span class="feature">📋 Checklist</span>
              <span class="feature">⏰ Programación</span>
            </div>
          </div>

          <div class="report-card" @click="generarReporte('comparativo')">
            <div class="report-icon">
              <i class="fas fa-balance-scale"></i>
            </div>
            <h3>Reporte Comparativo</h3>
            <p>Comparación de consumo entre diferentes períodos</p>
            <div class="report-features">
              <span class="feature">📊 Comparación</span>
              <span class="feature">📈 Variaciones</span>
              <span class="feature">📋 Análisis</span>
            </div>
          </div>

          <div class="report-card" @click="generarReporte('geografico')">
            <div class="report-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <h3>Reporte Geográfico</h3>
            <p>Distribución de medidores por ubicación geográfica</p>
            <div class="report-features">
              <span class="feature">🗺️ Mapa</span>
              <span class="feature">📍 Ubicaciones</span>
              <span class="feature">📊 Densidad</span>
            </div>
          </div>

          <div class="report-card" @click="generarReporte('personalizado')">
            <div class="report-icon">
              <i class="fas fa-cogs"></i>
            </div>
            <h3>Reporte Personalizado</h3>
            <p>Crear reportes con criterios específicos</p>
            <div class="report-features">
              <span class="feature">⚙️ Configurable</span>
              <span class="feature">📋 Filtros</span>
              <span class="feature">💾 Guardar</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros de reporte -->
      <div class="filters-section">
        <div class="section-header">
          <h2>Filtros de Reporte</h2>
        </div>
        
        <div class="filters-form">
          <div class="filter-group">
            <label>Rango de Fechas</label>
            <div class="date-inputs">
              <input type="date" v-model="filtros.fechaInicio" class="form-control">
              <span>hasta</span>
              <input type="date" v-model="filtros.fechaFin" class="form-control">
            </div>
          </div>

          <div class="filter-group">
            <label>Tipo de Medidor</label>
            <select v-model="filtros.tipo" class="form-control">
              <option value="">Todos los tipos</option>
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
              <option value="industrial">Industrial</option>
              <option value="municipal">Municipal</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Estado</label>
            <select v-model="filtros.estado" class="form-control">
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="mantenimiento">En Mantenimiento</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Ordenar por</label>
            <select v-model="filtros.ordenar" class="form-control">
              <option value="codigo">Código</option>
              <option value="consumo">Consumo</option>
              <option value="fecha">Fecha</option>
              <option value="estado">Estado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Reporte generado -->
      <div v-if="reporteGenerado" class="reporte-resultado">
        <div class="section-header">
          <h2>Reporte: {{ reporteActual.nombre }}</h2>
          <div class="report-actions">
            <button @click="exportarReporte" class="btn btn-success">
              <i class="fas fa-download"></i> Exportar
            </button>
            <button @click="imprimirReporte" class="btn btn-info">
              <i class="fas fa-print"></i> Imprimir
            </button>
            <button @click="cerrarReporte" class="btn btn-secondary">
              <i class="fas fa-times"></i> Cerrar
            </button>
          </div>
        </div>

        <div class="reporte-content">
          <div class="reporte-header">
            <h3>{{ reporteActual.nombre }}</h3>
            <p>Generado el {{ formatDate(new Date()) }}</p>
            <p>Período: {{ filtros.fechaInicio }} - {{ filtros.fechaFin }}</p>
          </div>

          <div class="reporte-data">
            <div class="data-summary">
              <div class="summary-item">
                <span class="label">Total Medidores:</span>
                <span class="value">{{ datosReporte.totalMedidores }}</span>
              </div>
              <div class="summary-item">
                <span class="label">Consumo Total:</span>
                <span class="value">{{ datosReporte.consumoTotal.toFixed(2) }} m³</span>
              </div>
              <div class="summary-item">
                <span class="label">Promedio:</span>
                <span class="value">{{ datosReporte.promedioConsumo.toFixed(2) }} m³</span>
              </div>
            </div>

            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Consumo (m³)</th>
                    <th>Última Lectura</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="medidor in datosReporte.medidores" :key="medidor.id">
                    <td>{{ medidor.codigo }}</td>
                    <td>{{ getTipoText(medidor.tipo) }}</td>
                    <td>
                      <span :class="['status-badge', getEstadoClass(medidor.estado)]">
                        {{ getEstadoText(medidor.estado) }}
                      </span>
                    </td>
                    <td>{{ medidor.consumoActual }}</td>
                    <td>{{ formatDate(medidor.fechaLectura) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import medidorService from '../services/medidorService'

const medidores = ref([])
const reporteGenerado = ref(false)
const reporteActual = ref({})

// Filtros
const filtros = ref({
  fechaInicio: '',
  fechaFin: '',
  tipo: '',
  estado: '',
  ordenar: 'codigo'
})

// Cargar medidores al montar
onMounted(async () => {
  await loadMedidores()
})

const loadMedidores = async () => {
  try {
    medidores.value = await medidorService.getAllMedidores()
  } catch (error) {
    console.error('Error al cargar medidores:', error)
  }
}

// Generar reporte
const generarReporte = (tipo) => {
  const reportes = {
    consumo: { nombre: 'Reporte de Consumo', icon: 'fas fa-chart-line' },
    estado: { nombre: 'Reporte de Estados', icon: 'fas fa-tasks' },
    mantenimiento: { nombre: 'Reporte de Mantenimiento', icon: 'fas fa-tools' },
    comparativo: { nombre: 'Reporte Comparativo', icon: 'fas fa-balance-scale' },
    geografico: { nombre: 'Reporte Geográfico', icon: 'fas fa-map-marker-alt' },
    personalizado: { nombre: 'Reporte Personalizado', icon: 'fas fa-cogs' }
  }

  reporteActual.value = reportes[tipo]
  reporteGenerado.value = true
}

// Datos del reporte filtrados
const datosReporte = computed(() => {
  let medidoresFiltrados = [...medidores.value]

  // Aplicar filtros
  if (filtros.value.tipo) {
    medidoresFiltrados = medidoresFiltrados.filter(m => m.tipo === filtros.value.tipo)
  }

  if (filtros.value.estado) {
    medidoresFiltrados = medidoresFiltrados.filter(m => m.estado === filtros.value.estado)
  }

  // Ordenar
  medidoresFiltrados.sort((a, b) => {
    switch (filtros.value.ordenar) {
      case 'consumo':
        return b.consumoActual - a.consumoActual
      case 'fecha':
        return new Date(b.fechaLectura) - new Date(a.fechaLectura)
      case 'estado':
        return a.estado.localeCompare(b.estado)
      default:
        return a.codigo.localeCompare(b.codigo)
    }
  })

  const consumoTotal = medidoresFiltrados.reduce((sum, m) => sum + m.consumoActual, 0)
  const promedioConsumo = medidoresFiltrados.length > 0 ? consumoTotal / medidoresFiltrados.length : 0

  return {
    totalMedidores: medidoresFiltrados.length,
    consumoTotal,
    promedioConsumo,
    medidores: medidoresFiltrados
  }
})

// Acciones del reporte
const exportarReporte = () => {
  // Implementar exportación a PDF/Excel
  alert('Función de exportación en desarrollo')
}

const imprimirReporte = () => {
  window.print()
}

const cerrarReporte = () => {
  reporteGenerado.value = false
  reporteActual.value = {}
}

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
.reportes {
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

.reportes-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.report-types {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  color: #2c3e50;
  margin: 0;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.report-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.report-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  border-color: #007bff;
}

.report-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.report-icon i {
  font-size: 24px;
  color: white;
}

.report-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.report-card p {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.report-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature {
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
}

/* Filtros */
.filters-section {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 40px;
}

.filters-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 600;
  color: #2c3e50;
}

.form-control {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-inputs span {
  color: #666;
}

/* Reporte generado */
.reporte-resultado {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.reporte-actions {
  display: flex;
  gap: 10px;
}

.reporte-content {
  padding: 25px;
}

.reporte-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.reporte-header h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.reporte-header p {
  color: #666;
  margin: 5px 0;
}

.data-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-item .label {
  color: #666;
  font-weight: 500;
}

.summary-item .value {
  color: #2c3e50;
  font-weight: bold;
  font-size: 18px;
}

.data-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
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

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

@media (max-width: 768px) {
  .report-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-form {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .reporte-actions {
    flex-direction: column;
  }
  
  .data-summary {
    grid-template-columns: 1fr;
  }
}
</style> 