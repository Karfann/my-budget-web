import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../shared/services/alert.service';
import { TypeService } from '../shared/type.service';
import { Type } from '../shared/type';

@Component({
  selector: 'app-type-new',
  templateUrl: './type-new.component.html',
  styleUrls: ['./type-new.component.css']
})
export class TypeNewComponent implements OnInit {

  form: FormGroup;

  constructor(
    private typeService: TypeService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {
    const newType = this.prepareSave();
    this.typeService.addType(newType)
      .subscribe(sub => {
        this.alertService.success(`${sub.name} has been created with success`, true);
        this.router.navigate(['/types']);
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      isActive: [true, Validators.required],
      value: [1, Validators.required]
    });
  }

  private prepareSave(): Type {
    const formModel = this.form.value;
    const save: Type = {
      id: 0,
      name: formModel.name as string,
      isActive: formModel.isActive as boolean,
      value: formModel.value as number
    };
    return save;
  }

}
