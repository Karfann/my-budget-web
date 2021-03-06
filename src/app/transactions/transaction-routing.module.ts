import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionMainComponent } from './transaction-main/transaction-main.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionNewComponent } from './transaction-new/transaction-new.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionMainComponent,
    children: [
      { path: '', component: TransactionListComponent },
      { path: 'new', component: TransactionNewComponent },
      { path: 'detail/:id', component: TransactionEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
