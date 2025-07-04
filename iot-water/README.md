# IoT Water Management - Sistema de Gestión de Nodos

Una aplicación web moderna para gestionar nodos IoT en sistemas de riego y monitoreo de agua.

## 🚀 Características

- **CRUD Completo de Nodos**: Crear, leer, actualizar y eliminar nodos IoT
- **Gestión de Información**: Código de nodo, tipo, fecha de instalación y nivel de batería
- **Interfaz Moderna**: Diseño responsive con Vue 3 y CSS moderno
- **Navegación por Rutas**: Sistema de rutas con Vue Router
- **Indicadores Visuales**: Barras de batería con colores según el nivel
- **Validación de Formularios**: Campos requeridos y validación en tiempo real

## 📋 Campos de los Nodos

Cada nodo incluye la siguiente información:

- **Código de Nodo**: Identificador único (ej: NODO-001)
- **Tipo de Nodo**: Categoría del dispositivo (Sensor de Temperatura, Actuador de Riego, etc.)
- **Fecha de Instalación**: Cuándo fue instalado el nodo
- **Nivel de Batería**: Porcentaje de batería con indicador visual
- **Descripción**: Información adicional opcional

## 🛠️ Tecnologías Utilizadas

- **Vue 3**: Framework de JavaScript progresivo
- **Vue Router**: Sistema de enrutamiento
- **Vite**: Herramienta de construcción rápida
- **CSS3**: Estilos modernos con gradientes y animaciones

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── views/              # Vistas principales
│   ├── NodeList.vue    # Lista de nodos
│   ├── NodeCreate.vue  # Crear nuevo nodo
│   └── NodeUpdate.vue  # Actualizar nodo existente
├── services/           # Servicios de datos
│   └── nodeService.js  # Lógica CRUD de nodos
├── router/             # Configuración de rutas
│   └── index.js        # Definición de rutas
├── App.vue             # Componente principal
└── main.js             # Punto de entrada
```

## 🚀 Instalación y Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

4. **Vista previa de producción**:
   ```bash
   npm run preview
   ```

## 🛣️ Rutas Disponibles

- `/` - Redirige a la lista de nodos
- `/nodes` - Lista todos los nodos
- `/nodes/create` - Formulario para crear nuevo nodo
- `/nodes/update/:id` - Formulario para actualizar nodo existente

## 🎨 Características de la UI

- **Diseño Responsive**: Se adapta a diferentes tamaños de pantalla
- **Indicadores de Batería**: Barras de colores (verde, amarillo, rojo)
- **Animaciones Suaves**: Transiciones y efectos hover
- **Estados de Carga**: Spinners durante operaciones asíncronas
- **Mensajes de Error**: Alertas informativas para el usuario

## 🔧 Personalización

### Agregar Nuevos Tipos de Nodos

Edita el archivo `src/views/NodeCreate.vue` y `src/views/NodeUpdate.vue` para agregar nuevas opciones en el selector de tipo:

```html
<option value="Nuevo Tipo de Sensor">Nuevo Tipo de Sensor</option>
```

### Modificar el Servicio de Datos

El archivo `src/services/nodeService.js` contiene la lógica de datos. En una aplicación real, reemplazarías las funciones con llamadas a una API.

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes preguntas o problemas, por favor abre un issue en el repositorio.
