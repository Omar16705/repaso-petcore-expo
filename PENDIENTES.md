# Pendientes en la página de repaso PetCore

Comparado contra el proyecto real (`C:\Users\omara\Desktop\PetCore`) y la rúbrica de Defensa Externa.

## 1. Cifras desactualizadas (actualizar texto)

- **Número de tablas**: la página dice "48 tablas" en varios lugares. El script real (`PetCore_DataBase 6.sql`) ya tiene **50 CREATE TABLE**.
  - Archivos a corregir: `index.html`, `base-datos.html` (x2), `arquitectura-backend.html`, `preguntas-defensa.html` (x2)
- **Número de módulos del backend**: `preguntas-defensa.html` dice "47 módulos". La carpeta real `Backend-PetCore/src/main/java/PTC_PETCORE/API/modules/` tiene **51 módulos**.

## 2. Falta cubrir: Diagrama de casos de uso general (Criterio 8 de la rúbrica)

La rúbrica pide explícitamente un **diagrama de casos de uso general** para evidenciar las políticas de autenticación/autorización. No está mencionado en ninguna página de repaso ni existe el diagrama en el proyecto.

- Crear el diagrama (uno por rol o uno general con actores: Administrador, Veterinario, Farmacéutico, Recepcionista, Propietario).
- Agregar una sección en `roles-permisos.html` o `conceptos-clave.html` que lo muestre/explique, junto con el guion de demo que ya tienes (401 sin sesión, 403 rol equivocado, bloqueo de "atrás").

## 3. Falta cubrir: Alcance CRUD del rol Propietario en la app móvil (Criterio 5)

`roles-permisos.html` no detalla qué CRUD tiene realmente el Propietario en el móvil (no tiene DELETE de citas, por ejemplo — es intencional, no un bug).

- Agregar una tabla o sección explicando el alcance CRUD por rol en el móvil, y la justificación de por qué el Propietario no tiene ciertas operaciones (evita que en la defensa intenten "demostrar todo" y se traben).

## 4. Falta mencionar: verificación de despliegue en vivo (Criterio 9)

No hay `vercel.json` en el repo del frontend (no es obligatorio, pero no hay rastro de la config de despliegue). Agregar un recordatorio en el guion de presentación o checklist de `index.html`:

- Confirmar antes de la defensa que `petcore-seven.vercel.app` / `petcore-oerh.vercel.app` siguen activos y actualizados.
- Confirmar que la app móvil (Capacitor) está instalada y probada en el dispositivo físico que se usará.

## 5. Nota aparte (no es de la página de repaso, es del proyecto)

El comentario en el script SQL dice que las contraseñas usan BCrypt, pero el código real usa Argon2 (`Argon2PasswordConfig.java`). Si el jurado lee el `.sql`, puede generar una pregunta incómoda. Vale la pena corregir el comentario en `PetCore_DataBase 6.sql` línea 86, aunque sea un detalle menor.
