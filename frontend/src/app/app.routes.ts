import { Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
  { 
    path: 'home', 
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: '**', 
    redirectTo: 'home/LandingPage'
  }
];

