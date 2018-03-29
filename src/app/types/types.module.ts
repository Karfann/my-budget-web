import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TypesRoutingModule } from './types-routing.module';

import { TypeMainComponent } from './type-main/type-main.component';
import { TypeEditComponent } from './type-edit/type-edit.component';
import { TypeNewComponent } from './type-new/type-new.component';
import { TypeListComponent } from './type-list/type-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TypesRoutingModule
  ],
  declarations: [
    TypeMainComponent,
    TypeEditComponent,
    TypeNewComponent,
    TypeListComponent]
})
export class TypesModule { }
