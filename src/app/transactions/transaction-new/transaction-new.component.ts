import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../shared/transaction';

import { AlertService } from '../../shared/services/alert.service';

import { AccountService } from '../../accounts/shared/account.service';
import { Account } from '../../accounts/shared/account';

import { StatusService } from '../../status/shared/status.service';
import { Status } from '../../status/shared/status';

import { CategoryService } from '../../categories/shared/category.service';
import { Category } from '../../categories/shared/category';

@Component({
  selector: 'app-transaction-new',
  templateUrl: './transaction-new.component.html',
  styleUrls: ['./transaction-new.component.css']
})
export class TransactionNewComponent implements OnInit {
  form: FormGroup;
  accounts: Account[];
  status: Status[];
  categories: Category[];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private transactionService: TransactionService,
    private alertService: AlertService,
    private accountService: AccountService,
    private statusService: StatusService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.fillDropdown();
    this.createForm();
  }

  onSubmit(): void {
    const transaction = this.prepareSave();
    this.transactionService.addTransaction(transaction)
      .subscribe(t => {
        this.alertService.success('Transaction has been created with success', true),
          this.router.navigate(['/transactions']);
      });
  }

  goBack(): void {
    this.location.back();
  }

  reset(): void {
    this.form.reset();
  }

  private createForm(): void {
    this.form = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      note: '',
      amount: ['0.00', Validators.required],
      account_id: ['', Validators.required],
      status_id: ['', Validators.required],
      category_id: ['', Validators.required]
    });
    this.form.controls['account_id'].setValue('', { onlySelf: true });
  }
  private fillDropdown(): void {
    this.getAccounts();
    this.getStatus();
    this.getCategories();
  }
  private getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(list => this.accounts = this.accountService.getActiveAccounts(list));
  }

  private getStatus(): void {
    this.statusService.getStatuses()
      .subscribe(list => this.status = this.statusService.getActiveStatus(list));
  }

  private getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(list => this.categories = this.categoryService.getActiveCategories(list));
  }

  private prepareSave(): Transaction {
    const formModel = this.form.value;
    const save: Transaction = {
      id: 0,
      date: this.formatDate(formModel.date as number),
      description: formModel.description as string,
      note: formModel.note as string,
      amount: formModel.amount as number,
      account_id: formModel.account_id as number,
      status_id: formModel.status_id as number,
      category_id: formModel.status_id as number
    };
    return save;
  }

  private formatDate(data: any): Date {
    const temp = `${data['year']}/${data['month']}/${data['day']}`;
    return new Date(temp);
  }

}
