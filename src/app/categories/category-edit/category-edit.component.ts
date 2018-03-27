import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from '../shared/category';
import { CategoryService } from '../shared/category.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category: Category;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  onSubmit(): void {
    this.prepareSave();
    this.categoryService.updateCategory(this.category)
      .subscribe(_ => {
        this.alertService.success(`${this.category.name} category has been updated with success!`, true);
        this.router.navigate(['/categories']);
      });
  }

  goBack(): void {
    this.location.back();
  }

  private getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id)
      .subscribe(cat => {
        this.category = cat,
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
      name: this.category.name,
      isActive: this.category.isActive
    });
  }

  private prepareSave(): void {
    const formModel = this.form.value;
    this.category.name = formModel.name as string;
    this.category.isActive = formModel.isActive as boolean;
  }

}
