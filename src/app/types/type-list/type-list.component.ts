import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Type } from '../shared/type';
import { TypeService } from '../shared/type.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  types: Type[];

  constructor(
    private typeService: TypeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTypes();
  }

  private getTypes(): void {
    this.typeService.getTypes()
      .subscribe(list => this.types = list);
  }

}
