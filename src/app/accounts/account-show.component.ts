
import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Account } from "./../models/account";
import { AccountService } from "./account.service";

@Component({
  selector: "app-account-show",
  templateUrl: "./account-show.component.html",
  styleUrls: ["./account-show.component.css"]
})
export class AccountShowComponent implements OnInit {
  
  account: Account;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.getAccount();
  }

  getAccount(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.getAccount(id)
                        .subscribe(acc => this.account = acc);
  }

  goBack(): void {
    this.location.back();
  }
}