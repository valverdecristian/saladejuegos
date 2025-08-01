import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'juegos',
    loadComponent: () =>
      import('./juegos/juegos.component').then((m) => m.JuegosComponent),
    children: [
      {
        path: 'ahorcado',
        loadComponent: () =>
          import('./juegos/ahorcado/ahorcado.component').then(
            (m) => m.AhorcadoComponent
          ),
      },
      {
        path: 'mayormenor',
        loadComponent: () =>
          import('./juegos/mayor-menor/mayor-menor.component').then(
            (m) => m.MayorMenorComponent
          ),
      },
      {
        path: 'preguntados',
        loadComponent: () =>
          import('./juegos/preguntados/preguntados.component').then(
            (m) => m.PreguntadosComponent
          ),
      },
    ],
  },
  {
    path: 'quiensoy',
    loadComponent: () =>
      import('./pages/quiensoy/quiensoy.component').then((m) => m.QuiensoyComponent),
  },
];