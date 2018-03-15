import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../../accounts/shared/account.service';
import { Account } from '../../accounts/shared/account';
import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../shared/transaction';
import { AlertService } from '../../shared/services/alert.service';


@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {

  @Input() transaction_id;
  form: FormGroup;
  isFormReady = false;
  accounts: Account[];
  transaction: Transaction;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.getAccounts();
    this.getTransaction();
  }

  onSubmit(): void {
    //
  }

  private getTransaction(): void {
    this.transactionService
      .getTransaction(this.transaction_id)
      .subscribe(
        t => {
          this.transaction = t,
            console.log(t);
          this.createForm();
          this.setFormValue();
        }
      );
  }

  private getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(
        list => this.accounts = list
      );
  }

  private setFormValue(): void {
    const tempDate = new Date(this.transaction.date);
    this.form.setValue({
      date: this.formatDateToDatepicker(tempDate),
      description: this.transaction.description,
      note: this.transaction.note,
      amount: this.transaction.amount,
      account_id: this.transaction.account_id
    });
  }

  private createForm(): any {
    this.form = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      note: '',
      amount: ['0.00', Validators.required],
      account_id: ['', Validators.required]
    });
  }

  private formatDate(data: any): Date {
    const temp = `${data['year']}/${data['month']}/${data['day']}`;
    return new Date(temp);
  }

  private formatDateToDatepicker(date: Date): any {
    const datepicker = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    return datepicker;
  }

}