import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Status } from '../shared/status';
import { StatusService } from '../shared/status.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-status-new',
  templateUrl: './status-new.component.html',
  styleUrls: ['./status-new.component.css']
})
export class StatusNewComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private statusService: StatusService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {
    const newStatus = this.prepareSave();
    this.statusService.addStatus(newStatus)
      .subscribe(s => {
        this.alertService.success(`${s.name} has been created with success`, true);
        this.router.navigate(['/status']);
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
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  private prepareSave(): Status {
    const formModel = this.form.value;
    const saveStatus: Status = {
      id: 0,
      name: formModel.name as string
    };
    return saveStatus;
  }
}
