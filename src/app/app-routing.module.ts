import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountListComponent } from './accounts/account-list.component';
import { AccountNewComponent } from './accounts/account-new.component';
import { AccountShowComponent } from './accounts/account-show.component';

import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: "accounts", component: AccountListComponent },
  { path: "accounts/new", component: AccountNewComponent },
  { path: "account/:id", component: AccountShowComponent },
  { path: "", redirectTo: "/accounts", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
