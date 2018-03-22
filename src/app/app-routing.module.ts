import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'accounts',
    loadChildren: 'app/accounts/accounts.module#AccountsModule'
  },
  {
    path: 'transactions',
    loadChildren: 'app/transactions/transactions.module#TransactionsModule'
  },
  {
    path: 'status',
    loadChildren: 'app/status/status.module#StatusModule'
  },
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
