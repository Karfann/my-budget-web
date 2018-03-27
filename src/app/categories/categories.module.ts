import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoryMainComponent } from './category-main/category-main.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryNewComponent } from './category-new/category-new.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoryMainComponent,
    CategoryListComponent,
    CategoryEditComponent,
    CategoryNewComponent]
})
export class CategoriesModule { }
