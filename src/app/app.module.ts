import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AccountService } from './accounts/shared/account.service';

import { AppComponent } from './app.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { AccountNewComponent } from './accounts/account-new/account-new.component';
import { AccountEditComponent } from './accounts/account-edit/account-edit.component';


import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AccountMainComponent } from './accounts/account-main/account-main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AccountListComponent,
    AccountNewComponent,
    AccountEditComponent,
    AccountMainComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
