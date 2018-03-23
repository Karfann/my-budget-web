import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../../accounts/shared/account.service';
import { Account } from '../../accounts/shared/account';

import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../shared/transaction';

import { AlertService } from '../../shared/services/alert.service';
import { Status } from '../../status/shared/status';
import { StatusService } from '../../status/shared/status.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {

  form: FormGroup;
  accounts: Account[];
  status: Status[];
  transaction: Transaction;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private alertService: AlertService,
    private transactionService: TransactionService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  onSubmit(): void {
    const editTransaction = this.prepareSave();
    this.transactionService.updateTransaction(editTransaction)
      .subscribe(_ => {
        this.alertService.success('Transaction has been updated with success!', true);
        this.router.navigate(['/transactions']);
      });
  }

  deleteTransaction(): void {
    this.transactionService.deleteTransaction(this.transaction)
      .subscribe(_ => {
        this.alertService.success('Transaction has been deleted with success!', true);
        this.router.navigate(['/transactions']);
      });
  }

  private getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(
        list => {
          this.accounts = this.accountService.getActiveAccounts(list),
            this.getStatus();
        }
      );
  }

  private getStatus(): void {
    this.statusService.getStatuses()
      .subscribe(list => {
        this.status = this.statusService.getActiveStatus(list),
          this.getTransaction();
      });
  }

  private getTransaction(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.transactionService
      .getTransaction(id)
      .subscribe(
        t => {
          this.transaction = t,
            this.createForm(),
            this.setFormValue(),
            this.validateIfAttrsIsActive();
        }
      );
  }

  private setFormValue(): void {
    const tempDate = new Date(this.transaction.date);
    this.form.setValue({
      date: this.formatDateToDatepicker(tempDate),
      description: this.transaction.description,
      note: this.transaction.note,
      amount: this.transaction.amount,
      account_id: this.transaction.account_id,
      status_id: this.transaction.status_id
    });
  }

  private createForm(): any {
    this.form = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      note: '',
      amount: ['0.00', Validators.required],
      account_id: ['', Validators.required],
      status_id: ['', Validators.required]
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

  private prepareSave(): Transaction {
    const formModel = this.form.value;
    const save: Transaction = {
      id: this.transaction.id,
      date: this.formatDate(formModel.date as number),
      description: formModel.description as string,
      note: formModel.note as string,
      amount: formModel.amount as number,
      account_id: formModel.account_id as number,
      status_id: formModel.status_id as number
    };
    return save;
  }

  private validateIfAttrsIsActive(): void {

    let msg = '';

    const qtdAccounts = this.accounts.filter(a => a.id === this.transaction.account_id);
    if (qtdAccounts.length === 0) { msg = 'Account /'; }

    const qtdStatus = this.status.filter(a => a.id === this.transaction.status_id);
    if (qtdStatus.length === 0) { msg += ' Status /'; }

    if (msg.length > 0) {
      this.alertService.warn(`This transaction has an unactivated ${msg}.`);
    }
  }



}
