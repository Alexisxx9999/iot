<template>
  <div class="configuracion">
    <div class="header">
      <h1><i class="fas fa-cog"></i> Configuración</h1>
      <p class="subtitle">Configurar parámetros del sistema</p>
    </div>

    <div class="config-content">
      <!-- Configuración General -->
      <div class="config-section">
        <div class="section-header">
          <h2><i class="fas fa-sliders-h"></i> Configuración General</h2>
        </div>
        
        <div class="config-form">
          <div class="form-group">
            <label>Nombre del Sistema</label>
            <input 
              v-model="config.nombreSistema" 
              type="text" 
              class="form-control"
              placeholder="Sistema de Medidores IoT"
            />
          </div>

          <div class="form-group">
            <label>URL del Backend</label>
            <input 
              v-model="config.backendUrl" 
              type="url" 
              class="form-control"
              placeholder="http://localhost:3000/api"
            />
          </div>

          <div class="form-group">
            <label>Intervalo de Actualización (segundos)</label>
            <input 
              v-model.number="config.intervaloActualizacion" 
              type="number" 
              min="30" 
              max="3600"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label>Zona Horaria</label>
            <select v-model="config.zonaHoraria" class="form-control">
              <option value="America/Mexico_City">México (GMT-6)</option>
              <option value="America/New_York">Nueva York (GMT-5)</option>
              <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
              <option value="Europe/Madrid">Madrid (GMT+1)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Configuración de Alertas -->
      <div class="config-section">
        <div class="section-header">
          <h2><i class="fas fa-bell"></i> Configuración de Alertas</h2>
        </div>
        
        <div class="config-form">
          <div class="form-group">
            <label>Umbral de Consumo Alto (m³)</label>
            <input 
              v-model.number="config.umbralConsumoAlto" 
              type="number" 
              step="0.01"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label>Umbral de Consumo Bajo (m³)</label>
            <input 
              v-model.number="config.umbralConsumoBajo" 
              type="number" 
              step="0.01"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label>Notificaciones por Email</label>
            <div class="checkbox-group">
              <label class="checkbox">
                <input type="checkbox" v-model="config.notificacionesEmail">
                <span class="checkmark"></span>
                Activar notificaciones por email
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Email de Administrador</label>
            <input 
              v-model="config.emailAdmin" 
              type="email" 
              class="form-control"
              placeholder="admin@sistema.com"
            />
          </div>
        </div>
      </div>

      <!-- Configuración de Reportes -->
      <div class="config-section">
        <div class="section-header">
          <h2><i class="fas fa-file-alt"></i> Configuración de Reportes</h2>
        </div>
        
        <div class="config-form">
          <div class="form-group">
            <label>Formato de Reporte Predeterminado</label>
            <select v-model="config.formatoReporte" class="form-control">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div class="form-group">
            <label>Generar Reportes Automáticos</label>
            <div class="checkbox-group">
              <label class="checkbox">
                <input type="checkbox" v-model="config.reportesAutomaticos">
                <span class="checkmark"></span>
                Activar reportes automáticos
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Frecuencia de Reportes</label>
            <select v-model="config.frecuenciaReportes" class="form-control">
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="trimestral">Trimestral</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Configuración de Seguridad -->
      <div class="config-section">
        <div class="section-header">
          <h2><i class="fas fa-shield-alt"></i> Configuración de Seguridad</h2>
        </div>
        
        <div class="config-form">
          <div class="form-group">
            <label>Autenticación Requerida</label>
            <div class="checkbox-group">
              <label class="checkbox">
                <input type="checkbox" v-model="config.autenticacionRequerida">
                <span class="checkmark"></span>
                Requerir autenticación para acceder
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Timeout de Sesión (minutos)</label>
            <input 
              v-model.number="config.timeoutSesion" 
              type="number" 
              min="5" 
              max="480"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label>Registro de Actividad</label>
            <div class="checkbox-group">
              <label class="checkbox">
                <input type="checkbox" v-model="config.registroActividad">
                <span class="checkmark"></span>
                Mantener registro de actividades
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Configuración de Backup -->
      <div class="config-section">
        <div class="section-header">
          <h2><i class="fas fa-database"></i> Configuración de Backup</h2>
        </div>
        
        <div class="config-form">
          <div class="form-group">
            <label>Backup Automático</label>
            <div class="checkbox-group">
              <label class="checkbox">
                <input type="checkbox" v-model="config.backupAutomatico">
                <span class="checkmark"></span>
                Activar backup automático
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Frecuencia de Backup</label>
            <select v-model="config.frecuenciaBackup" class="form-control">
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>

          <div class="form-group">
            <label>Retener Backups (días)</label>
            <input 
              v-model.number="config.retenerBackups" 
              type="number" 
              min="1" 
              max="365"
              class="form-control"
            />
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="config-actions">
        <button @click="guardarConfiguracion" class="btn btn-primary">
          <i class="fas fa-save"></i> Guardar Configuración
        </button>
        <button @click="restaurarConfiguracion" class="btn btn-secondary">
          <i class="fas fa-undo"></i> Restaurar Valores
        </button>
        <button @click="exportarConfiguracion" class="btn btn-info">
          <i class="fas fa-download"></i> Exportar Configuración
        </button>
      </div>

      <!-- Mensajes -->
      <div v-if="mensaje" :class="['mensaje', mensaje.tipo]">
        <p>{{ mensaje.texto }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const config = ref({
  // Configuración General
  nombreSistema: 'Sistema de Medidores IoT',
  backendUrl: 'http://localhost:3000/api',
  intervaloActualizacion: 300,
  zonaHoraria: 'America/Mexico_City',

  // Alertas
  umbralConsumoAlto: 1000,
  umbralConsumoBajo: 10,
  notificacionesEmail: false,
  emailAdmin: '',

  // Reportes
  formatoReporte: 'pdf',
  reportesAutomaticos: false,
  frecuenciaReportes: 'mensual',

  // Seguridad
  autenticacionRequerida: true,
  timeoutSesion: 30,
  registroActividad: true,

  // Backup
  backupAutomatico: true,
  frecuenciaBackup: 'semanal',
  retenerBackups: 30
})

const mensaje = ref(null)

// Cargar configuración guardada
onMounted(() => {
  const configGuardada = localStorage.getItem('configuracionSistema')
  if (configGuardada) {
    config.value = { ...config.value, ...JSON.parse(configGuardada) }
  }
})

const guardarConfiguracion = () => {
  try {
    localStorage.setItem('configuracionSistema', JSON.stringify(config.value))
    mostrarMensaje('Configuración guardada exitosamente', 'success')
  } catch (error) {
    mostrarMensaje('Error al guardar la configuración', 'error')
  }
}

const restaurarConfiguracion = () => {
  if (confirm('¿Estás seguro de que quieres restaurar los valores por defecto?')) {
    config.value = {
      nombreSistema: 'Sistema de Medidores IoT',
      backendUrl: 'http://localhost:3000/api',
      intervaloActualizacion: 300,
      zonaHoraria: 'America/Mexico_City',
      umbralConsumoAlto: 1000,
      umbralConsumoBajo: 10,
      notificacionesEmail: false,
      emailAdmin: '',
      formatoReporte: 'pdf',
      reportesAutomaticos: false,
      frecuenciaReportes: 'mensual',
      autenticacionRequerida: true,
      timeoutSesion: 30,
      registroActividad: true,
      backupAutomatico: true,
      frecuenciaBackup: 'semanal',
      retenerBackups: 30
    }
    mostrarMensaje('Configuración restaurada', 'info')
  }
}

const exportarConfiguracion = () => {
  const configData = JSON.stringify(config.value, null, 2)
  const blob = new Blob([configData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'configuracion-sistema.json'
  a.click()
  URL.revokeObjectURL(url)
  mostrarMensaje('Configuración exportada', 'success')
}

const mostrarMensaje = (texto, tipo) => {
  mensaje.value = { texto, tipo }
  setTimeout(() => {
    mensaje.value = null
  }, 3000)
}
</script>

<style scoped>
.configuracion {
  max-width: 1000px;
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

.config-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.config-section {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.section-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
}

.section-header h2 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.config-form {
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
}

.form-control {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.checkbox-group {
  margin-top: 10px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #2c3e50;
}

.checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
}

.checkbox input[type="checkbox"]:checked + .checkmark {
  background-color: #007bff;
  border-color: #007bff;
}

.checkbox input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.config-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.mensaje {
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  margin-top: 20px;
}

.mensaje.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.mensaje.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.mensaje.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

@media (max-width: 768px) {
  .config-form {
    grid-template-columns: 1fr;
  }
  
  .config-actions {
    flex-direction: column;
  }
  
  .section-header h2 {
    font-size: 18px;
  }
}
</style> 