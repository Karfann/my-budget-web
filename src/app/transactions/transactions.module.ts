import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TransactionRoutingModule } from './/transaction-routing.module';

import { TransactionMainComponent } from './transaction-main/transaction-main.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionNewComponent } from './transaction-new/transaction-new.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TransactionRoutingModule
  ],
  declarations: [
    TransactionMainComponent,
    TransactionListComponent,
    TransactionNewComponent
  ]
})
export class TransactionsModule { }
