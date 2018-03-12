import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { TransactionService } from '../shared/transaction.service';
import { AlertService } from '../../shared/services/alert.service';
import { AccountService } from '../../accounts/shared/account.service';


@Component({
  selector: 'app-transaction-new',
  templateUrl: './transaction-new.component.html',
  styleUrls: ['./transaction-new.component.css']
})
export class TransactionNewComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private transactionService: TransactionService,
    private alertService: AlertService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {
    //
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
      account_id: ''
    });
  }

}
