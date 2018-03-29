import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMainComponent } from './type-main.component';

describe('TypeMainComponent', () => {
  let component: TypeMainComponent;
  let fixture: ComponentFixture<TypeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
