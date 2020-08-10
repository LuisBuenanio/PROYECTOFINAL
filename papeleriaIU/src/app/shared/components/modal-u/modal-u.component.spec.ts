import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUComponent } from './modal-u.component';

describe('ModalUComponent', () => {
  let component: ModalUComponent;
  let fixture: ComponentFixture<ModalUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
