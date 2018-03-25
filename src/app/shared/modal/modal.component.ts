import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() message;
  @Output() returnAction = new EventEmitter<boolean>();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  confirm(): void {
    this.returnAction.emit(true);
    this.close();
  }

  close(): void {
    this.activeModal.close();
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
