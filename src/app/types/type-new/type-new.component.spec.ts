import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNewComponent } from './type-new.component';

describe('TypeNewComponent', () => {
  let component: TypeNewComponent;
  let fixture: ComponentFixture<TypeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
