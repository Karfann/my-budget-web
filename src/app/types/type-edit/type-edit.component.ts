import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../shared/services/alert.service';
import { TypeService } from '../shared/type.service';
import { Type } from '../shared/type';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.css']
})
export class TypeEditComponent implements OnInit {

  type: Type;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private typeService: TypeService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getType();
  }

  onSubmit(): void {
    this.prepareSave();
    this.typeService.updateType(this.type)
      .subscribe(_ => {
        this.alertService.success(`${this.type.name} type has been updated with success!`, true);
        this.router.navigate(['/types']);
      });
  }

  goBack(): void {
    this.location.back();
  }

  private getType(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.typeService.getType(id)
      .subscribe(t => {
        this.type = t,
        this.createForm(),
        this.setFormValue();
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      isActive: [true, Validators.required],
      value: ['', Validators.required]
    });
  }

  private setFormValue(): void {
    this.form.setValue({
      name: this.type.name,
      isActive: this.type.isActive,
      value: +this.type.value
    });
  }

  private prepareSave(): void {
    const formModel = this.form.value;
    this.type.name = formModel.name as string;
    this.type.isActive = formModel.isActive as boolean;
    this.type.value = formModel.value as number;
  }
}
