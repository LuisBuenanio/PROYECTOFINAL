import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPComponent } from './modal-p.component';

describe('ModalPComponent', () => {
  let component: ModalPComponent;
  let fixture: ComponentFixture<ModalPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
