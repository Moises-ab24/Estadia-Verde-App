# 🌿 Estadía Verde

> PWA para la gestión de estadías en el Hotel Monteverde, Costa Rica.

Estadía Verde es una aplicación web progresiva (PWA) diseñada para mejorar la experiencia de los huéspedes del hotel. Permite registrar la estadía, explorar actividades, consultar información del hotel, realizar solicitudes al staff y navegar el mapa de las instalaciones — todo desde el celular, sin necesidad de descargar ninguna app.

El acceso está restringido mediante un código QR exclusivo que se entregaria en recepción.
Ya disponible en 
(https://estadia-verde.vercel.app/)

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/52a646e7-1bad-4e5d-8377-bcb6dcb195f8" width="165" height="350"/>
  <img src="https://github.com/user-attachments/assets/1bf7a6b4-eead-4e26-9498-fcccae5f675a" width="165" height="350"/>
  <img src="https://github.com/user-attachments/assets/5fa94ba0-a8e5-4950-8cce-154e8fa95f98" width="165" height="350"/>
  <img src="https://github.com/user-attachments/assets/385c833e-c22c-4d55-aeb1-4de384e24248" width="165" height="350"/>
  <img src="https://github.com/user-attachments/assets/f5ac3d91-83cf-4ac9-a8b6-4e2002f77e4c" width="165" height="350"/>
</p>

## ✨ Funcionalidades

| Pantalla | Descripción |
|---|---|
| 🏠 Inicio | Registro del huésped con nombre, habitación y fechas de estadía |
| ✅ Actividades | Checklist interactivo de actividades disponibles en Monteverde |
| ℹ️ Info | Información del hotel y clima en tiempo real de Monteverde |
| 💬 Solicitudes | Solicitudes al staff vía WhatsApp con mensaje prearmado |
| 🗺️ Mapa | Mapa ilustrativo de las instalaciones del hotel |

### Acceso por QR
La app valida un código QR único entregado en recepción. Una vez escaneado, el acceso se mantiene activo por 7 días sin necesidad de volver a escanear.

### Clima en tiempo real
La pantalla de Info consume la API de Open-Meteo para mostrar la temperatura actual en Monteverde sin costo ni autenticación.

### Solicitudes al personal
Cada solicitud genera un mensaje prearmado en WhatsApp con el nombre y número de habitación del huésped, listo para enviar con un solo toque.

### Instalable como PWA
Al acceder desde el navegador del celular, la app se puede instalar directamente en la pantalla de inicio como una app nativa, sin pasar por ninguna tienda de aplicaciones.

## 🛠️ Stack

- **React 18 + TypeScript** — UI y lógica
- **Vite** — bundler y servidor de desarrollo
- **vite-plugin-pwa** — configuración PWA y service worker
- **lucide-react** — íconos
- **CSS Modules** — estilos por componente, sin frameworks de UI
- **localStorage** — persistencia de datos sin backend
- **Open-Meteo API** — clima en tiempo real (gratuita, sin API key)

## 📝 Resumen general del proyecto

```text
📱 Huésped escanea el QR en recepción
   ↓
🌐 Vercel sirve la app en el navegador
   ↓
⚛️ React monta la interfaz
   ↓
🔐 La app valida la clave del QR
   ↓
✅ Acceso concedido — sesión guardada por 7 días
   ↓
📝 Huésped registra nombre, habitación y fechas
   ↓
🗺️ Explora actividades, info del hotel y mapa
   ↓
💬 Solicita algo al personal
   ↓
📲 WhatsApp abre con mensaje prearmado
   ↓
✉️ Huésped envía la solicitud con un toque
```

## 📄 Licencia

Todos los derechos reservados · Moisés Abarca · 2026
