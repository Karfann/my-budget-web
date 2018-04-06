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

import { TypeService } from '../../types/shared/type.service';
import { Type } from '../../types/shared/type';

@Component({
  selector: 'app-transaction-new',
  templateUrl: './transaction-new.component.html',
  styleUrls: ['./transaction-new.component.css']
})
export class TransactionNewComponent implements OnInit {
  form: FormGroup;
  accounts: Account[];
  categories: Category[];
  status: Status[];
  types: Type[];
  hideDestinyAccount = true;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private transactionService: TransactionService,
    private alertService: AlertService,
    private accountService: AccountService,
    private statusService: StatusService,
    private categoryService: CategoryService,
    private typeService: TypeService
  ) { }

  ngOnInit() {
    this.fillDropdown();
    this.createForm();
  }

  onSubmit(): void {
    const transaction = this.prepareSave();
    this.transactionService.addTransaction(transaction)
      .subscribe(t => {
        this.alertService.success('Transaction has been created with success', true);
        this.router.navigate(['/transactions']);
      });
  }

  goBack(): void {
    this.location.back();
  }

  reset(): void {
    this.form.reset();
  }

  checkType(type_id: number): void {
    const aux: Type[] = this.types.filter(item => item.id === +type_id);
    if (aux.length > 0) {
      const type: Type = aux[0];
      this.hideDestinyAccount = +type.value !== 0;
    } else {
      this.hideDestinyAccount = true;
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      note: '',
      amount: ['0.00', Validators.required],
      account_id: ['', Validators.required],
      status_id: ['', Validators.required],
      category_id: '',
      type_id: ['', Validators.required],
      account_destiny_id: ''
    });
  }

  private fillDropdown(): void {
    this.getAccounts();
    this.getStatus();
    this.getCategories();
    this.getTypes();
  }

  private getAccounts(): void {
    this.accountService.getActiveAccounts()
      .subscribe(list => this.accounts = list);
  }

  private getStatus(): void {
    this.statusService.getActiveStatuses()
      .subscribe(list => this.status = list);
  }

  private getCategories(): void {
    this.categoryService.getActiveCategories()
      .subscribe(list => this.categories = list);
  }

  private getTypes(): void {
    this.typeService.getActiveTypes()
      .subscribe(list => this.types = list);
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
      category_id: formModel.category_id as number,
      type_id: formModel.type_id as number,
      account_destiny_id: formModel.account_destiny_id as number
    };
    return save;
  }

  private formatDate(data: any): Date {
    const temp = `${data['year']}/${data['month']}/${data['day']}`;
    return new Date(temp);
  }

}
