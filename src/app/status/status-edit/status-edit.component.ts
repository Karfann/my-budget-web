import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Status } from '../shared/status';
import { StatusService } from '../shared/status.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {

  status: Status;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private statusService: StatusService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getStatus();
  }

  onSubmit(): void {
    this.prepareSave();
    this.statusService.updateStatus(this.status)
      .subscribe(_ => {
        this.alertService.success(`${this.status.name} status has been updated with success!`, true);
        this.router.navigate(['/status']);
      });
  }

  goBack(): void {
    this.location.back();
  }

  private getStatus(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.statusService.getStatus(id)
      .subscribe( s => {
        this.status = s,
        this.createForm(),
        this.setFormValue();
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      isActive: ['', Validators.required]
    });
  }

  private setFormValue(): void {
    this.form.setValue({
      name: this.status.name,
      isActive: this.status.isActive
    });
  }

  private prepareSave(): void {
    const formModel = this.form.value;
    this.status.name = formModel.name as string;
    this.status.isActive = formModel.isActive as boolean;
  }
}
