<template>
  <div class="node-create">
    <div class="header">
      <router-link to="/nodes" class="btn-back">
        ← Volver a la lista
      </router-link>
      <h1>Crear Nuevo Nodo</h1>
    </div>

    <div class="form-container">
      <form @submit.prevent="createNode" class="node-form">
        <div class="form-group">
          <label for="codigo">Código del Nodo *</label>
          <input
            id="codigo"
            v-model="form.codigo"
            type="text"
            placeholder="Ej: NODO-001"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="tipo">Tipo de Nodo *</label>
          <select
            id="tipo"
            v-model="form.tipo"
            required
            class="form-input"
          >
            <option value="">Selecciona un tipo</option>
            <option value="Sensor de Temperatura">Sensor de Temperatura</option>
            <option value="Sensor de Humedad">Sensor de Humedad</option>
            <option value="Sensor de Presión">Sensor de Presión</option>
            <option value="Actuador de Riego">Actuador de Riego</option>
            <option value="Sensor de Calidad del Agua">Sensor de Calidad del Agua</option>
            <option value="Controlador de Bomba">Controlador de Bomba</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div class="form-group">
          <label for="fechaInstalacion">Fecha de Instalación *</label>
          <input
            id="fechaInstalacion"
            v-model="form.fechaInstalacion"
            type="date"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="bateria">Nivel de Batería (%) *</label>
          <div class="battery-input-container">
            <input
              id="bateria"
              v-model.number="form.bateria"
              type="range"
              min="0"
              max="100"
              step="1"
              class="battery-slider"
            />
            <span class="battery-value">{{ form.bateria }}%</span>
          </div>
          <div class="battery-visual">
            <div class="battery-bar">
              <div 
                class="battery-fill" 
                :style="{ width: form.bateria + '%' }"
                :class="getBatteryClass(form.bateria)"
              ></div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="$router.push('/nodes')" class="btn-cancel">
            Cancelar
          </button>
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            <span v-if="isSubmitting">Creando...</span>
            <span v-else>Crear Nodo</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { nodeService } from '../services/nodeService'

const router = useRouter()
const isSubmitting = ref(false)

const form = ref({
  codigo: '',
  tipo: '',
  fechaInstalacion: new Date().toISOString().split('T')[0],
  bateria: 100,
  activo: true
})

const getBatteryClass = (level) => {
  if (level <= 20) return 'battery-low'
  if (level <= 50) return 'battery-medium'
  return 'battery-high'
}

const createNode = async () => {
  isSubmitting.value = true
  
  try {
    // Si no se proporciona código, generar uno automáticamente
    if (!form.value.codigo.trim()) {
      form.value.codigo = nodeService.generateNodeCode()
    }
    
    const newNode = await nodeService.createNode(form.value)
    console.log('Nodo creado:', newNode)
    
    alert('Nodo creado exitosamente')
    router.push('/nodes')
  } catch (error) {
    console.error('Error al crear nodo:', error)
    alert('Error al crear el nodo. Inténtalo de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // Generar código automático al cargar el formulario
  form.value.codigo = nodeService.generateNodeCode()
})
</script>

<style scoped>
.node-create {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.btn-back {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-back:hover {
  text-decoration: underline;
}

.header h1 {
  color: #2c3e50;
  margin: 0;
}

.form-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.node-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95em;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.form-input::placeholder {
  color: #bdc3c7;
}

.battery-input-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.battery-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e1e5e9;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.battery-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.battery-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.battery-value {
  font-weight: 600;
  color: #2c3e50;
  min-width: 50px;
  text-align: center;
}

.battery-visual {
  margin-top: 10px;
}

.battery-bar {
  height: 20px;
  background: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #bdc3c7;
}

.battery-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.battery-high {
  background: linear-gradient(90deg, #27ae60, #2ecc71);
}

.battery-medium {
  background: linear-gradient(90deg, #f39c12, #f1c40f);
}

.battery-low {
  background: linear-gradient(90deg, #e74c3c, #c0392b);
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
}

.btn-cancel, .btn-submit {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1em;
}

.btn-cancel {
  background: #ecf0f1;
  color: #7f8c8d;
}

.btn-cancel:hover {
  background: #bdc3c7;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .battery-input-container {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .battery-value {
    text-align: center;
  }
}
</style> 