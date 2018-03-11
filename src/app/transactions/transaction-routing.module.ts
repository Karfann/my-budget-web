import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionMainComponent } from './transaction-main/transaction-main.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionMainComponent,
    children: [
      {path: '', component: TransactionListComponent},
      // { path: 'new', component: AccountNewComponent },
      // { path: 'detail/:id', component: AccountEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
