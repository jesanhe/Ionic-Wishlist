import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pendientes',
        children: [
          {
            path: '',
            loadChildren:
              '../pendientes/pendientes.module#PendientesPageModule',
          },
        ],
      },
      {
        path: 'terminados',
        children: [
          {
            path: '',
            loadChildren:
              '../terminados/terminados.module#TerminadosPageModule',
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/pendientes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/pendientes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
