# Sistema de Medidores IoT

CRUD completo para gestión de medidores de agua con Vue.js 3.

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📋 Funcionalidades

### CRUD de Medidores
- **Listar**: Ver todos los medidores con filtros y búsqueda
- **Crear**: Agregar nuevos medidores al sistema
- **Actualizar**: Modificar información de medidores existentes
- **Eliminar**: Remover medidores con confirmación

### Campos del Medidor
- Código (identificador único)
- Tipo (Residencial, Comercial, Industrial, Municipal)
- Consumo Actual (m³)
- Estado (Activo, En Mantenimiento, Inactivo)
- Marca y Modelo
- Fecha de Última Lectura
- Mensajes de mantenimiento automáticos

## 🔧 Configuración para Backend

Para conectar con tu API:

1. Edita `src/services/medidorService.js`
2. Cambia `API_BASE_URL` a tu URL del backend
3. Cambia `USE_MOCK_DATA` a `false`

```javascript
const API_BASE_URL = 'http://tu-backend.com/api'
const USE_MOCK_DATA = false
```

## 📱 Rutas

- `/` → Redirige a `/medidores`
- `/medidores` → Lista de medidores
- `/medidores/crear` → Crear nuevo medidor
- `/medidores/:id` → Ver detalle del medidor
- `/medidores/:id/editar` → Editar medidor

## 🛠️ Tecnologías

- Vue.js 3 (Composition API)
- Vue Router 4
- Axios para HTTP requests
- Font Awesome para iconos
- CSS3 con diseño responsive

## 📦 Estructura del Proyecto

```
src/
├── components/
│   └── LoadingSpinner.vue
├── services/
│   └── medidorService.js
├── utils/
│   └── errorHandler.js
├── views/
│   ├── MedidorList.vue
│   ├── MedidorCreate.vue
│   ├── MedidorEdit.vue
│   └── MedidorDetail.vue
├── App.vue
├── main.js
└── router/
    └── index.js
```

## 🚀 Características

- **CRUD Completo**: Crear, listar, ver detalles, editar y eliminar medidores
- **Interfaz Moderna**: Diseño responsive con Vue.js 3 y CSS moderno
- **Filtros y Búsqueda**: Buscar por código, marca o modelo, filtrar por estado
- **Estados de Medidores**: Activo, En Mantenimiento, Inactivo
- **Navegación Intuitiva**: Router con diferentes rutas para cada operación
- **Datos Mock**: Funciona sin backend para pruebas
- **Integración con API**: Preparado para conectar con backend real

## 📋 Campos del Medidor

- **Código**: Identificador único del medidor
- **Tipo**: Residencial, Comercial, Industrial, Municipal
- **Consumo Actual**: Lectura actual en m³
- **Estado**: Activo, En Mantenimiento, Inactivo
- **Marca**: Fabricante del medidor
- **Modelo**: Modelo específico del medidor
- **Fecha de Última Lectura**: Timestamp de la última lectura
- **Descripción**: Información adicional opcional

## 🗂️ Rutas Disponibles

- `/medidores` - Lista de todos los medidores
- `/medidores/crear` - Formulario para crear nuevo medidor
- `/medidores/:id` - Detalles de un medidor específico
- `/medidores/:id/editar` - Formulario para editar medidor

## 🎨 Diseño

- **Responsive**: Adaptable a móviles y tablets
- **Moderno**: Gradientes y sombras sutiles
- **Accesible**: Contraste adecuado y navegación por teclado
- **Intuitivo**: Iconos de Font Awesome y colores semánticos

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de producción
```

## 📝 Notas Técnicas

- **Vue.js 3**: Composition API
- **Vue Router 4**: Navegación SPA
- **Axios**: Cliente HTTP para API
- **Font Awesome**: Iconos
- **CSS Grid/Flexbox**: Layout moderno
- **LocalStorage**: Persistencia de datos mock

## 🔄 Estados del Medidor

- **🟢 Activo**: Funcionando normalmente
- **🟡 En Mantenimiento**: En proceso de mantenimiento
- **🔴 Inactivo**: No operativo

## 📊 Tipos de Medidor

- **Residencial**: Viviendas particulares
- **Comercial**: Negocios y comercios
- **Industrial**: Fábricas y plantas
- **Municipal**: Servicios públicos

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas, contactar a través de:
- Email: soporte@iot-water.com
- Issues: GitHub Issues
- Documentación: Wiki del proyecto
