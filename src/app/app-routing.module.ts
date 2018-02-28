import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountMainComponent } from "./accounts/account-main/account-main.component";
import { AccountListComponent } from "./accounts/account-list/account-list.component";
import { AccountNewComponent } from "./accounts/account-new/account-new.component";
import { AccountEditComponent } from "./accounts/account-edit/account-edit.component";

import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

const appRoutes: Routes = [
  {
    path: "accounts",
    component: AccountMainComponent,
    children: [
      { path: "", component: AccountListComponent },
      { path: "new", component: AccountNewComponent },
      { path: "detail/:id", component: AccountEditComponent }
    ]
  },

  { path: "", redirectTo: "/accounts", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
