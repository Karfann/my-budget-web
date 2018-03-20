import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ROUTES
import { AppRoutingModule } from './app-routing.module';

// SERVICES
import { AccountService } from './accounts/shared/account.service';
import { AlertService } from './shared/services/alert.service';
import { LogService } from './shared/services/log.service';
import { TransactionService } from './transactions/shared/transaction.service';
import { StatusService } from './status/shared/status.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { AlertComponent } from './shared/alert/alert.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AlertComponent],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AccountService,
    AlertService,
    LogService,
    TransactionService,
    StatusService],
  // entryComponents: [TransactionEditComponent]
  bootstrap: [AppComponent]
})
export class AppModule { }
