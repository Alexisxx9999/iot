// Manejador de errores global
export const handleError = (error, context = '') => {
  console.error(`Error en ${context}:`, error)
  
  // Determinar el tipo de error
  let errorMessage = 'Ha ocurrido un error inesperado'
  
  if (error.response) {
    // Error de respuesta del servidor
    switch (error.response.status) {
      case 400:
        errorMessage = 'Datos inválidos enviados al servidor'
        break
      case 401:
        errorMessage = 'No autorizado. Por favor, inicie sesión nuevamente'
        break
      case 403:
        errorMessage = 'Acceso denegado'
        break
      case 404:
        errorMessage = 'Recurso no encontrado'
        break
      case 500:
        errorMessage = 'Error interno del servidor'
        break
      default:
        errorMessage = `Error del servidor: ${error.response.status}`
    }
  } else if (error.request) {
    // Error de red
    errorMessage = 'Error de conexión. Verifique su conexión a internet'
  } else if (error.message) {
    // Error personalizado
    errorMessage = error.message
  }
  
  return errorMessage
}

// Función para mostrar notificaciones
export const showNotification = (message, type = 'info', duration = 3000) => {
  // Crear elemento de notificación
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `
  
  // Agregar estilos
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    z-index: 10000;
    max-width: 400px;
    animation: slideIn 0.3s ease;
  `
  
  // Estilos específicos por tipo
  const typeStyles = {
    success: 'border-left: 4px solid #28a745;',
    error: 'border-left: 4px solid #dc3545;',
    warning: 'border-left: 4px solid #ffc107;',
    info: 'border-left: 4px solid #17a2b8;'
  }
  
  notification.style.cssText += typeStyles[type] || typeStyles.info
  
  // Agregar al DOM
  document.body.appendChild(notification)
  
  // Función para cerrar
  const closeNotification = () => {
    notification.style.animation = 'slideOut 0.3s ease'
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }
  
  // Event listeners
  const closeBtn = notification.querySelector('.notification-close')
  closeBtn.addEventListener('click', closeNotification)
  
  // Auto-cerrar después del tiempo especificado
  if (duration > 0) {
    setTimeout(closeNotification, duration)
  }
  
  // Agregar estilos CSS para animaciones
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style')
    style.id = 'notification-styles'
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      
      .notification-message {
        flex: 1;
        color: #2c3e50;
        font-size: 14px;
      }
      
      .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }
      
      .notification-close:hover {
        background-color: #f8f9fa;
        color: #333;
      }
    `
    document.head.appendChild(style)
  }
}

// Función para validar formularios
export const validateForm = (formData, rules) => {
  const errors = {}
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = formData[field]
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = `${rule.label || field} es requerido`
      continue
    }
    
    if (value && rule.minLength && value.toString().length < rule.minLength) {
      errors[field] = `${rule.label || field} debe tener al menos ${rule.minLength} caracteres`
      continue
    }
    
    if (value && rule.maxLength && value.toString().length > rule.maxLength) {
      errors[field] = `${rule.label || field} debe tener máximo ${rule.maxLength} caracteres`
      continue
    }
    
    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${rule.label || field} tiene un formato inválido`
      continue
    }
    
    if (value && rule.min && Number(value) < rule.min) {
      errors[field] = `${rule.label || field} debe ser mayor o igual a ${rule.min}`
      continue
    }
    
    if (value && rule.max && Number(value) > rule.max) {
      errors[field] = `${rule.label || field} debe ser menor o igual a ${rule.max}`
      continue
    }
  }
  
  return errors
}

// Función para formatear fechas
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  
  return new Date(date).toLocaleDateString('es-ES', defaultOptions)
}

// Función para formatear números
export const formatNumber = (number, decimals = 2) => {
  return Number(number).toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
} 