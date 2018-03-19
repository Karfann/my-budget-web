import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StatusRoutingModule } from './status-routing.module';

import { StatusMainComponent } from './status-main/status-main.component';
import { StatusListComponent } from './status-list/status-list.component';
import { StatusEditComponent } from './status-edit/status-edit.component';
import { StatusNewComponent } from './status-new/status-new.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    StatusRoutingModule
  ],
  declarations: [StatusMainComponent, StatusListComponent, StatusEditComponent, StatusNewComponent]
})
export class StatusModule { }
