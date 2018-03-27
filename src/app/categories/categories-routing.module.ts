import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryMainComponent } from './category-main/category-main.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryNewComponent } from './category-new/category-new.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryMainComponent,
    children: [
      { path: '', component: CategoryListComponent },
      { path: 'new', component: CategoryNewComponent },
      { path: 'detail/:id', component: CategoryEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
