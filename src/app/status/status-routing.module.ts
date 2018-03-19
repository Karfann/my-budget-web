import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusMainComponent } from './status-main/status-main.component';
import { StatusListComponent } from './status-list/status-list.component';
import { StatusEditComponent } from './status-edit/status-edit.component';
import { StatusNewComponent } from './status-new/status-new.component';

const routes: Routes = [
  {
    path: '',
    component: StatusMainComponent,
    children: [
      { path: '', component: StatusListComponent },
      { path: 'new', component: StatusNewComponent },
      { path: 'detail/:id', component: StatusEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
