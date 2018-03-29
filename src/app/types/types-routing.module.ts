import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeMainComponent } from './type-main/type-main.component';
import { TypeListComponent } from './type-list/type-list.component';
import { TypeEditComponent } from './type-edit/type-edit.component';
import { TypeNewComponent } from './type-new/type-new.component';

const routes: Routes = [
  {
    path: '',
    component: TypeMainComponent,
    children: [
      { path: '', component: TypeListComponent },
      { path: 'new', component: TypeNewComponent },
      { path: 'detail/:id', component: TypeEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesRoutingModule { }
