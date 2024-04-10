import { ExtraOptions, RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./@core/guards/auth.guard";
import { ExampleRoutingModule } from './@Example/example-routing.module';
import { FireServiceModule } from "./home/reports/fire-service/fire-service.module";
import { NgModule } from "@angular/core";
import { OneColumnLayoutComponent } from "./@theme/layouts/one-column/one-column.layout";
import { ReconciliationModule } from './home/reconciliation/reconciliation.module';
import { TemporaryBillModule } from './home/temporary-bill/temporary-bill.module';

export const routes: Routes = [
  {
    path: "quick-access",
    loadChildren: () =>
      import("./home/QuickAccess/quick-access.module").then(
        (m) => m.QuickAccessModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",component:OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  // {
  //   path: "alarm-actions",
  //   loadChildren: () =>
  //     import("./AlarmActions/alarm-actions.module").then(
  //       (m) => m.AlarmActionsModule
  //     ),
  //   canActivate: [AuthGuard],
  // },
  {
    path: "auth",
    loadChildren: () =>
      import("./Authentication/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "user-management",
    loadChildren: () =>
      import("./home/userManagement/user-management.module").then(
        (m) => m.UserManagementModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: "bill",component:OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/penalty-bill/penalty-bill.module").then(
        (m) => m.PenaltyBillModule
      ),
  },
  {
    path: "bill-report", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/reports/bill-print/bill-print.module").then(
        (m) => m.BillPrintModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: "temporary", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/temporary-bill/temporary-bill.module").then(
        (m) => m.TemporaryBillModule,
      ),
      canActivate: [AuthGuard],
  },
  
  {
    path: "setup-pages",
    loadChildren: () =>
      import("./home/SetupPages/setup-pages.module").then((m) => m.SetupPagesModule),
      canActivate: [AuthGuard],
  },
  {
    path:"krishi",
    loadChildren:()=>
    import("./home/reports/krishi/krishi.module").then((m)=>m.KrishiModule),
    canActivate: [AuthGuard],
  },

  {
    path: "supplementary",component:OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/supplementary-bill/supplementary-bill.module").then((m) => m.SupplementaryBillModule),
      canActivate: [AuthGuard],
  },

 
  {
    path: "dc-rc", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/dc-rc-bill/dc-rc-bill.module").then((m) => m.DcRcBillModule),
      canActivate: [AuthGuard],
  },

  {
    path: "misc-charge", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/misccharge-bill/misccharge-bill.module").then((m) => m.MiscchargeBillModule),
      canActivate: [AuthGuard],
  },

  {
    path: "mod", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/mod/mod.module").then((m) => m.ModModule),
      canActivate: [AuthGuard],
  },
  {
    path: "ministry-customer", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/ministry-customer/ministry-customer.module").then((m) => m.MinistryCustomerModule),
      canActivate: [AuthGuard],
  },
  {
    path: "postpaid-to-prepaid", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/postpaid-to-prepaid/postpaid-to-prepaid.module").then((m) => m.PostpaidToPrepaidModule),
      canActivate: [AuthGuard],
  },

  {
    path: "serilog", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/serilog-event/serilog-event.module").then((m) => m.SerilogEventModule),
      canActivate: [AuthGuard],
  },

  {
    path:"payment",component:OneColumnLayoutComponent,
    loadChildren:() =>
    import("./home/payment/payment.module").then((m) => m.PaymentModule)
  },

  {
    path: "example",
    loadChildren: () =>
      import("./@Example/example.module").then((m) => m.ExampleModule), canActivate: [AuthGuard],
  },
  {
    path: "ministry", 
    loadChildren: () => import("./home/reports/ministry/ministry.module").then((m)=>m.MinistryModule),
    canActivate: [AuthGuard],
  },
  {
    path: "police",component:OneColumnLayoutComponent,
    loadChildren: () => import("./home/reports/police/police.module").then((m)=>m.PoliceModule),
    canActivate: [AuthGuard],
  },
  {
    path: "pouroshova-citycorporation",
    loadChildren: () => import("./home/reports/pouroshova-and-corporation/pouroshova-and-corporation.module").then((m)=>m.PouroshovaAndCorporationModule),
    canActivate: [AuthGuard],
  },
  {
    path: "nonbengali",
    loadChildren: () => import("./home/reports/non-bengali-bihary-bill-arrear/non-bengali-bihary-bill-arrear.module").then((m)=>m.NonBengaliBiharyBillArrearModule),
    canActivate: [AuthGuard],
  },
  {
    path: "religious",
    loadChildren: () => import("./home/reports/religious/religious.module").then((m)=>m.ReligiousModule),
    canActivate: [AuthGuard],
  },
  // {
  //   path: "customer-arrear",
  //   loadChildren: () => import("./home/reports/customer-arrear/customer-arrear.module").then((m)=>m.CustomerArrearModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: "mis-report",
    loadChildren: () => import("./home/reports/mis-report/mis-report.module").then((m)=>m.MisReportModule),
    canActivate: [AuthGuard],
  },
  
  {
    path: "startup",
    loadChildren: () =>
      import("./startup-pages/startup.module").then((m) => m.StartupModule),
  },

  {
    path: "apa", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/apa/apa.module").then((m) => m.ApaModule),
      canActivate: [AuthGuard],
  },

  {
    path: "untraced-consumer", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/untraced-consumer/untraced-consumer.module").then((m) => m.UntracedConsumerModule),
      canActivate: [AuthGuard],
  },

  {
    path: "reconciliation", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/reconciliation/reconciliation.module").then((m) => m.ReconciliationModule),
    canActivate: [AuthGuard],
  },

  {
    path: "app-user-management", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/user-management-app/user-management-app.module").then((m) => m.UserManagementAppModule),
    canActivate: [AuthGuard],
  },

  {
    path: "fire-service", component: OneColumnLayoutComponent,
    loadChildren: () =>
      import("./home/reports/fire-service/fire-service.module").then((m) => m.FireServiceModule),
    canActivate: [AuthGuard],
  },

  { path: "", redirectTo: "startup", pathMatch: "full" },
  { path: "**", redirectTo: "startup" },
];
const config: ExtraOptions = {
  useHash: false,
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}











