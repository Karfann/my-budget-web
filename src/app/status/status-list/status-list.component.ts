import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Status } from '../shared/status';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {

  statuses: Status[];

  constructor(
    private statusService: StatusService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getStatuses();
  }

  private getStatuses(): void {
    this.statusService.getStatuses()
    .subscribe(list => this.statuses = list);
  }

}
