import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMiComponent } from './modal-mi.component';

describe('ModalMiComponent', () => {
  let component: ModalMiComponent;
  let fixture: ComponentFixture<ModalMiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
