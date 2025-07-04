<template>
  <div class="medidor-edit">
    <div class="header">
      <h1><i class="fas fa-edit"></i> Editar Medidor</h1>
      <div class="header-actions">
        <router-link :to="`/medidores/${medidorId}`" class="btn btn-info">
          <i class="fas fa-eye"></i> Ver Detalles
        </router-link>
        <router-link to="/medidores" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Volver a la Lista
        </router-link>
      </div>
    </div>

    <LoadingSpinner v-if="loading" message="Cargando medidor..." />

    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <router-link to="/medidores" class="btn btn-primary">
        <i class="fas fa-arrow-left"></i> Volver a la Lista
      </router-link>
    </div>

    <div v-else class="content">
      <div class="form-container">
        <form @submit.prevent="actualizarMedidor" class="medidor-form">
          <!-- Información básica -->
          <div class="form-section">
            <h3><i class="fas fa-info-circle"></i> Información Básica</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="codigo">Código del Medidor *</label>
                <input 
                  id="codigo"
                  v-model="formData.codigo" 
                  type="text" 
                  required
                  placeholder="Ej: MED001"
                  :class="{ 'error': errors.codigo }"
                >
                <span v-if="errors.codigo" class="error-message">{{ errors.codigo }}</span>
              </div>

              <div class="form-group">
                <label for="tipo">Tipo de Medidor *</label>
                <select 
                  id="tipo"
                  v-model="formData.tipo" 
                  required
                  :class="{ 'error': errors.tipo }"
                >
                  <option value="">Seleccionar tipo</option>
                  <option v-for="tipo in tiposMedidores" :key="tipo.value" :value="tipo.value">
                    {{ tipo.label }}
                  </option>
                </select>
                <span v-if="errors.tipo" class="error-message">{{ errors.tipo }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="estado">Estado *</label>
                <select 
                  id="estado"
                  v-model="formData.estado" 
                  required
                  :class="{ 'error': errors.estado }"
                >
                  <option value="">Seleccionar estado</option>
                  <option v-for="estado in estadosMedidores" :key="estado.value" :value="estado.value">
                    {{ estado.label }}
                  </option>
                </select>
                <span v-if="errors.estado" class="error-message">{{ errors.estado }}</span>
              </div>

              <div class="form-group">
                <label for="consumoActual">Consumo Actual (m³)</label>
                <input 
                  id="consumoActual"
                  v-model.number="formData.consumoActual" 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  :class="{ 'error': errors.consumoActual }"
                >
                <span v-if="errors.consumoActual" class="error-message">{{ errors.consumoActual }}</span>
              </div>
            </div>
          </div>

          <!-- Información técnica -->
          <div class="form-section">
            <h3><i class="fas fa-cogs"></i> Información Técnica</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="marca">Marca</label>
                <input 
                  id="marca"
                  v-model="formData.marca" 
                  type="text" 
                  placeholder="Ej: Siemens, ABB, etc."
                  :class="{ 'error': errors.marca }"
                >
                <span v-if="errors.marca" class="error-message">{{ errors.marca }}</span>
              </div>

              <div class="form-group">
                <label for="modelo">Modelo</label>
                <input 
                  id="modelo"
                  v-model="formData.modelo" 
                  type="text" 
                  placeholder="Ej: SITRANS F, AquaMaster, etc."
                  :class="{ 'error': errors.modelo }"
                >
                <span v-if="errors.modelo" class="error-message">{{ errors.modelo }}</span>
              </div>
            </div>
          </div>

          <!-- Información de estado -->
          <div v-if="formData.estado === 'mantenimiento' || formData.estado === 'inactivo'" class="form-section">
            <h3><i class="fas fa-exclamation-triangle"></i> Información de Estado</h3>
            <div class="alert" :class="getAlertClass(formData.estado)">
              <div class="alert-content">
                <h4>{{ getEstadoTitle(formData.estado) }}</h4>
                <p>{{ getEstadoDescription(formData.estado) }}</p>
              </div>
            </div>
          </div>

          <!-- Información de auditoría -->
          <div class="form-section">
            <h3><i class="fas fa-history"></i> Información de Auditoría</h3>
            <div class="audit-info">
              <div class="audit-item">
                <span class="label">Creado:</span>
                <span class="value">{{ formatDate(medidorOriginal.createdAt) }}</span>
              </div>
              <div class="audit-item">
                <span class="label">Última actualización:</span>
                <span class="value">{{ formatDate(medidorOriginal.updatedAt) }}</span>
              </div>
              <div class="audit-item">
                <span class="label">Última lectura:</span>
                <span class="value">{{ formatDate(medidorOriginal.fechaLectura) }}</span>
              </div>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="form-actions">
            <button type="button" @click="restaurarFormulario" class="btn btn-secondary">
              <i class="fas fa-undo"></i> Restaurar
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading || !hasChanges">
              <i class="fas fa-save"></i> {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Vista previa -->
      <div class="preview-container">
        <h3><i class="fas fa-eye"></i> Vista Previa</h3>
        <div class="preview-card">
          <div class="preview-header">
            <h4>{{ formData.codigo || 'CÓDIGO' }}</h4>
            <span v-if="formData.estado" :class="['status-badge', getEstadoClass(formData.estado)]">
              {{ getEstadoText(formData.estado) }}
            </span>
          </div>
          
          <div class="preview-info">
            <div class="preview-item">
              <span class="label">Tipo:</span>
              <span class="value">{{ getTipoText(formData.tipo) || 'No especificado' }}</span>
            </div>
            <div class="preview-item">
              <span class="label">Consumo:</span>
              <span class="value">{{ formData.consumoActual || 0 }} m³</span>
            </div>
            <div class="preview-item">
              <span class="label">Marca:</span>
              <span class="value">{{ formData.marca || 'No especificada' }}</span>
            </div>
            <div class="preview-item">
              <span class="label">Modelo:</span>
              <span class="value">{{ formData.modelo || 'No especificado' }}</span>
            </div>
          </div>

          <div v-if="formData.estado === 'mantenimiento' || formData.estado === 'inactivo'" class="preview-message">
            <i class="fas fa-info-circle"></i>
            {{ getMensajeMantenimiento(formData.estado) }}
          </div>

          <!-- Cambios detectados -->
          <div v-if="hasChanges" class="changes-detected">
            <i class="fas fa-edit"></i>
            <span>Se han detectado cambios en el formulario</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import medidorService from '../services/medidorService'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const medidorId = route.params.id

const loading = ref(false)
const error = ref(null)
const errors = ref({})
const medidorOriginal = ref({})

// Datos del formulario
const formData = ref({
  codigo: '',
  tipo: '',
  consumoActual: 0,
  estado: 'activo',
  marca: '',
  modelo: ''
})

// Obtener opciones de filtros
const tiposMedidores = medidorService.getTiposMedidores()
const estadosMedidores = medidorService.getEstadosMedidores()

// Cargar medidor al montar el componente
onMounted(async () => {
  await loadMedidor()
})

const loadMedidor = async () => {
  try {
    loading.value = true
    const medidor = await medidorService.getMedidorById(medidorId)
    medidorOriginal.value = { ...medidor }
    
    // Llenar el formulario con los datos del medidor
    formData.value = {
      codigo: medidor.codigo,
      tipo: medidor.tipo,
      consumoActual: medidor.consumoActual,
      estado: medidor.estado,
      marca: medidor.marca,
      modelo: medidor.modelo
    }
  } catch (err) {
    error.value = 'Error al cargar el medidor: ' + err.message
  } finally {
    loading.value = false
  }
}

// Detectar cambios en el formulario
const hasChanges = computed(() => {
  return (
    formData.value.codigo !== medidorOriginal.value.codigo ||
    formData.value.tipo !== medidorOriginal.value.tipo ||
    formData.value.consumoActual !== medidorOriginal.value.consumoActual ||
    formData.value.estado !== medidorOriginal.value.estado ||
    formData.value.marca !== medidorOriginal.value.marca ||
    formData.value.modelo !== medidorOriginal.value.modelo
  )
})

// Validación del formulario
const validarFormulario = () => {
  errors.value = {}

  if (!formData.value.codigo.trim()) {
    errors.value.codigo = 'El código es requerido'
  } else if (formData.value.codigo.length < 3) {
    errors.value.codigo = 'El código debe tener al menos 3 caracteres'
  }

  if (!formData.value.tipo) {
    errors.value.tipo = 'El tipo es requerido'
  }

  if (!formData.value.estado) {
    errors.value.estado = 'El estado es requerido'
  }

  if (formData.value.consumoActual < 0) {
    errors.value.consumoActual = 'El consumo no puede ser negativo'
  }

  return Object.keys(errors.value).length === 0
}

// Actualizar medidor
const actualizarMedidor = async () => {
  if (!validarFormulario()) {
    return
  }

  try {
    loading.value = true
    await medidorService.updateMedidor(medidorId, formData.value)
    
    // Actualizar los datos originales
    medidorOriginal.value = { ...medidorOriginal.value, ...formData.value }
    
    // Redirigir al detalle del medidor
    router.push(`/medidores/${medidorId}`)
  } catch (err) {
    console.error('Error al actualizar medidor:', err)
    // Mostrar errores específicos si vienen del servidor
    if (err.response?.data?.errors) {
      errors.value = { ...errors.value, ...err.response.data.errors }
    }
  } finally {
    loading.value = false
  }
}

// Restaurar formulario a los valores originales
const restaurarFormulario = () => {
  formData.value = {
    codigo: medidorOriginal.value.codigo,
    tipo: medidorOriginal.value.tipo,
    consumoActual: medidorOriginal.value.consumoActual,
    estado: medidorOriginal.value.estado,
    marca: medidorOriginal.value.marca,
    modelo: medidorOriginal.value.modelo
  }
  errors.value = {}
}

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

const getEstadoTitle = (estado) => {
  switch (estado) {
    case 'mantenimiento': return 'Medidor en Mantenimiento'
    case 'inactivo': return 'Medidor Inactivo'
    default: return ''
  }
}

const getEstadoDescription = (estado) => {
  switch (estado) {
    case 'mantenimiento': return 'Este medidor estará en mantenimiento programado. Las lecturas pueden no estar disponibles durante este período.'
    case 'inactivo': return 'Este medidor está fuera de servicio y requiere revisión técnica antes de poder registrar lecturas.'
    default: return ''
  }
}

const getMensajeMantenimiento = (estado) => {
  switch (estado) {
    case 'mantenimiento': return 'Medidor en mantenimiento programado - Lecturas temporales no disponibles'
    case 'inactivo': return 'Medidor fuera de servicio - Requiere revisión técnica'
    default: return ''
  }
}

const getAlertClass = (estado) => {
  switch (estado) {
    case 'mantenimiento': return 'alert-warning'
    case 'inactivo': return 'alert-danger'
    default: return ''
  }
}

const formatDate = (date) => {
  if (!date) return 'No disponible'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.medidor-edit {
  max-width: 1200px;
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

.header-actions {
  display: flex;
  gap: 10px;
}

.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

/* Formulario */
.form-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.medidor-form {
  padding: 30px;
}

.form-section {
  margin-bottom: 30px;
}

.form-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
}

.form-group input.error,
.form-group select.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}

/* Alertas */
.alert {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
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

.alert-content h4 {
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.alert-content p {
  margin: 0;
  line-height: 1.5;
}

/* Información de auditoría */
.audit-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.audit-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 5px 0;
}

.audit-item:last-child {
  margin-bottom: 0;
}

.audit-item .label {
  color: #666;
  font-weight: 500;
}

.audit-item .value {
  color: #2c3e50;
  font-weight: 600;
}

/* Botones de acción */
.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

/* Vista previa */
.preview-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.preview-container h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-card {
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
}

.preview-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
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

.preview-info {
  margin-bottom: 15px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 5px 0;
}

.preview-item .label {
  color: #666;
  font-weight: 500;
}

.preview-item .value {
  color: #2c3e50;
  font-weight: 600;
}

.preview-message {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  color: #856404;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}

.changes-detected {
  background: #e3f2fd;
  color: #1976d2;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #bbdefb;
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .header-actions {
    flex-direction: column;
  }
  
  .preview-container {
    position: static;
  }
}
</style> 