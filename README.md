# README - Frontend del Sistema de Gestión de Bares

![Log In](https://i.postimg.cc/prg7kH7z/login-Web-App.png)
<br>

## Descripción del Proyecto

Este frontend está diseñado para complementar el sistema de gestión de bares, proporcionando una interfaz intuitiva y moderna. Utiliza **Angular 17** junto con **Angular Material** para los componentes de la interfaz y **Chart.js** para la visualización de datos en el dashboard.

## Estructura del Proyecto

La estructura del proyecto está organizada en módulos que facilitan la gestión y escalabilidad:

```
src/
├── app/
│   ├── pages/
│   │   ├── sales/
│   │   ├── saleshistory/
│   │   ├── dashboard/
│   │   └── ...
│   ├── services/
│   │   ├── beverage.service.ts
│   │   ├── table.service.ts
│   │   └── ...
│   ├── models/
│   └── material.module.ts
└── assets/
```

### Componentes Principales

- **Pages**: Contiene las vistas principales como `sales`, `saleshistory`, y `dashboard`.
- **Services**: Incluye servicios que manejan la lógica de negocio y la interacción con el backend.
- **Models**: Define las estructuras de datos utilizadas en la aplicación.

## Tecnologías Utilizadas

- **Angular 17**: Framework principal para construir aplicaciones web.
- **Angular Material**: Biblioteca de componentes UI que proporciona una serie de componentes predefinidos y estilos consistentes basados en Material Design.
- **Chart.js**: Biblioteca utilizada para crear gráficos interactivos en el dashboard, permitiendo visualizar datos relevantes sobre ventas y estadísticas.

![Register](https://i.postimg.cc/c4tG3Djf/register-Web-App.png)

![Dashboard](https://i.postimg.cc/sXHbQS4n/dashboard-Web-App.png)

![Gestión de mesas](https://i.postimg.cc/sfNRvFnV/mesas-Web-App.png)

![Stock de bebbidas](https://i.postimg.cc/mgxfyYfJ/stock-Web-App.png)

![Atender a clientes](https://i.postimg.cc/9MQvQ1ZR/atender-Web-App.png)

## Instalación

### Requisitos Previos

Asegúrate de tener instalado Node.js y Angular CLI. Puedes verificar la instalación con:

```bash
node -v
ng --version
```

### Pasos para Instalar

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd nombre-del-proyecto-angular
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Agrega Angular Material:
   ```bash
   ng add @angular/material
   ```

5. Instala Chart.js:
   ```bash
   npm install chart.js --save
   ```

6. Ejecuta la aplicación:
   ```bash
   ng serve --open
   ```

## Uso de Angular Material

Angular Material se utiliza para crear una interfaz atractiva y responsiva. Algunos componentes clave incluyen:

- **Buttons**: Para acciones como "Agregar" o "Cobrar".
- **Cards**: Para mostrar información sobre mesas y bebidas.
- **Tables**: Para listar bebidas disponibles y pedidos realizados.
  
Ejemplo de uso en un componente:

```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Bebidas Disponibles</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <table mat-table [dataSource]="beverages">
      <!-- Definición de columnas -->
    </table>
  </mat-card-content>
</mat-card>
```

## Visualización de Datos con Chart.js

El dashboard utiliza Chart.js para mostrar gráficos interactivos que representan las ventas diarias, mensuales, etc. Un ejemplo básico de un gráfico es:

```typescript
import { Chart } from 'chart.js';

const myChart = new Chart('myChart', {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo'],
    datasets: [{
      label: '# Ventas',
      data: [12, 19, 3],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
});
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Envía un pull request.
