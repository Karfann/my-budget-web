import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ROUTES
import { AppRoutingModule } from './app-routing.module';

// SERVICES
import { AccountService } from './accounts/shared/account.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

// MODULES
import { AccountsModule } from './accounts/accounts.module';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/services/alert.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PageNotFoundComponent, AlertComponent],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AccountsModule,
    AppRoutingModule
  ],
  providers: [AccountService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {}
