# 🛒 Sistema de Gestión Comercial

Este proyecto es una solución integral para la administración de procesos de compra-venta, inventario, finanzas y gestión de usuarios/proveedores. La aplicación cuenta con un **backend robusto** con logicas a la medidad del cliente y un **frontend intuitivo** y hecho a la medida.

---

## 📁 Estructura del Proyecto

├── Backend/ # API RESTful: lógica de negocio, autenticación, base de datos, etc.
├── Frontend-bigjuice/ # Aplicación web: interfaz de usuario (React.)

---

## 🔧 Funcionalidades Principales

### 🛍️ Ventas y Compras
- Registro de ventas y compras
- Historial y reporte por fechas

### 📧 Notificación por email
- Notificación para los admins via email en caso de ventas con 100% de descuento

### 📦 Inventario
- Control de productos y existencias
- Actualización automática tras ventas/compras
- Alertas por stock bajo

### 💰 Finanzas
- Gestión de ingresos y egresos
- Estado de cuentas
- Reportes financieros básicos

### 👥 Usuarios y Roles
- Módulo de autenticación (login, registro)
- Asignación de roles (admin, vendedor, etc.)
- Permisos según rol

### 🤝 Proveedores
- Registro y gestión de proveedores
- Historial de compras por proveedor
- Seguimiento de pagos

---

## ⚙️ Tecnologías Utilizadas

### Backend
- Node.js / Express
- Sequelize / PostgreSQL o MySQL
- JWT para autenticación
- Joi, dotenv, bcrypt, cors, node-mailjet etc.

### Frontend
- React.js
- Axios para consumo de API
- Validaciones con formularios dinámicos

---
