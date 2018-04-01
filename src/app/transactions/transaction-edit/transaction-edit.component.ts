import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Account } from '../../accounts/shared/account';
import { AccountService } from '../../accounts/shared/account.service';

import { Transaction } from '../shared/transaction';
import { TransactionService } from '../shared/transaction.service';

import { Status } from '../../status/shared/status';
import { StatusService } from '../../status/shared/status.service';

import { Category } from '../../categories/shared/category';
import { CategoryService } from '../../categories/shared/category.service';

import { ModalComponent } from '../../shared/modal/modal.component';
import { AlertService } from '../../shared/services/alert.service';

import { Type } from '../../types/shared/type';
import { TypeService } from '../../types/shared/type.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {

  form: FormGroup;
  accounts: Account[];
  status: Status[];
  categories: Category[];
  types: Type[];
  transaction: Transaction;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private alertService: AlertService,
    private transactionService: TransactionService,
    private statusService: StatusService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private modalService: NgbModal
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

  public open(): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.message = `delete this transaction: ${this.transaction.description}`;
    modalRef.componentInstance.returnAction.subscribe(($e) => {
      console.log($e);
      if ($e) {
        this.deleteTransaction();
      }
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
          this.getCategories();
      });
  }

  private getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(list => {
        this.categories = this.categoryService.getActiveCategories(list),
          this.getTypes();
      });
  }

  private getTypes(): void {
    this.typeService.getTypes()
      .subscribe(list => {
        this.types = this.typeService.getActiveTypes(list),
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
      status_id: this.transaction.status_id,
      category_id: this.transaction.category_id,
      type_id: this.transaction.type_id
    });
  }

  private createForm(): any {
    this.form = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      note: '',
      amount: ['0.00', Validators.required],
      account_id: ['', Validators.required],
      status_id: ['', Validators.required],
      category_id: ['', Validators.required],
      type_id: ['', Validators.required]
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
      status_id: formModel.status_id as number,
      category_id: formModel.category_id as number,
      type_id: formModel.type_id as number
    };
    return save;
  }

  private validateIfAttrsIsActive(): void {

    let msg = '';

    const qtdAccounts = this.accounts.filter(a => a.id === this.transaction.account_id);
    if (qtdAccounts.length === 0) { msg = 'Account; '; }

    const qtdStatus = this.status.filter(a => a.id === this.transaction.status_id);
    if (qtdStatus.length === 0) { msg += 'Status; '; }

    const qtdCategories = this.categories.filter(a => a.id === this.transaction.category_id);
    if (qtdCategories.length === 0) { msg += 'Categories; '; }

    if (msg.length > 0) {
      this.alertService.warn(`This transaction has an unactivated ${msg}`);
    }
  }

}
