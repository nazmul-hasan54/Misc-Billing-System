import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { QuickAccessComponent } from './quick-access.component';

const routes: Routes = [
  {
    path: "",
    component: QuickAccessComponent,
    children: [
      {
        path: "dashboard", 
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      // {
      //   path: "lta",
      //   loadChildren: () => import("./lta/lta.module").then((m) => m.LtaModule),
      // },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      // {
      //   path: "maintenance",
      //   loadChildren: () =>
      //     import("./maintenance/maintenance.module").then(
      //       (m) => m.MaintenanceModule
      //     ),
      // },
      // {
      //   path: "reports",
      //   loadChildren: () =>
      //     import("./reports/reports.module").then((m) => m.ReportsModule),
      // },
      // {
      //   path: "administration",
      //   loadChildren: () =>
      //     import("./administration/administration.module").then(
      //       (m) => m.AdministrationModule
      //     ),
      // },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickAccessRoutingModule {
}
