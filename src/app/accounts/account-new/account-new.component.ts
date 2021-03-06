import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AccountService } from './../shared/account.service';
import { Account } from './../shared/account';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.css']
})
export class AccountNewComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {
    const account = this.prepareSave();
    this.accountService.addAccount(account)
      .subscribe(acc => {
        this.alertService.success(`${acc.name} has been created with success`, true);
        this.router.navigate(['/accounts']);
      });
  }

  reset(): void {
    this.form.reset();
  }

  goBack(): void {
    this.location.back();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      balance: 0.0,
      isActive: ['', Validators.required]
    });
    this.form.controls['isActive'].setValue(true, { onlySelf: true });
  }

  private prepareSave(): Account {
    const formModel = this.form.value;
    const saveAccount: Account = {
      id: 0,
      name: formModel.name as string,
      balance: formModel.balance as number,
      isActive: formModel.isActive as boolean
    };
    return saveAccount;
  }
}
