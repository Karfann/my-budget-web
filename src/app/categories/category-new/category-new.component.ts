import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Category } from '../shared/category';
import { CategoryService } from '../shared/category.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {
    const newCategory = this.prepareSave();
    this.categoryService.addCategory(newCategory)
      .subscribe(cat => {
        this.alertService.success(`${cat.name} has been created with success`, true);
        this.router.navigate(['/categories']);
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
      isActive: ['', Validators.required]
    });
    this.form.controls['isActive'].setValue(true, { onlySelf: true });
  }

  private prepareSave(): Category {
    const formModel = this.form.value;
    const save: Category = {
      id: 0,
      name: formModel.name as string,
      isActive: formModel.isActive as boolean
    };
    return save;
  }

}
