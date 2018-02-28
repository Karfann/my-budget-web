import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AccountMainComponent } from './account-main/account-main.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountNewComponent } from './account-new/account-new.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

import { AccountsRoutingModule } from './accounts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountsRoutingModule
  ],
  declarations: [
    AccountListComponent,
    AccountNewComponent,
    AccountEditComponent,
    AccountMainComponent,
  ]
})
export class AccountsModule { }
