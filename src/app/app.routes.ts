import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'all-items',
    loadComponent: () =>
      import('./pages/all-items/all-items.page').then((m) => m.AllItemsPage),
  },
  {
    path: 'with-navigation',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'root',
      },
      {
        path: ':path',
        loadComponent: () =>
          import('./pages/with-navigation/with-navigation.page').then(
            (m) => m.WithNavigationPage,
          ),
      },
    ],
  },
];
