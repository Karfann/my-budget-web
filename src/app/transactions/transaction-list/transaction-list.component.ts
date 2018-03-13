import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TransactionService } from './../shared/transaction.service';
import { Transaction } from './../shared/transaction';
import { AlertService } from '../../shared/services/alert.service';

import { TransactionEditComponent } from '../transaction-edit/transaction-edit.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[];

  constructor(
    private transactionService: TransactionService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getTransactions();
  }

  private getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(list => this.transactions = list);
  }

  public open(transaction_id: number): void {
    const modalRef = this.modalService.open(TransactionEditComponent, { size: 'lg' });
    modalRef.componentInstance.transaction_id = transaction_id;
  }
}
