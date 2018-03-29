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
  {
    path: 'categories',
    loadChildren: 'app/categories/categories.module#CategoriesModule'
  },
  {
    path: 'types',
    loadChildren: 'app/types/types.module#TypesModule'
  },
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
