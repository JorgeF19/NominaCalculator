Calculadora Nómina TPV es una aplicación web para el registro y cálculo de nómina quincenal. Permite ingresar datos laborales, calcular valores de nómina, guardar registros históricos y exportar los datos. Además, soporta integración con una base de datos MongoDB para almacenamiento persistente.

1. Instalacion y ejecucion
Abre index.html con Live Server o un servidor local para evitar problemas con rutas relativas de imágenes.

2. Backend
   El backend fue hecho en mongoDB, para activarlo:
   $ node backend/server.js
   el backend estará disponible en: http://localhost:3001

Funcionalidades

Ingreso de datos

Horas laboradas, horas festivas, horas domingo, días de vacaciones, días ausente y porcentaje variable.

Cálculo de nómina

Botones para calcular la primera y segunda quincena.

Historial de registros

Visualización de registros guardados con fecha y valor total.

Eliminar registros

Elimina registros individuales o todos los registros.

Exportar CSV:

Descarga los registros en formato CSV.

Integración con MongoDB

Los registros pueden guardarse y consultarse desde una base de datos MongoDB usando el backend Node.js
