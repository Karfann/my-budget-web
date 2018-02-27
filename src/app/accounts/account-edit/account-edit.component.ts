import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Account } from "./../model/account";
import { AccountService } from "./../shared/account.service";

@Component({
  selector: "app-account-edit",
  templateUrl: "./account-edit.component.html",
  styleUrls: ["./account-edit.component.css"]
})
export class AccountEditComponent implements OnInit {
  account: Account;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAccount();
    this.createForm();
    this.setFormValue();
  }

  getAccount(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.accountService.getAccount(id).subscribe(acc => (this.account = acc));
  }

  onSubmit(): void {
    this.prepareSave();
    this.accountService.updateAccount(this.account);
    console.log(this.account);
    this.router.navigate(["/accounts"]);
  }

  goBack(): void {
    this.location.back();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      isActive: ["", Validators.required]
    });
  }

  private setFormValue(): void {
    this.form.setValue({
      name: this.account.name,
      isActive: this.account.isActive
    });
  }

  private prepareSave(): void {
    const formModel = this.form.value;
    this.account.isActive = formModel.isActive as boolean;
    this.account.name = formModel.name as string;
  }
}