import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AccountMainComponent } from "./account-main/account-main.component";
import { AccountListComponent } from "./account-list/account-list.component";
import { AccountNewComponent } from "./account-new/account-new.component";
import { AccountEditComponent } from "./account-edit/account-edit.component";

const routes: Routes = [
  {
    path: "",
    component: AccountMainComponent,
    children: [
      { path: "", component: AccountListComponent },
      { path: "new", component: AccountNewComponent },
      { path: "detail/:id", component: AccountEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {}
