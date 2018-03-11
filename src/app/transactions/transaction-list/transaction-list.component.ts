import { Component, OnInit } from '@angular/core';

import { TransactionService } from './../shared/transaction.service';
import { Transaction } from './../shared/transaction';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[];

  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    this.getTransactions();
  }

  private getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(list => this.transactions = list);
  }
}
